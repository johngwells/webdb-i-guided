const express = require('express');
const knex = require('../data/db-config');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
  knex
    .select('*')
    .from('posts')
    .then(posts => {
    res.status(200).json(posts)
  })
  .catch(err => res.status(500).json({ error: 'Failed to get post' }))
});

router.get('/:id', (req, res) => {
  knex
    .select('*')
    .from('posts')
    .where('id', '=', req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({ error: 'error' }))
});

// remember to validate the data sent by the client
router.post('/', (req, res) => {
  knex
    .insert(req.body, 'id') // ignore console warning on SQLite
    .into('posts')
    .then(ids => res.status(200).json(ids))
    .catch(err => res.status(500).json({ error: 'Failed to insert post' }));
});

// validate the data before calling the database
router.put('/:id', (req, res) => {
  // const id = req.params.id;
  const changes = req.body
  
  knex('posts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json(count)
    })
    .catch(error => res.status(500).json({ error: 'Failed to delete post'}));
});

router.delete('/:id', (req, res) => {

});

module.exports = router;