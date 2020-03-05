'use strict';

const db = require(`../models`);

module.exports = (app, sequelize) => {
  // by max method
  //   app.get('/api/highscores/top', (req, res) => {
  //     db.highScore
  //       .findAll({
  //         attributes: [
  //           [sequelize.fn('max', sequelize.col('score')), 'high_score'],
  //           sequelize.col('name')
  //         ],
  //         raw: true
  //       })
  //       .then(dbScore => {
  //         console.log(dbScore);
  //         res.json(dbScore);
  //       });
  //   });

  app.get('/api/highscores/top', (req, res) => {
    db.highScore
      .findAll({
        order: [['score', 'DESC']],
        raw: true
      })
      .then(dbScore => {
        res.json(dbScore);
      });
  });

  // exports.getStaticCompanies = function() {
  //   return Company.findAll({
  //     where: {
  //       id: [46128, 2865, 49569, 1488, 45600, 61991, 1418, 61919, 53326, 61680]
  //     },
  //     // Add order conditions here....
  //     order: [
  //       ['id', 'DESC'],
  //       ['name', 'ASC']
  //     ],
  //     attributes: [
  //       'id',
  //       'logo_version',
  //       'logo_content_type',
  //       'name',
  //       'updated_at'
  //     ]
  //   });
  // };

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
