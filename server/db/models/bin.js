const Sequelize = require('sequelize')
const db = require('../db')

const Bin = db.define('bin', {
  type: {
    type: Sequelize.ENUM([
      'Compost',
      'Landfill',
      'Wood',
      'Metal',
      'Paper/Cardboard',
      'Plastic Wrap',
      'Plastic Bottles/Containers',
      'Glass Bottles/Containers',
      'Aluminum Cans/Containers',
      'E-waste'
    ]),
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM(['requested', 'approved', 'archived'])
  },
  period: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  collectionId: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = Bin
