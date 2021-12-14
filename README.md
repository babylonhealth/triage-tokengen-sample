# Triage Sample App Token

## Setup

### Install dependencies

Run `yarn install`

### Provision private keys

1) Create a new folder called `keys`
2) Generate private / public key pair
```
ssh-keygen -t rsa -b 4096 -m PEM -f keys/<YOUR_FILENAME>.key
# Don't add passphrase
openssl rsa -in keys/<YOUR_FIELNAME>.key -pubout -outform PEM -out keys/<YOUR_FILENAME>.key.pub
cat keys/<YOUR_FILENAME>.key.pub
```
3) Save the private key file in `keys` with the name `<environment-region>.key`, e.g. `preprod-us.key`
   or symbolic link to it.

### Set Config vars

1) Copy `conf.js.tmpl` to `conf.js`
2) Edit `conf.js` and provide the vars IN CAPS
3) `conf.js` and `/keys` are in `.gitignore` they should NOT BE checked in

## Create a new token

### Command

- Run `yarn generate:preprod-us`, and a token will be generated within 
  a link to Canvas Launcher for **pre-prod**
- Open that link in a browser to test authentication and initial launch
- Once Canvas is working proceed to Mobile App Development

## Server mode

To run this in server mode

### Command
- Run `yarn start`
- This starts a server at http://localhost:8000
- In another window do the following:
- `curl -s http://localhost:8000/url`
- `curl -s http://localhsot:8000/tokenInfo | jq`

### Notes

- Token expiration MUST be 30 seconds OR LESS
- Token expirations that are longer are automatically rejected.
- The resultant url can be used in a browser to quickly test.
- `sub` (subject) is a unique ID for a patient, if you re-use the same uuid
  then you will get a token for that patient.
- Ergo, reuse `sub` if it is the same user/patient on your app.
- Use a random UUID for `sub` if you do not want to expose the UUID externally.
  The random UUID can still be associated with this triage diagnostic session and
  stored as part of the partners patient EHR. (Or the whole session ID can be stored as well.)
