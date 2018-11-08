---
layout: post
title:  "Logging Magento logs with the ELK stack"
date:   2017-10-22
categories: magento
permalink: /blog/logging-magento-logs-with-elk-stack/
author: Peter Jaap Blaakmeer
---
## Keeping track with the ELK stack

This is a quick tutorial on how to set up logging of Magento's log files using the ELK stack. ELK stands for Elasticsearch, Logstash and Kibana. I won't go too far into detail but basically Elasticsearch is used for storage and quick retrieval of log entries, Logstash is responsible for getting the data into Elasticsearch and Kibana is used to create overviews and visualizations of the big bulk of log entries.

Besides ELK, we'll use the command line tool [log-courier](https://github.com/driskell/log-courier/) to push the logs straight from our production server to the ELK stack using an encrypted connection.

Note; we'll be using `log-courier` 1.8.3 since that is the current version installed on Byte's [Hypernode](https://www.hypernode.com/) hosting solution (which we use for all our clients). The latest version right now is 2.0.5 and offers a bit more features, especially in the `lc-admin` tool.

A lot of my research on how to set this up with taken from [this Gist by Github user purinda](https://gist.github.com/purinda/ede02d0d1e4fca54143b), [DigitalOcean's blog about ELK](https://www.digitalocean.com/community/tutorials/how-to-install-elasticsearch-logstash-and-kibana-elk-stack-on-ubuntu-14-04) and [log-courier's documentation](https://github.com/driskell/log-courier/tree/master/docs).

## Setting up the ELK stack

DigitalOcean used to offer a one-click app for the ELK stack. Unfortunately this is no longer available. I'll leave it to you to set up your own ELK stack. See the blog from DO linked above or pick a Docker image like [this one](https://github.com/spujadas/elk-docker). You can also try mailing DigitalOcean to see whether they have an image laying around for you. Just skip the Filebeat part of the DO blog; we'll be using log-courier to get our logs into ELK.

Kibana and Elasticsearch are pretty straightforward, just follow the blog. Remember where you put your certificate file and your secret key file for Logstash.

### Configuring Logstash

A Logstash configuration at its minimum exists out of three parts; input, output and filter. 

### Input
The input configuration file defines how the logs enter Logstash. In our case, we'll be using log-courier so we need the [logstash-input-courier](https://github.com/driskell/logstash-input-courier) plugin for Logstash; 
- SSH into your ELK stack
- Go to `/opt/logstash/`
- Run `sudo bin/plugin install logstash-input-courier`

Now we're going to set up the input;
- Go to `/etc/logstash/conf.d/`
- Create a new file called `01-courier-input.conf`
- Use this content;

```
input {
    courier {
        port            => 5043
        ssl_certificate => "/etc/pki/tls/certs/logstash-forwarder.crt"
        ssl_key         => "/etc/pki/tls/private/logstash-forwarder.key"
    }
}
```
- Possibly replace the ssl_certificate and ssl_key with your paths.
- Open up port 5043 in your firewall (`ufw insert 1 allow from $PRODUCTION-SERVER-IP to any port 5043`)

You can read more about setting up Logstash in log-courier [here](https://github.com/driskell/log-courier/blob/v1.8.3/docs/LogstashIntegration.md).

### Output

Logstash needs to know where to send the data it receives. Since we're using ELK, Elasticsearch is the output. In this configuration, we assume it's running on the same machine (localhost) and on port 9200.

- Go to `/etc/logstash/conf.d/`
- Create a new file called `10-elasticsearch-output.conf`
- Use this content;

```
output {
  elasticsearch {
    hosts => ["localhost:9200"]
    manage_template => false
    document_type => "%{[@metadata][type]}"
  }
}
```

### Filter

The third element is a filter; the data coming in needs to be understood by Logstash, so we need to tell it in which format it can expect data. This is done by using a regex-like syntax called grok. I've written two groks (for Magento 1 and Magento 2). There is a great tool to test your groks; [Grok Constructor Matcher](https://grokconstructor.appspot.com/do/match).

- Go to `/etc/logstash/conf.d/`
- Create a new file called `20-magento-filter.conf`
- Use this content;

```
filter {
  if [type] == "magento2" {
    grok {
      match => { "message" => "\[%{TIMESTAMP_ISO8601:timestamp}\] %{DATA:log_level}: %{GREEDYDATA:message}"}
      add_field => [ "received_at", "%{@timestamp}" ]
    }
  }
  if [type] == "magento1" {
    grok {
      match => { "message" => "%{TIMESTAMP_ISO8601:date} %{DATA:log_level} \([0-9]+\): %{GREEDYDATA:message}"}
      add_field => [ "received_at", "%{@timestamp}" ]
    }
  }
}
```

Note; this is just for system.log and does not take into account multi-line log entries. You can find a multi-line log entry grok for Magento [here](https://gist.github.com/chernjie/c3fef17fee15e534463d).

Test your Logstash configuration with `service logstash configtest`. If you see `Configuration OK`, run `service logstash restart`. Check whether it is listening on port 5034 with `sudo lsof -i:5043`. It should say something like;

```
COMMAND  PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
java    2737 logstash   16u  IPv6  54468      0t0  TCP *:5043 (LISTEN)
```

## Setting up your production server

Now we need to set up your production server to send data to Logstash. 
- Create directory where you'll save log-courier related settings, like `~/log-courier/`
- Create a `config.json` file in that directory with this content;

```
{
	"general": {
		"admin enabled": true
	},
	"network": {
		"servers": [ "ELK-IP-ADDRESS:5043" ],
		"ssl ca": "/absolute/path/to/your/log-courier/logstash.cer"
	},
	"files": [
		{
			"paths": [ "/path/to/magento2/var/log/*.log" ],
			"fields": { "type": "magento2" }
		}
	]
}
```
- Change path to your Magento var/log directory
- Change type to `magento1` if you're using Magento 1 (this corresponds to the types set in the filter file you made before)
- Change `ELK-IP-ADDRESS` to the hostname or IP address of your ELK stack
- Optionally disable admin by changing true to false
- Copy the Logstash certificate from your ELK stack to `~/log-courier/logstash.cer` (in my example the path of the certificate on the ELK stack was `/etc/pki/tls/certs/logstash-forwarder.crt`)
- Start log-courier manually from the CLI by running `log-courier -config ~/log-courier/config.json &`

Note: the admin tool helps you to figure out what's going on when something does not work. See [this Github page](https://github.com/driskell/log-courier/blob/v1.8.3/docs/AdministrationUtility.md) to see what it can do and how it works.

## Configuring Kibana
I'll briefly touch upon configuring Kibana because there is a plethora of information out there about how you can configure it and it largely depends on your usecase. 

- Open Kibana by going to your ELK hostname using the browser
- Go to Settings and under 'Index name or pattern', type 'logstash-'. 
- Click Create
- Go to the Discover tab and you should see potential logs coming in

!['Kibana'](../../assets/images/blogs/elk/kibana.jpeg)

## Troubleshooting

If you don't see logs coming in, be sure there *are* logs by checking the configured directory on your production server. If that is the case, SSH into your ELK stack and run `sudo lsof -i:5043`. If there is a connection set up from your production server to your ELK stack, you should see something like this;

```
COMMAND  PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
java    2737 logstash   16u  IPv6  54468      0t0  TCP *:5043 (LISTEN)
java    2737 logstash   41u  IPv6  55003      0t0  TCP ELK-IP-ADDRESS:5043->ELK-IP-ADDRESS:40176 (ESTABLISHED)
java    2737 logstash   45u  IPv6  54474      0t0  TCP ELK-IP-ADDRESS:5043->ELK-IP-ADDRESS:56348 (ESTABLISHED)
```

You can run the same command for ports 9200 and 5601 to check Elasticsearch and Kibana, respectively.

If there isn't a connection, check to see whether Logstash is actually running with `ps aux | grep -i logstash`. If it's not running, check Logstash's error and log files in `/var/log/logstash/logstash.err` and `/var/log/logstash/logstash.log`. 

If there are logs and there is a connection and no logs are showing up in Kibana, you can check these things;
- Check your grok patterns. If nothing matches, nothing will show up
- Run `status` in `lc-admin` on your production server to see whether it processes any lines
- Check your index pattern in Kibana

## Set up cron on Hypernode

Since Hypernode is a managed hosting solution, we have no way to edit the default configuration. We have to start log-courier manually. This also means that it is not auto-started on a possible system reboot. That's why we need to set up a cron to make sure log-courier runs.

- Add this to your crontab; `*/30 * * * * flock -n ~/.log-courier.lock -c 'log-courier -config /absolute/path/to/your/log-courier/config.json &'`
- Make sure your directory for log-courier is not `~/.log-courier` (notice the dot) since this is a file log-courier creates when running
- Make sure the certificate file in config.json is referenced absolute

Good luck!