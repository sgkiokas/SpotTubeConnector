const APP_CONFIG = {
    'CLIENT_ID': process.env.CLIENT_ID,
    'CLIENT_SECRET': process.env.CLIENT_SECRET,
    'REDIRECT_URI': process.env.REDIRECT_URI,
    'SPOTIFY_ACCOUNTS_URI': process.env.SPOTIFY_ACCOUNTS_URI || 'accounts.spotify.com',
    'SPOTIFY_API_URI': process.env.SPOTIFY_API_URI || 'api.spotify.com/v1',
    'SPOTIFY_USERNAME': process.env.SPOTIFY_USERNAME,
};

module.exports = {
    APP_CONFIG: APP_CONFIG,
};