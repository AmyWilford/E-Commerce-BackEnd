const router = require('express').Router();
// Import all API routes from folder, and establish use of /api endpoint
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;