'use strict'

const db = require('../server/db')
const {User, Bin, Pickup} = require('../server/db/models')
const csv = require('csvtojson')
const path = require('path')

const csvFilePath = path.join(__dirname, 'pickups.csv')
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  const pickups = await csv().fromFile(csvFilePath)
  console.log('json', pickups)
  const promises = pickups.map(async pickup => {
    const user = await User.findOrCreate({
      where: {id: pickup.customer_id},
      defaults: {
        type: 'individual',
        email: pickup.customer_id,
        password: 'password'
      }
    })
    const pick = await Pickup.build({
      id: pickup.id,
      lbs: pickup.lbs,
      date: pickup.pickup_date,
      userId: user[0].id,
      pickedUp: true
    })

    await pick.save()

    const bin = await Bin.build({type: pickup.bin_type, userId: user[0].id})
    await bin.save()
    return pick
  })
  const handled = await Promise.all(promises)
  console.log(handled)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
