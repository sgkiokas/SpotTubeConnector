const rest = require('../libs/restCalls');
const config = require('../config/config');
const utils = require('../libs/utils');
const base64 = require('js-base64').Base64;
const assert = require('assert');

const clientID = config.APP_CONFIG.CLIENT_ID;
const redirectURI = encodeURIComponent(config.APP_CONFIG.REDIRECT_URI);
const clientSecret = config.APP_CONFIG.CLIENT_SECRET;
const responseType = 'code';

this.ACCESS_TOKEN = '';

let retrieveAccessToken = async (req, res) => {
    let fullURL = `${req.protocol}://${req.get('host')}${req.originalUrl}`
    let completeResponseType = `${responseType}=`;
    let responseCode = fullURL.substring(fullURL.indexOf(completeResponseType) + completeResponseType.length);
    let encodedToken = base64.encode(`${clientID}:${clientSecret}`);
    let curlCommand = `curl -H "Authorization: Basic ${encodedToken}" -d grant_type=authorization_code -d code=${responseCode} -d redirect_uri=${redirectURI} https://${config.APP_CONFIG.SPOTIFY_ACCOUNTS_URI}/api/token`;

    this.ACCESS_TOKEN = JSON.parse(utils.spawnSyncWrapper(curlCommand)).access_token;

    // retrievePlaylistsDetails(config.APP_CONFIG.SPOTIFY_USERNAME);
    addSongToPlaylist('Testing');
}

let retrievePlaylistsDetails = async (userName) =>  {
    let response = await rest.restGETRequestWrapper(config.APP_CONFIG.SPOTIFY_API_URI, `/${config.APP_CONFIG.SPOTIFY_API_VERSION}/${config.APP_CONFIG.SPOTIFY_USERS_ENDPOINT}/${userName}/playlists`, this.ACCESS_TOKEN, true);
    assert.strictEqual(response.statusCode, 200, `Response code is ${response.statusCode} and not 200`);

    let playlistMapper = new Map();
    let playlistItems = response.body.items;

    playlistItems.forEach(item => {
        playlistMapper.set(item.id, item.name);
    });

    return playlistMapper;
}

let createPlaylist = async (userName, playlistName) => {
    let postBody = {
        name: playlistName
    };
    
    let response = await rest.restPOSTRequestWrapper(config.APP_CONFIG.SPOTIFY_API_URI, `/${config.APP_CONFIG.SPOTIFY_API_VERSION}/${config.APP_CONFIG.SPOTIFY_USERS_ENDPOINT}/${userName}/playlists`, this.ACCESS_TOKEN, postBody);
    assert.strictEqual(response.statusCode, 201, `Response code is ${response.statusCode} and not 201`);
}

let searchItem = async (query, itemType, artistName) => {
    let response = await rest.restGETRequestWrapper(config.APP_CONFIG.SPOTIFY_API_URI, `/${config.APP_CONFIG.SPOTIFY_API_VERSION}/${config.APP_CONFIG.SPOTIFY_SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&type=${itemType}`, this.ACCESS_TOKEN, true);
                                                    
    assert.strictEqual(response.statusCode, 200, `Response code is ${response.statusCode} and not 200`);

    let trackURI = '';
    let combinationFound = false;
    if(artistName) {
        try {
            response.body.tracks.items.forEach(item => {
                item.artists.forEach(artist => {
                    if(artistName === artist.name) {
                        combinationFound = true;
                        trackURI = item.uri;
                        throw BreakException;
                    }
                });
            });
        }
        catch(e) {
            // just catch the exception and move on
        }

        if(!combinationFound) {
            console.log(`The combination of the song ${query} and the artist ${artistName} couldn't be found!`);
        }
    } else {
        // if no artist has been supplied, pick the first item of the list as the safest option
        trackURI = response.body.tracks.items[0].uri;
    }

    return trackURI;
}

let addSongToPlaylist = async (playlistName) => {
    // TODO: properly fetch the parameters to be passed down to the searchItem()
    let tracURI = await searchItem('Nothing else matters', 'track', 'Metallica'); 
    let playlists = await retrievePlaylistsDetails(config.APP_CONFIG.SPOTIFY_USERNAME);

    for(let [playlistID, playlistKey] of playlists.entries()) {
        if(playlistName === playlistKey) { 
            let response = await rest.restPOSTRequestWrapper(config.APP_CONFIG.SPOTIFY_API_URI, `/${config.APP_CONFIG.SPOTIFY_API_VERSION}/${config.APP_CONFIG.SPOTIFY_PLAYLISTS_ENDPOINT}/${playlistID}/tracks?uris=${encodeURIComponent(tracURI)}`, this.ACCESS_TOKEN, {});
            assert.strictEqual(response.statusCode, 201, `Response code is ${response.statusCode} and not 201`);
            console.log(`Your song has been successfully added to your playlist!`);
        } else {
            console.log(`There is not playlist with the name ${playlistKey}. Do you want to create it?`);
            // TODO: add fucntionality to call the createPlaylist() in case the user selects 'yes'
        }
    }

}

module.exports =  {
    retrieveAccessToken,
    retrievePlaylistsDetails,
    createPlaylist,
    searchItem,
    addSongToPlaylist,
};