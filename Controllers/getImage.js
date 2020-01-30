  var fs = require('fs');
    var url = require('url');

    var query = url.parse(req.url,true).query;
        pic = query.image;
        