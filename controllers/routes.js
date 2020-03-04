'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render('index');
});

// router.get('/phaser', (req, res) =>
//   res.sendFile(path.join(__dirname, '../external/phaser.min.js'))
// );

// router.get('/scene1', (req, res) =>
//   res.sendFile(path.join(__dirname, '../Scene1.js'))
// );

// router.get('/scene2', (req, res) =>
//   res.sendFile(path.join(__dirname, '../Scene2.js'))
// );

// router.get('/scene3', (req, res) =>
//   res.sendFile(path.join(__dirname, '../Scene3.js'))
// );

// router.get('/beam', (req, res) =>
//   res.sendFile(path.join(__dirname, '../beam.js'))
// );

// router.get('/explosion', (req, res) =>
//   res.sendFile(path.join(__dirname, '../explosion.js'))
// );

// router.get('/game', (req, res) =>
//   res.sendFile(path.join(__dirname, '../game.js'))
// );

module.exports = router;
