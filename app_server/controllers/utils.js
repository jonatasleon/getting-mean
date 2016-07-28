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

function _showError(req, res, status) {
  var title, content;
  if (status === 404) {
    title = '404, page not found';
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else {
    title = status + ", something's gone wrong";
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title: title,
    content: content
  });
}

module.exports._formatDistance = _formatDistance;
module.exports._showError = _showError;
