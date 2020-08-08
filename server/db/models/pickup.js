const Sequelize = require('sequelize')
const db = require('../db')

const Pickup = db.define('pickup', {
  recurring: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  pickedup: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  lbs: {
    type: Sequelize.FLOAT(24)
  }
})

module.exports = Pickup
