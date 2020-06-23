const express = require('express');
const router = express.Router();
const endpoints = require('../endpoints/endpoints');
const config = require('../../config/config');
const spotify = require('../libs/spotify-helper');
const youtube = require('../libs/youtube-helper');
const open = require('open');

this.ACCESS_TOKEN = '';

let landing = async (req, res) => {
    // immediately redirect the app to the authorize endpoint
    let authorizationURL = youtube.retrieveAuthURL();
    (async () => {
        await open(authorizationURL, {app: ['google chrome', '--incognito']});
    })();
}

router.get(endpoints.YOUTUBE_REDIRECT_URI, youtube.invokeAuthorizer);
router.get(endpoints.LANDING_PAGE, landing);

module.exports =  router;