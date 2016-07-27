"use strict";

var config = {
    production: {
        MONGOLAB_URI: process.env.MONGOLAB_URI,
        SERVER: 'https://loc8r-infinite.herokuapp.com/'
    },
    dev: {
        MONGOLAB_URI: 'mongodb://localhost/Loc8r',
        SERVER: 'http://localhost:3000/'
    }
};


module.exports = function (env) {
    return config[env || process.env.NODE_ENV] || config.dev;
};
