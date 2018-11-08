---
layout: post
title:  "Magento 2 Dutch language pack analysis"
date:   2017-03-22
categories: magento
permalink: /blog/magento2-dutch-language-pack-analysis/
image: /assets/images/blogs/language-pack/flag.png
excerpt: Which language pack is the best & how to analyse differences
author: Peter Jaap Blaakmeer
---
## Magento 2 Dutch language pack analysis

There are three competing Magento 2 Dutch language packs to be found, freely available. We'll do a quantative analysis of these. The three competitors are (in alphabetical order):
 - [Adwise / magento2-nl_NL-language](https://github.com/Adwise/magento2-nl_NL-language)
 - [creaminternet / language-nl_nl](https://bitbucket.org/creaminternet/language-nl_nl)
 - [ho-nl/magento2-nl_NL](https://github.com/ho-nl/magento2-nl_NL)

The creaminternet package appears to be a fork of the Adwise package.

The H&O package is an imported set from the [Crowdin Magento 2 project](https://crowdin.com/project/magento-2/nl).

Since the translation sets are huge, we have done a quantitative analysis instead of a qualitative analysis. Below are the results, followed by our methodlogy.

We have checked for:
 - the percentage of strings that are actually translated;
 - the percentage of typos/unknown words in the translations;
 - the percentage of strings that suffer from what we Dutchies call the '[English disease](https://nl.wikipedia.org/wiki/Engelse_ziekte_(taal))' (wrongly capitalizing All Words In A Sentence).

## Results

| Language pack | Commits | Strings | Untranslated % | Unknown words % | English disease % |
|:---|:---|:---|:---|:---|:---|
| [Adwise / magento2-nl_NL-language](https://github.com/Adwise/magento2-nl_NL-language) | 21 | 8345 | 8.4% | 8% | 3.4% |
| [creaminternet / language-nl_nl](https://bitbucket.org/creaminternet/language-nl_nl) | 44 | 8342 | 8.6% | 7.6% | 3.7% |
| [ho-nl/magento2-nl_NL](https://github.com/ho-nl/magento2-nl_NL) | 73 | 12587 | 10.6% | 6.1% | 7.8% |

So from these statistics, it appears the H&O/Crowdin translation is the most complete, because it has the most strings. This is also the package that is crowd-sourced through Crowdin, which means of the three, this will most likely be the most updated one.

According to Adwise, they manually and painstakingly went through the translations to keep a clear, concise and consistent tone of voice. We haven't checked ourselves but this should be a higher quality package, although it contains less translations.

## Methodology

The spellcheck was done using the open source package [Hunspell](https://github.com/hunspell/hunspell). The English & Dutch dictionaries for Hunspell was downloaded from [Elastic's Hunspell repository](https://github.com/elastic/hunspell) and placed in the Hunspell path (run `hunspell -D` to view yours).

The hack-n-slash PHP script we used to generate these statistics;

{% highlight php %}
<?php

require_once 'vendor/autoload.php';

use League\Csv\Reader; // composer require league/csv
use Mekras\Speller\Hunspell\Hunspell; // composer require mekras/php-speller
use Mekras\Speller\Source\StringSource;

// Hunspell on Mac installed through brew install hunspell
$speller = new Hunspell();
$speller->setDictionaryPath('dictionaries');

echo 'Analyzing...';

foreach (['adwise/nl_NL.csv', 'cream/nl_NL.csv', 'ho/nl_NL.csv'] as $file) {
    echo $file;
    $notTranslated = 0;
    $translated = 0;
    $unknownWords = 0;
    $englishDisease = 0;
    $totalWords = 0;

    $csv = Reader::createFromPath($file);
    foreach ($csv->fetchAll() as $line) {
        list($english, $dutch, $type, $entity) = $line;

        if ($dutch == $english) {
            $notTranslated++;
            continue;
        } else {
            $translated++;
        }

        if (
            stripos($dutch, ' ') !== false
            && $dutch === ucwords($dutch)
        ) {
            $englishDisease++;
        }

        $totalWords += count(explode(' ', $dutch));

        $dutch = strip_tags($dutch);
        $dutch = trim($dutch, '.');
        $source = new StringSource($dutch);
        $issues = $speller->checkText($source, ['nl_NL', 'nl']);

        $unknownWords += count($issues);

        echo '.';
    }

    echo PHP_EOL;
    echo $file . ' - not translated: ' . $notTranslated . PHP_EOL;
    echo $file . ' - translated: ' . $translated . PHP_EOL;
    echo $file . ' - English disease: ' . $englishDisease . PHP_EOL;
    echo $file . ' - total words: ' . $totalWords . PHP_EOL;
    echo $file . ' - unknown words: ' . $unknownWords . PHP_EOL;
    echo '=====================' . PHP_EOL . PHP_EOL;

}
{% endhighlight %}

## Caveats

There are some caveats to this methodology, so the absolute numbers might not be accurate. But since the same methodology is used for all three packages, this is okay.

 - Some words might be the same in Dutch & English, so a 'not translated' might actually be a false negative;
 - Some words are not in the Dutch dictionary but are valid words, or names, or HTML tags, or placeholders, etc.