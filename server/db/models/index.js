const User = require('./user')
const Bin = require('./bin')
const Pickup = require('./pickup')
const Collection = require('./collection')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Bin)
Bin.belongsTo(User)

User.hasMany(Pickup)
Pickup.belongsTo(User)
Bin.hasMany(Pickup)
Pickup.belongsTo(Bin)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Bin,
  Pickup,
  Collection
}
