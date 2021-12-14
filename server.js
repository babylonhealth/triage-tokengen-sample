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

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
