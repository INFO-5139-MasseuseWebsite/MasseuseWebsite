const express = require('express')
const app = express()
const path = require('path')

const http = 80,
    https = 443;

app.use(express.static(path.join(__dirname, 'dist')))
app.listen(http, console.log)
