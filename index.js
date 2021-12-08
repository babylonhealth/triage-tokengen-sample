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
            address: { region: conf.region },
            aud: conf.clientId, // Client ID
            birthdate: '1994-01-01', // For anonymous use XXXX-01-01 - must be supplied
            exp: timeIn30Seconds, // must be 30 seconds or less
            gender: 'female', // sex_at_birth - must be supplied
            given_name: 'Alex', // use anonymous name
            family_name: 'Smith', // use anonymous name
            locale: 'en-US', // must be supplied
            sub: uuidv4(), // User ID within the Partner system - random if this is to be anonymized
        },
        readKeyFromFile(BABYLON_ENV),
        {
            algorithm: 'RS256',
            issuer: conf.issuer,
            keyid: conf.keyId, // Public Key is stored against this uuid by Canvas Launcher
        },
    )
}

console.log(`${conf.canvasUrl}/launch?flow=triage&client_id=${conf.clientId}&callback_url=triagesampleapp://callback#id_token=${getIdToken()}`)
