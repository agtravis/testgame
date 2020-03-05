'use strict';

const db = require(`../models`);

module.exports = (app, sequelize) => {
  app.get('/api/highscores/top', (req, res) => {
    db.highScore
      .findAll({
        attributes: [
          [sequelize.fn('max', sequelize.col('score')), 'high_score'],
          sequelize.col('name')
        ],
        raw: true
      })
      .then(dbScore => {
        res.json(dbScore);
      });
  });

  app.get('/', (req, res) => {
    db.highScore.findAll({}).then(dbScore => {
      const highScoresObj = {
        highScores: dbScore
      };
      res.render('index', highScoresObj);
    });
  });

  app.delete(`/api/highscores/:id`, (req, res) => {
    db.highScore
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(dbScore => {
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
