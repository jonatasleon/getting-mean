var config = {
    production: {
        MONGOLAB_URI: 'mongodb://localhost/Loc8r',
        SERVER: 'https://loc8r-infinite.herokuapp.com/'
    },
    dev: {
        MONGOLAB_URI: 'mongodb://localhost/Loc8r',
        SERVER: 'http://localhost:3000'
    }
};

module.exports = function (env) {
    return config[(env || process.argv[2] || 'dev')];
}
