var mongoose = require('mongoose');
var debug = require('debug')('getting-mean:db');
var config = require('../../config')();

var dbURI = config.MONGOLAB_URI;

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    debug('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    debug('Mongoose connection error:' + err);
});

mongoose.connection.on('disconnected', function() {
    debug('Mongoose disconnected');
});

var gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        debug('Mongoose disconnected through ' + msg);
        callback();
    })
};

process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.once('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

process.once('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function() {
        process.exit(0);
    });
});

require('./locations');
