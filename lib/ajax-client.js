(function ajaxClientInit(module) {
    'use strict';    
    var _ = require('underscore');

    module.exports = {
        init: function ($, undefined) {

            var isJson = function (text) {
                return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
            };

            var makeRequest = function (options, cb) {
                cb = cb || function(err, data){};
                request = new XMLHttpRequest;
                request.open(options.type, options.url, true);

                request.onreadystatechange = function() {
                    if (this.readyState === 4){
                        if (this.status >= 200 && this.status < 400){
                          // Success!
                            resp = this.responseText;
                            if(options.dataType === 'json'){
                                
                            }
                        } else {
                          // Error :(
                        }
                    }
                }
                if(options.data){
                    request.send(options.data);
                } else {
                    request.send();
                }
                request = null;

                $.ajax(_.defaults(options, {
                    headers: {},
                    dataType: 'json',
                    cache: false,
                    success: function (response) {
                        if (cb && typeof cb === 'function') {
                            cb(null, response);
                        }
                    },
                    error: function (error) {
                        if (cb && typeof cb === 'function') {
                            cb(error, null);
                        }
                    }
                }));
            };

            var ajax = {
                'get': function (options, cb) {
                    makeRequest({
                        url: options.url,
                        data: options.data,
                        contentType: options.contentType || 'application/json;charset=utf-8',
                        type: 'get'
                    }, cb);
                },
                'post': function (options, cb) {
                    makeRequest({
                        url: options.url,
                        data: options.data,
                        contentType: options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
                        type: 'post'
                    }, cb);
                },
                'delete': function (options, cb) {
                    makeRequest({
                        url: options.url,
                        data: options.data,
                        contentType: options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
                        type: 'delete'
                    }, cb);
                }
            };

            /* enable support of CORS */
            $.support.cors = true;

            return ajax;
        }
    };
})(module);