const express = require('express');
const router = express.Router();
const endpoints = require('../endpoints/endpoints');
const config = require('../config/config');
const spotify = require('../libs/spotify-helper');
const open = require('open');

const clientID = config.APP_CONFIG.CLIENT_ID;
const redirectURI = encodeURIComponent(config.APP_CONFIG.REDIRECT_URI);
const responseType = 'code';
const requestScope = 'playlist-modify-public';

this.ACCESS_TOKEN = '';

let landing = async (req, res) => {
    // immediately redirect the app to the authorize endpoint
    let authorizationURL = `https://${config.APP_CONFIG.SPOTIFY_ACCOUNTS_URI}/en/authorize?client_id=${clientID}&response_type=${responseType}&redirect_uri=${redirectURI}&scope=${requestScope}`;
    (async () => {
        await open(authorizationURL, {app: ['google chrome', '--incognito']});
    })();
}

router.get(endpoints.REDIRECT_URI, spotify.retrieveAccessToken);
router.get(endpoints.LANDING_PAGE, landing);

module.exports =  router;