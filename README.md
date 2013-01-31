#node-http-exfiltrate

This is just a quick a dirty HTTP server that listens on a port waiting for a file to be crammed into it's socket. I created it when I needed quick http exfiltration from a remote server.

*This assumes you have node installed*

## Install
1. git clone https://github.com/evilpacket/node-http-exfiltrate.git
2. npm i

## Usage
```
Usage: node ./app.js

Options:
  --insecure  Start insecure HTTP server
```
## Warning
The HTTPS server will use the provided SSL certificates by default. You should really generate your own certs to use, but hey it's up to you. ![This](http://www.akadia.com/services/ssh_test_certificate.html) might help with that.

