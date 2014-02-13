var http = require('http');
http.createServer(function (req, res) {	
	if(req.url === '/test'){
		if(req.method === "POST"){
			var dat = "";
			req.on('data', function(chunk){
				dat += chunk;
			});
			req.on('end', function(){
				res.writeHead(200, {'Content-Type': req.headers["content-type"] || 'text/plain' });
				res.end(dat);				
			});
			
		} else {
			res.writeHead(200, {'Content-Type': 'text/plain'});
  			res.end('Hello World\n');			
		}				
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