const router = require('express').Router()
const {User, Pickup, Bin} = require('../db/models')
module.exports = router

router.put('/me/toggle', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const toggle = req.body.toggle
    user[toggle] = !user[toggle]
    await user.save()
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'type'],
      include: [{model: Pickup}, {model: Bin}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
