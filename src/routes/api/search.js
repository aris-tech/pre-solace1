const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // Just as a test, make the first item in the list dependent on the request
  const searchResults = [
    {
      name: 'test1',
    },
    {
      name: 'test2',
    },
    {
      name: 'work on this a bit later',
    },
  ];

  return res.json(searchResults);
});

module.exports = router;
