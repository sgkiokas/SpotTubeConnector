const APP_CONFIG = {
    'CLIENT_ID': process.env.CLIENT_ID,
    'CLIENT_SECRET': process.env.CLIENT_SECRET,
    'REDIRECT_URI': process.env.REDIRECT_URI,
    'SPOTIFY_ACCOUNTS_URI': process.env.SPOTIFY_ACCOUNTS_URI || 'accounts.spotify.com',
    'SPOTIFY_API_URI': process.env.SPOTIFY_API_URI || 'api.spotify.com',
    'SPOTIFY_API_VERSION': process.env.SPOTIFY_API_VERSION || 'v1',
    'SPOTIFY_USERS_ENDPOINT': 'users',
    'SPOTIFY_SEARCH_ENDPOINT': 'search',
    'SPOTIFY_PLAYLISTS_ENDPOINT': 'playlists',
    'SPOTIFY_USERNAME': process.env.SPOTIFY_USERNAME,
    'SPOTIFY_PLAYLIST_MODIFY_PLUBLIC_SCOPE': 'playlist-modify-public',
    'SPOTIFY_CODE_RESPONSE_TYPE': 'code',
    'SPOTIFY_PLAYLIST_NAME': process.env.SPOTIFY_PLAYLIST_NAME,
    'SPOTIFY_TRACK_DETAILS': process.env.SPOTIFY_TRACK_DETAILS,
};

module.exports = {
    APP_CONFIG: APP_CONFIG,
};