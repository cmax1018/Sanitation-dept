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
User.hasMany(Collection)
Collection.belongsTo(User)

Collection.hasMany(Bin)
Bin.belongsTo(Collection)

Bin.hasMany(Pickup)
Pickup.belongsTo(Bin)

User.hasMany(Pickup)
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
