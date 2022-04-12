const fs = require('fs')
const jsonwebtoken = require('jsonwebtoken')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const conf = require('./conf')

const { BABYLON_ENV } = process.env

const dateToTimestamp = (date) =>
    Math.floor(date.getTime() / 1000)

const readKeyFromFile = (env) => {
    return fs.readFileSync(path.join(__dirname, `keys/${env}.key`), 'utf-8')
}

const getIdToken = () => {
    const timeIn30Seconds = dateToTimestamp(new Date()) + 30

    return jsonwebtoken.sign(
        {
            address: { region: conf.region }, // region is required
            aud: conf.clientId, // client ID - required
            birthdate: '1994-01-01', // required
            exp: timeIn30Seconds, // must be 30 seconds or less
            gender: 'female', // sex_at_birth - required
            given_name: 'Alex', // can be anonymous
            family_name: 'Smith', // can be anonymous
            locale: 'en-US', // must be supplied
            sub: uuidv4(), // The partner external user ID
        },
        readKeyFromFile(BABYLON_ENV),
        {
            algorithm: 'RS256',
            issuer: conf.issuer,
            keyid: conf.keyId, // required
        },
    )
}

const getUrl = () => {
    return `${conf.canvasUrl}/launch?flow=triage&client_id=${conf.clientId}&callback_url=${conf.callbackUrl}#id_token=${getIdToken()}`
}
module.exports = { getUrl, getIdToken }
