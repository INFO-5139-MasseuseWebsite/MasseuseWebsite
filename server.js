const path = require('path')
const http = require('http'),
    https = require('https')
const express = require('express')
const app = express()

// This makes *everything* within the dist folder public.
// If we add any private files, this needs to be changed.
// Pipeline needs work
app.use(express.static(path.join(__dirname, 'dist')))

// for testing purposes, use both http and https
// when https testing is done (mainly need a certificate), remove the http
http.createServer(app).listen(80);
// certificate information goes here
const https_credentials = {}
https.createServer(https_credentials, app).listen(443);

