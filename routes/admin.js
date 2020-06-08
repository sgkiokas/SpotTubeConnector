const express = require('express');
const router = express.Router();
const endpoints = require('../endpoints/endpoints');
const rest = require('../libs/restCalls');
const config = require('../config/config');
const utils = require('../libs/utils');
const base64 = require('js-base64').Base64;
const open = require('open');
const assert = require('assert');

const clientID = config.APP_CONFIG.CLIENT_ID;
const redirectURI = encodeURIComponent(config.APP_CONFIG.REDIRECT_URI);
const clientSecret = config.APP_CONFIG.CLIENT_SECRET;
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

let retrieveAccessToken = async (req, res) => {
    let fullURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`
    let completeResponseType = `${responseType}=`;
    let responseCode = fullURL.substring(fullURL.indexOf(completeResponseType) + completeResponseType.length);
    let encodedToken = base64.encode(`${clientID}:${clientSecret}`);
    let curlCommand = `curl -H "Authorization: Basic ${encodedToken}" -d grant_type=authorization_code -d code=${responseCode} -d redirect_uri=${redirectURI} https://${config.APP_CONFIG.SPOTIFY_ACCOUNTS_URI}/api/token`;

    this.ACCESS_TOKEN = JSON.parse(utils.spawnSyncWrapper(curlCommand)).access_token;

    retrievePlaylistsDetails(config.APP_CONFIG.SPOTIFY_USERNAME);
}

let retrievePlaylistsDetails = async (userName) =>  {
    let response = await rest.restGETRequestWrapper(config.APP_CONFIG.SPOTIFY_API_URI, `/${config.APP_CONFIG.SPOTIFY_API_VERSION}/${config.APP_CONFIG.SPOTIFY_USERS_ENDPOINT}/${userName}/playlists`, this.ACCESS_TOKEN, true);
    assert.strictEqual(response.statusCode, 200, `Response code is ${response.statusCode} and not 200`);

    let playlistMapper = new Map();
    let playlistItems = response.body.items;

    playlistItems.forEach(item => {
        playlistMapper.set(item.id, item.name);
    });
}

let createPlaylist = async (userName, playlistName) => {
    let postBody = {
        name: playlistName
    };
    let response = await rest.restPOSTRequestWrapper(config.APP_CONFIG.SPOTIFY_API_URI, `/${config.APP_CONFIG.SPOTIFY_API_VERSION}/${config.APP_CONFIG.SPOTIFY_USERS_ENDPOINT}/${userName}/playlists`, this.ACCESS_TOKEN, postBody);
    assert.strictEqual(response.statusCode, 201, `Response code is ${response.statusCode} and not 201`);
}

router.get(endpoints.REDIRECT_URI, retrieveAccessToken);
router.get(endpoints.LANDING_PAGE, landing);

module.exports =  router;