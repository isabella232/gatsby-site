import React from 'react'

// Giphy API defaults
const giphy = {
    baseURL: "https://api.giphy.com/v1/gifs/",
    key: "dc6zaTOxFJmzC",
    tag: "fail",
    type: "random",
    rating: "pg-13"
};

// Giphy API URL
let giphyURL = encodeURI(
    giphy.baseURL +
    giphy.type +
    "?api_key=" +
    giphy.key +
    "&tag=" +
    giphy.tag +
    "&rating=" +
    giphy.rating
);

// Call Giphy API and render data
var data = fetch(giphyURL) . then(results => {return results.json() });


const RandomGif = (props) => (
    <img src={data.image_original_url} />
)

export default RandomGif