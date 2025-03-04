import path from 'path'
import http from 'http'
import https from 'https'
import e from 'express'

// Node version requirement check
const [major, minor, patch] = process.versions.node.split('.').map(Number)
if(major !== 20) {
    throw 'Node version must be 20.x.x'
}

const app = e()

// This makes *everything* within the dist folder public.
// If we add any private files, this needs to be changed.
// Pipeline needs work
app.use(e.static(path.resolve(import.meta.dirname, '../dist')))

// for testing purposes, use both http and https
// when https testing is done (mainly need a certificate), remove the http
http.createServer(app).listen(80, ()=>console.log('Server listening on port 80'));
// certificate information goes here
const https_credentials = {}
https.createServer(https_credentials, app).listen(443, ()=>console.log('Server listening on port 443'));

