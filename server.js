const path = require('path')
const http = require('http'),
    https = require('https')
const database = require('./server/database.js')
const express = require('express')
const app = express()

// Blanket auth for public
app.post('/api/public/:handle', (request, response, next) => {
    console.log('Accessing public...')
    next()
})
app.post('/api/public/add-booking', (request, response) => {
    // verify request

    // if valid
    database.addBooking('debug').then(console.log).catch(console.error)
    // send client email
    // send rmt email
    // send valid response
    response.statusCode = 200
    response.send()
    // else
    // send not valid response
})

// Blanket auth for RMTs
app.post('/api/rmt/:handle', (request, response, next) => {
    // authenticate. Replace with FireStore Admin
    console.log('Accessing RMT...')
    if (request.headers['x-auth']) {
        console.log(`Authed as ${request.headers['x-auth']}`)
        next()
        return
    }
    console.log('Unauthorized')
    response.status(401).send('401 Unauthorized')
})
app.post('/api/rmt/dothing', (request, response, next) => {
    console.log('Accessing dothing...')
    response.status(200).send()
})

// Blanket auth for Admins
app.post('/api/admin/:handle', (request, response, next) => {
    // authenticate. Replace with FireStore Admin
    console.log('Accessing Admin...')
    if (request.headers['x-auth']) {
        console.log(`Authed as ${request.headers['x-auth']}`)
        next()
        return
    }
    console.log('Unauthorized')
    response.status(401).send('401 Unauthorized')
})
app.post('/api/admin/dothing', (request, response, next) => {
    console.log('Accessing dothing...')
    response.status(200).send()
})

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
