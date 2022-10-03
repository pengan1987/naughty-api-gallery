"use strict";

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./scratch');

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/view/:artid', (req, res) => {
    let artid = req.params['artid']
    let time = req.query.time;
    if (null == time || time == "") {
        res.redirect('?time=' + Date.now())
    } else {
        localStorage.setItem('lastView', artid)
        res.send('you are viewing: ' + artid)
    }
})

app.get('/checkLastView', (req, res) => {
    let lastView = localStorage.getItem('lastView')
    res.set('Cache-control', `no-store`)
    res.send(lastView)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})