const expect = require('chai').expect;
const nock = require('nock');
const spotify = require('../server/libs/spotify-helper');

const SPOTIFY_ACCESS_TOKEN_LENGTH = 183;

let mockSpotifyUsername = 'spotifyUsername';
let mockSpotifyPlaylist = {
    href: `https://api.spotify.com/v1/users/${mockSpotifyUsername}/playlists?offset=0&limit=20`,
       items:
        [ { collaborative: false,
            description: 'This is a test playlsit for the Developer API',
            external_urls: [Object],
            href: 'https://api.spotify.com/v1/playlists/asdfghjkl1234',
            id: 'asdfghjkl1234',
            images: [Array],
            name: 'Mock Playlist',
            owner: [Object],
            primary_color: null,
            public: true,
            snapshot_id: 'asdfghjkl1234==',
            tracks: [Object],
            type: 'playlist',
            uri: 'spotify:playlist:asdfghjkl1234' } ],
       limit: 20,
       next: null,
       offset: 0,
       previous: null,
       total: 1
};

let populateMockSpotifyAccessToken = () => {
    let accessToken = '';
    while(accessToken.length < SPOTIFY_ACCESS_TOKEN_LENGTH) {
        accessToken += Math.random().toString(36).substring(12);
    }

    return accessToken;
}

let mockSpotifyAccessToken = populateMockSpotifyAccessToken();
let mockSpotifyPlaylistCreationPostData = {
    name: 'MockTestPlaylist'
};

describe('Spotify helper functions', () => {
    it('the details of a playlist are correctly retrieved', () => {
        nock('https://api.spotify.com')
            .get(`/v1/users/${mockSpotifyUsername}/playlists`)
            .reply(200, mockSpotifyPlaylist);

        return spotify.retrievePlaylistsDetails(mockSpotifyUsername)
            .then(response => {
            let playlistName = mockSpotifyPlaylist.items[0].name;
            let playlistID = mockSpotifyPlaylist.items[0].id;

            expect(response.values().next().value).to.equal(playlistName);
            expect(response.keys().next().value).to.equal(playlistID);
        });
    });
});

