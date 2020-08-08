const Sequelize = require('sequelize')
const db = require('../db')

const Collection = db.define('collection', {
  name: {
    type: Sequelize.STRING
  },
  notes: {
    type: Sequelize.STRING
  }
})

module.exports = Collection
