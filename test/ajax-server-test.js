var assert = require("assert");
var ajax = require("../lib/ajax-server.js").init();
describe('ajax-server-tests', function(){
  describe('get methods', function(){
    it('should return hello world when request aginst dummyService.', function(done){      
		ajax.get({
			url:'/test',
			hostname : '127.0.0.1',
            port :'1337'
		}, function(err, data){			
			assert.equal(data, "Hello World\n");		
			done();
		});    	
    });
    it('should return a 404 when with page data when 404 is hit.', function(done){
    	ajax.get({
			url:'/notFound',
			hostname : '127.0.0.1',
            port :'1337'
		}, function(err, data){				
			assert.equal( err.error.code, 404);		
			assert.equal( err.error.message, 'Not Found');		
			assert.equal( err.error.description, 'page not found');		
			assert.equal( data, undefined);		
			done();
		});    	
    });    
    it('should return a 400 when with page data when bad request is hit.', function(done){
    	ajax.get({
			url:'/badRequest',
			hostname : '127.0.0.1',
            port :'1337'
		}, function(err, data){					
			assert.equal( err.error.code, 400);		
			assert.equal( err.error.message, 'Bad Request');		
			assert.equal( err.error.description, 'bad request');		
			assert.equal( data, undefined);		
			done();
		});    	
    });    
    it('should return a 501 when with page data when error is hit.', function(done){
    	ajax.get({
			url:'/error',
			hostname : '127.0.0.1',
            port :'1337'
		}, function(err, data){								
			assert.equal( err.error.code, 501);		
			assert.equal( err.error.message, 'Not Implemented');		
			assert.equal( err.error.description, 'error message here\n');		
			assert.equal( data, undefined);		
			done();
		});    	
    });    
    
  });
	
  describe('post methods', function(){
    it('should return posted datad when request aginst dummyService.', function(done){      
		var testData = {"erin":"hello"};
		ajax.post({
			url:'/test',
			hostname : '127.0.0.1',
            port :'1337',
            data: testData
		}, function(err, data){			
			assert.equal(data, JSON.stringify(testData));		
			done();
		});    	
    });
    it('should return a 404 when with page data when 404 is hit.', function(done){
    	var testData = {"erin":"hello"};
    	ajax.post({
			url:'/notFound',
			hostname : '127.0.0.1',
            port :'1337',
            data: testData
		}, function(err, data){				
			assert.equal( err.error.code, 404);		
			assert.equal( err.error.message, 'Not Found');		
			assert.equal( err.error.description, 'page not found');		
			assert.equal( data, undefined);		
			done();
		});    	
    });    
    it('should return a 400 when with page data when bad request is hit.', function(done){
    	var testData = {"erin":"hello"};
    	ajax.post({
			url:'/badRequest',
			hostname : '127.0.0.1',
            port :'1337',
            data: testData
		}, function(err, data){					
			assert.equal( err.error.code, 400);		
			assert.equal( err.error.message, 'Bad Request');		
			assert.equal( err.error.description, 'bad request');		
			assert.equal( data, undefined);		
			done();
		});    	
    });    
    it('should return a 501 when with page data when error is hit.', function(done){
    	var testData = {"erin":"hello"};
    	ajax.post({
			url:'/error',
			hostname : '127.0.0.1',
            port :'1337',
            data: testData
		}, function(err, data){								
			assert.equal( err.error.code, 501);		
			assert.equal( err.error.message, 'Not Implemented');		
			assert.equal( err.error.description, 'error message here\n');		
			assert.equal( data, undefined);		
			done();
		});    	
    });    
    
  });	
	
});