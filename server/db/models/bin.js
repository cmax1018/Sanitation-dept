const Sequelize = require('sequelize')
const db = require('../db')

const Bin = db.define('bin', {
  type: {
    type: Sequelize.ENUM([
      'compost',
      'landfill',
      'wood',
      'metal',
      'paper',
      'plastic_wrap',
      'plastic_bottles',
      'glass',
      'aluminum',
      'e-waste'
    ]),
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM(['requested', 'approved', 'archived'])
  },
  period: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = Bin
