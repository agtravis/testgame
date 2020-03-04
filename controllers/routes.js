'use strict';

const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(`../models`);

module.exports = app => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get(`/api/highscores`, (req, res) => {
    db.highScore.findAll({}).then(dbScore => {
      res.json(dbScore);
    });
  });

  app.post(`/api/highscores`, (req, res) => {
    db.highScore
      .create({
        name: req.body.name,
        score: req.body.score
      })
      .then(dbScore => {
        res.json(dbScore);
      });
  });
};

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
