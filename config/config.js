const APP_CONFIG = {
    // Spotify related env vars
    'SPOTIFY_CLIENT_ID': process.env.SPOTIFY_CLIENT_ID,
    'SPOTIFY_CLIENT_SECRET': process.env.SPOTIFY_CLIENT_SECRET,
    'SPOTIFY_REDIRECT_URI': process.env.SPOTIFY_REDIRECT_URI,
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
    // YouTube related env vars
    'YOUTUBE_API_KEY': process.env.YOUTUBE_API_KEY,
    'YOUTUBE_OAUTH_CLIENT_ID': process.env.YOUTUBE_OAUTH_CLIENT_ID,
    'YOUTUBE_OAUTH_PROJECT_ID': process.env.YOUTUBE_OAUTH_PROJECT_ID,
    'YOUTUBE_OAUTH_AUTH_URI': 'https://accounts.google.com/o/oauth2/auth',
    'YOUTUBE_OAUTH_TOKEN_URI': 'https://oauth2.googleapis.com/token',
    'YOUTUBE_OAUTH_AUTH_PROVIDE_X509_CERT_URL': 'https://www.googleapis.com/oauth2/v1/certs',
    'YOUTUBE_OAUTH_CLIENT_SECRET': process.env.YOUTUBE_OAUTH_CLIENT_SECRET,
    'YOUTUBE_OAUTH_REDIRECT_URIS': process.env.YOUTUBE_OAUTH_REDIRECT_URIS,
    'YOUTUBE_OAUTH_JAVASCRIPT_ORIGINS': process.env.YOUTUBE_OAUTH_JAVASCRIPT_ORIGINS,
    'YOUTUBE_API_VERSION': process.env.YOUTUBE_API_VERSION || 'v3',
    'YOUTUBE_READONLY_SCOPE': 'https://www.googleapis.com/auth/youtube.readonly',
    // Generic Google env vars
    'GOOGLE_YOUTUBE_ENDPOINT': 'youtube',
    'GOOGLE_API_URI': process.env.GOOGLE_API_URI || 'googleapis.com',
};

module.exports = {
    APP_CONFIG: APP_CONFIG,
};