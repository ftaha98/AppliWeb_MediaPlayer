var express = require('express');
var serveStatic = require('serve-static');
var http = require('http');

var app = express();
app.use(serveStatic('Projet', {'index':['interface.html']}));

app.get('/music_lib', function(req, res) {
    res.sendFile(__dirname+'/Projet/music_lib.json');
    console.log(req);
})

app.listen(8080);