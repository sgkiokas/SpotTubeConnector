const https = require('https');

async function restGETRequestWrapper(hostName, apiPath, accessToken, parseJson) {
    let options = {
        hostname: hostName,
        port: 443,
        path: apiPath,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        json: parseJson,
        rejectUnauthorized: false,
        requestCert: false,
        agent: false,
        timeout: 200000
    };
    return await new Promise((resolve, reject) => {
        const request = https.request(options, (response) => {
            let str = '';
            let obj = {
                body: str,
                statusCode: 0
            };
            response
                .on('data', data => {
                    str += data;
                })
                .on('end', () => {
                    let data = str;
                    if (parseJson) {
                        data = JSON.parse(str);
                    }
                    obj.body = data;
                    obj.statusCode = response.statusCode;
                    resolve(obj);
                })
                .on('error', err => {
                    console.log(err);
                    obj.body = err;
                    obj.statusCode = response.statusCode;
                    reject(obj);
                });
        });

        request
            .on('error', err => {
                console.log(`GET request encountered the following error: ${err.message}`);
                reject(err);
            });

        request.end();
    });
}

async function restPOSTRequestWrapper(hostName, port, apiPath, accessToken, postData) {
    let postBody = JSON.stringify(postData);
    let options = {
        hostname: hostName,
        port: port,
        path: apiPath,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        json: true,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    };
    return await new Promise((resolve, reject) => {
        const request = https.request(options, (response) => {
            let str = '';
            let obj = {
                body: str,
                statusCode: 0
            };
            response
                .on('data', data => {
                    str += data;
                })
                .on('end', () => {
                    obj.body = str;
                    obj.statusCode = response.statusCode;
                    resolve(obj);
                })
                .on('error', err => {
                    console.log(err);
                    obj.body = err;
                    obj.statusCode = response.statusCode;
                    reject(obj);
                });
        });

        request
            .on('error', err => {
                console.log(`POST request encountered the following error: ${err.message}`);
                reject(err);
            });

        request.write(postBody);
        request.end();
    });
}

module.exports = {
    restGETRequestWrapper,
    restPOSTRequestWrapper,
}