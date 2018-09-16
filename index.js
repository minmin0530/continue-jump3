'use strict';
const express = require('express');
const app = express();
const fs = require('fs');

app.get('/editor',      (req, res) => {  res.sendFile(__dirname + '/editor/index.html');  });
app.get('/editor.js',   (req, res) => {  res.sendFile(__dirname + '/editor/editor.js'); });
app.get('/all.js',      (req, res) => {  res.sendFile(__dirname + '/lib/all.js');  });
app.get('/fragment.fs', (req, res) => {  res.sendFile(__dirname + '/shader/fragment.fs'); });
app.get('/vertex.vs',   (req, res) => {  res.sendFile(__dirname + '/shader/vertex.vs'); });

app.get('/download', (req, res) => { res.download(__dirname + '/stage.json')});

const http = require('http').Server(app);
const io = require('socket.io')(http);
io.sockets.on('connection', (socket) => {

  const stageObject = JSON.parse(fs.readFileSync('stage.json'));
  socket.emit('initStage', stageObject);
  const stageArray = [];
  console.log('connect');
  socket.on('putData', (data) => {
    stageArray.push(data);
    fs.writeFileSync('stage.json', JSON.stringify(stageArray));
    console.log(data);
  });
});

http.listen(8080);