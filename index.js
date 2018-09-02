'use strict';
const express = require('express');
const app = express();

app.get('/editor',      (req, res) => {  res.sendFile(__dirname + '/editor/index.html');  });
app.get('/editor.js',   (req, res) => {  res.sendFile(__dirname + '/editor/editor.js'); });
app.get('/all.js',      (req, res) => {  res.sendFile(__dirname + '/lib/all.js');  });
app.get('/fragment.fs', (req, res) => {  res.sendFile(__dirname + '/shader/fragment.fs'); });
app.get('/vertex.vs',   (req, res) => {  res.sendFile(__dirname + '/shader/vertex.vs'); });

const http = require('http').Server(app);

http.listen(8080);