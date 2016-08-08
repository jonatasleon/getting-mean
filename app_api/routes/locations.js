var express = require('express');
var router = express.Router();

var ctrlLocations = require('../controllers/locations');

// locations
router.get('/', ctrlLocations.locationsListByDistance);
router.post('/', ctrlLocations.locationsCreate);
router.get('/:locationid', ctrlLocations.locationsReadOne);
router.put('/:locationid', ctrlLocations.locationsUpdateOne);
router.delete('/:locationid', ctrlLocations.locationsDeleteOne);

// reviews
router.use('/:locationid/reviews', require('./reviews'));

module.exports = router;
