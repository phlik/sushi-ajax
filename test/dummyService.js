var http = require('http');
http.createServer(function (req, res) {
	if(req.url === '/test'){
		res.writeHead(200, {'Content-Type': 'text/plain'});
  		res.end('Hello World\n');		
	} else if (req.url === '/error'){
		res.writeHead(501, {'Content-Type': 'text/plain'});
		res.end('error message here\n');		
	} else if (req.url === '/notFound'){
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end('page not found');
	} else if (req.url === '/badRequest'){
		res.writeHead(400, {'Content-Type': 'text/plain'});
		res.end('bad request');
	}
  
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');