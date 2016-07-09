var apiOptions = {
    server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://loc8r-infinite.herokuapp.com/";
}

module.exports.apiOptions = apiOptions;
