var apiOptions = {
    server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = "https://loc8r-infinite.herokuapp.com/";
}

function _formatDistance(distance) {
    var numDistance, unit;
    if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
    } else {
        numDistance = parseInt(distance * 1000, 10);
        unit = 'm';
    }
    return numDistance + unit;
}

module.exports.apiOptions = apiOptions;
module.exports._formatDistance = _formatDistance;
