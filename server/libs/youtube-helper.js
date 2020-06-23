const readline = require('readline');
const {google} = require('googleapis');
const config = require('../../config/config');

const SCOPES = [config.APP_CONFIG.YOUTUBE_READONLY_SCOPE];
const YOUTUBE_CREDENTIALS = {
    'client_id': config.APP_CONFIG.YOUTUBE_OAUTH_CLIENT_ID,
    'project_id': config.APP_CONFIG.YOUTUBE_OAUTH_PROJECT_ID,
    'auth_uri': config.APP_CONFIG.YOUTUBE_OAUTH_AUTH_URI,
    'token_uri': config.APP_CONFIG.YOUTUBE_OAUTH_TOKEN_URI,
    'auth_provider_x509_cert_url': config.APP_CONFIG.YOUTUBE_OAUTH_AUTH_PROVIDE_X509_CERT_URL,
    'client_secret': config.APP_CONFIG.YOUTUBE_OAUTH_CLIENT_SECRET,
    'redirect_uris': [config.APP_CONFIG.YOUTUBE_OAUTH_REDIRECT_URIS],
    'javascript_origins': [config.APP_CONFIG.YOUTUBE_OAUTH_JAVASCRIPT_ORIGINS]
}
const {client_secret, client_id, redirect_uris} = YOUTUBE_CREDENTIALS;
const OAUTH2CLIENT = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

let ACCESS_TOKEN;

let invokeAuthorizer = (req, res) => {
  authorize(YOUTUBE_CREDENTIALS, listFiles);
}

let retrieveAuthURL = () => {
  const authUrl = OAUTH2CLIENT.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return authUrl;
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
let authorize = callback => {
    if (!ACCESS_TOKEN) {
        return getAccessToken(OAUTH2CLIENT);
    }

    OAUTH2CLIENT.setCredentials(ACCESS_TOKEN);
    callback(oAuth2Client);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
let getAccessToken = (oAuth2Client, callback) => {
    let authUrl = retrieveAuthURL();
    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err){
            return console.error('Error retrieving access token', err);
        }

        oAuth2Client.setCredentials(token);
        ACCESS_TOKEN = token;
        callback(oAuth2Client);
      });
    });
}

let listFiles = auth => {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log('No files found.');
      }
    });
  }

module.exports = {
    authorize,
    getAccessToken,
    invokeAuthorizer,
    retrieveAuthURL,
}