(function ajaxServerInit(module) {
    'use strict';
    
    var http = require('http');
    var https = require('https');
    var _ = require('underscore');
    var qs = require('querystring');


    
    module.exports = {
        init: function (undefined) {
            var noOpp = function(){};
            var isJson = function (text) {
                return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
            };

            var makeRequest = function (options, cb) {
                cb = cb || noOpp;
                var protocol = options.port === 443 ? https : http;

                var content = ""

                if(options.method === 'POST'){                    
                    
                    options.headers = options.headers || {};
                    options.headers["Content-Type"] = options.contentType || "application/json";
                    if(typeof options.data === 'string'){
                        content = options.data;
                    } else if(options.headers["Content-Type"] === "application/x-www-form-urlencoded") {
                        content = gs.stringify(options.data);
                    } else {
                        content = JSON.stringify(options.data);
                    }
                    options.headers["Content-Length"] = content.length;
                }


                // TODO: pass in default location
                if (!options.hostname) {
                    options.hostname = 'localhost';
                    options.port = 7889;
                }

                if (options.url && !options.path) {
                    options.path = options.url;
                    delete options.url;
                }

                var expectJson = (options.dataType || '').toLowerCase() === 'json'

                // if (options.data) {
                //     options.path = options.path + _.reduce(options.data, function (memo, value, name) {
                //         return memo + ((_.isNull(value) || _.isUndefined(value) || value === '') ? '' : (name + '=' + value + '&'));
                //     }, '?');
                //     delete options.data;
                // }

                var req = protocol
                    .request(options, function (apiRes) {                        
                        var data = '';

                        apiRes.on('data', function (chunk) {
                            data += chunk;
                        });

                        apiRes.on('end', function (a, b) {                                                        
                            if (apiRes.statusCode >= 200 && apiRes.statusCode < 400) {                                
                                if(expectJson){
                                    if (isJson(data)) {
                                        cb(null, JSON.parse(data));
                                    } else {
                                        cb({ error: { code: '400', message: 'returned data not Json format', description: 'returned data not Json format' } });
                                    }
                                } else {
                                    cb(null, data);
                                }                                
                            } else {
                                cb({ error: { code: apiRes.statusCode, message: protocol.STATUS_CODES[apiRes.statusCode], description: data } });
                            }
                        });

                        apiRes.on('clientError', function (emp, dmp) {
                            console.log("emp", emp);
                            console.log("dmp", dmp);
                        });
                    })
                    .on('error', function (err) {
                        if (cb && typeof cb === 'function') {
                            cb(err, null);
                        }
                    });

                if(options.method === 'POST'){                    
                    req.write(content);
                }

                req.end();                
            };

            var ajax = {
                'get': function (options, cb) {
                    if (options) {
                        options.method = 'GET';
                        makeRequest(options, cb);
                    }
                },
                'post': function (options, cb) {
                    if (options) {
                        options.method = 'POST';
                        makeRequest(options, cb);
                    }
                },
                'put': function (options, cb) {
                    if (options) {
                        options.method = 'PUT';
                        makeRequest(options, cb);
                    }
                },
                'delete': function (options, cb) {
                    if (options) {
                        options.method = 'DELETE';
                        makeRequest(options, cb);
                    }
                }
            };

            return ajax;
        }
    };
})(module);