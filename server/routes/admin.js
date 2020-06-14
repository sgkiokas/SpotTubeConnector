const express = require('express');
const router = express.Router();
const endpoints = require('../endpoints/endpoints');
const config = require('../../config/config');
const spotify = require('../libs/spotify-helper');
const open = require('open');

this.ACCESS_TOKEN = '';

let landing = async (req, res) => {
    // immediately redirect the app to the authorize endpoint
    let authorizationURL = `https://${config.APP_CONFIG.SPOTIFY_ACCOUNTS_URI}/en/authorize?client_id=${config.APP_CONFIG.CLIENT_ID}&response_type=${config.APP_CONFIG.SPOTIFY_CODE_RESPONSE_TYPE}&redirect_uri=${encodeURIComponent(config.APP_CONFIG.REDIRECT_URI)}&scope=${config.APP_CONFIG.SPOTIFY_PLAYLIST_MODIFY_PLUBLIC_SCOPE}`;
    (async () => {
        await open(authorizationURL, {app: ['google chrome', '--incognito']});
    })();
}

router.get(endpoints.REDIRECT_URI, spotify.retrieveAccessToken);
router.get(endpoints.LANDING_PAGE, landing);

module.exports =  router;