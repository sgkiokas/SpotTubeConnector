const express = require('express');
const router = express.Router();
const endpoints = require('../endpoints/endpoints');
const rest = require('../libs/restCalls');
const config = require('../config/config');
const utils = require('../libs/utils');
const base64 = require('js-base64').Base64;

const clientID = config.APP_CONFIG.CLIENT_ID;
const redirectURI = encodeURIComponent(config.APP_CONFIG.REDIRECT_URI);
const clientSecret = config.APP_CONFIG.CLIENT_SECRET;
const responseType = 'code';
const requestScope = 'playlist-read-private';

async function landing(req, res) {
    // immediately redirect the app to the authorize endpoint
    let authorizationURL = `https://${config.APP_CONFIG.SPOTIFY_ACCOUNTS_URI}/en/authorize?client_id=${clientID}&response_type=${responseType}&redirect_uri=${redirectURI}&scope=${requestScope}`;
    res.redirect(authorizationURL);
}

async function retrieveAccessToken(req, res) {
    let fullURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`
    let completeResponseType = `${responseType}=`;
    let responseCode = fullURL.substring(fullURL.indexOf(completeResponseType) + completeResponseType.length);
    let encodedToken = base64.encode(`${clientID}:${clientSecret}`);
    let curlCommand = `curl -H "Authorization: Basic ${encodedToken}" -d grant_type=authorization_code -d code=${responseCode} -d redirect_uri=${redirectURI}2Fauth https://${config.APP_CONFIG.SPOTIFY_ACCOUNTS_URI}/api/token`;

    console.log(responseCode);
    console.log(curlCommand);
    let json = utils.spawnSyncWrapper(curlCommand);
    console.log(json);

    // curl -H "Authorization: Basic NDdlMWUzZmMzYmU2NDAxM2FhMmI0NWNjMDJlYzllOTM6MjYyZDkxNjk2ZWZjNDc3OWIyYmNkNzJhNmU0NjUyNzI=" -d grant_type=authorization_code -d code=AQA1vAj8gQXQbKbAjp1SJ3hleQxUzk1dGCYcu75ShtI413xCyRA_mQqIks1KcRgTHrfjH1gbrJKKaISw3ElklihmN7PXquXIcJGXakSkeGo0fWsQFFJoxfL-axRI5dc-8BEpgLuam_cjyKWNe_x-zvu4PaG4hG9NCIdFh5V_ZS-K27NGqOTrL4_rEq
// Vm2lRzdO1L2VbMVSqSGy7p0sYlA-BLE-rSVPKvgJE -d redirect_uri=http:%2F%2Flocalhost:8000%2Fcallback2Fauth https://accounts.spotify.com/api/token
}

router.get(endpoints.REDIRECT_URI, retrieveAccessToken);
router.get(endpoints.LANDING_PAGE, landing);

module.exports =  router;