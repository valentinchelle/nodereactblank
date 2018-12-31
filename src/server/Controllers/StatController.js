const Sequelize = require('sequelize');
const db = require('../models/index.js');

const Op = Sequelize.Op;
const allowed_names = ['visits', 'subscriptions'];
class StatController {
  // get a given stat
  getStat(req, res) {
    console.log(req.params.name);
    if (allowed_names.includes(req.params.name)) {
      db.Stat.findAll({
        where: {
          name: req.params.name
        }
      }).then((stats) => {
        if (stats.length === 0) return res.status(404).send();
        res.status(200).send(stats);
      });
    } else {
      res.status(500).send('Statistic not whitelisted.');
    }
  }

  getStatTimeInterval(req, res) {
    const name = req.params.name;

    const startdate = parseInt(req.params.startdate, 10);
    const enddate = parseInt(req.params.enddate, 10);
    const timescale = parseInt(req.params.timescale, 10);
    if (allowed_names.includes(req.params.name)) {
      db.Stat.findAll({
        where: {
          name,
          date: {
            [Op.lt]: new Date(enddate),
            [Op.gt]: new Date(startdate)
          }
        }
      }).then((stats) => {
        console.log(stats.length);
        const results = new Array();
        let i = 0;
        while (startdate + i * timescale < enddate) {
          const tableaui = new Array();
          stats.forEach((stat) => {
            if (
              stat.date >= i * timescale + startdate
              && stat.date < (i + 1) * timescale + startdate
            ) {
              tableaui.push(stat);
            }
          });
          results.push(tableaui);
          i += 1;
        }
        res.status(200).send(results);
      });
    } else {
      res.status(500).send('Statistic not whitelisted.');
    }
  }

  // insert a new article
  setStat(req, res) {
    if (allowed_names.includes(req.body.name)) {
      /* Now do where ever you want to do */
      const name = req.body.name;
      const value = req.body.value;
      db.Stat.build({ name, value, date: new Date() })
        .save()
        .then(() => {
          res.status(200).send();
        });

      return res.sendStatus(200).end();
    }
    res.status(500).send('Statistic not whitelisted.');
  }
}

module.exports = StatController;
