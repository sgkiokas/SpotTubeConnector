const { expect } = require('chai');
const { describe, it } = require('mocha');
const nock = require('nock');
const spotify = require('../server/libs/spotify-helper');

let mockSpotifyUsername = 'spotifyUsername';
let mockNewPlaylistName = 'New Playlist';
let mockPlaylistID = "ABCDAFGHIJKLMNOPQRST12";
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
let mockSpotifyTrackAdditionPostBody = {
    uri: "spotify:track:ABCDEFGHIJKLMNOPQR1234"
};
let mockSpotifyTrackAdditionResponse = {
    snapshot_id: "ABCDEFGHIJKLMNOPQRSTUVWZABCDEFGHIJKLMNOPQRSTUVWZ0123456789=="
};
let mockPlaylistCreationData = {
    name: mockNewPlaylistName
}
let mockSearchTrackDetails = {
    query: 'Awesome Song',
    itemType: 'track',
    artistName: 'Best Artist',
};
let mockSpotifyMockID = 'spotify:track:ABCDEFGHIJKLMNOPQR1234';
let mockPlaylistCreationResponse = {
        "collaborative": false,
        "description": "New playlist description",
        "external_urls": {
          "spotify": "https://open.spotify.com/playlist/3g37CFahkkJb4y62XyDggj"
        },
        "followers": {
          "href": null,
          "total": 0
        },
        "href": "https://api.spotify.com/v1/playlists/3g37CFahkkJb4y62XyDggj",
        "id": "3g37CFahkkJb4y62XyDggj",
        "images": [],
        "name": "New Playlist",
        "owner": {
          "display_name": "Stelios",
          "external_urls": {
            "spotify": "https://open.spotify.com/user/pj4w5oml9gxgsvv63j7qyd8i9"
          },
          "href": "https://api.spotify.com/v1/users/pj4w5oml9gxgsvv63j7qyd8i9",
          "id": "pj4w5oml9gxgsvv63j7qyd8i9",
          "type": "user",
          "uri": "spotify:user:pj4w5oml9gxgsvv63j7qyd8i9"
        },
        "primary_color": null,
        "public": false,
        "snapshot_id": "MSw1MDk5ZmMxODVhZWU4ZGNmZDMzZmE0NmI1OGNkNzk1OTk5NGRjNjRi",
        "tracks": {
          "href": "https://api.spotify.com/v1/playlists/3g37CFahkkJb4y62XyDggj/tracks",
          "items": [],
          "limit": 100,
          "next": null,
          "offset": 0,
          "previous": null,
          "total": 0
        },
        "type": "playlist",
        "uri": "spotify:playlist:3g37CFahkkJb4y62XyDggj"
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

    it('a playlist can be created', () => {
        nock('https://api.spotify.com')
            .post(`/v1/users/${mockSpotifyUsername}/playlists`)
            .reply(201, mockPlaylistCreationResponse);

        return spotify.createPlaylist(mockSpotifyUsername, mockNewPlaylistName)
            .then(response => {
                expect(response).to.equal(mockNewPlaylistName);
        });
    });
});

