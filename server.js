const http = require("http");
const { getUrl, getIdToken } = new require("./token");
const conf = new require("./conf");

const host = '0.0.0.0';
const port = 8000;

const requestListener = function (req, res) {
    switch (req.url) {
        case "/url":
            res.writeHead(200);
            res.end(getUrl());
            break
        case "/tokenInfo":
            res.setHeader("Content-Type","application/json");
            res.writeHead(200);
            res.end(JSON.stringify({clientId:conf.clientId,token:getIdToken()}));
            break;
        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found"}));
    }
};

// IMPORTANT NOTE! - **** PLEASE READ **** !!!!
// THIS IS SAMPLE CODE ONLY.
// IN AN ACTUAL PRODUCTION SETTING, IT IS CONSIDERED BEST PRACTICE
// TO PASS ANY SENSITIVE DATA OVER HTTPS / TLS AT A MINIMUM.
// THIS SAMPLE CODE IS INTENDED FOR DEMONSTRATIVE PURPOSES ONLY
// AND IS NOT INTENDED FOR ANY REAL / PRODUCTION / HEALTH PURPOSES - AS-IS.

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
