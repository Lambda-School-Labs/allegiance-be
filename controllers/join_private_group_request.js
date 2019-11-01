const express = require('express')
const router = express.Router()
const PrivateInvitees = require('../models/private_group_request')
const validation = require('../middleware/dataValidation')
const { groupSchema } = require("../schemas");
const Users = require('../models/users')

router
.get('/verify/:id').get(async (req, res) => {
  const id = req.params.id
  console.log('this got hit')
    // Check if email of user exists to decide whether to create new user
    const currentUser = await Users.find({ id: id }).first();
    
    if (currentUser) {
  // Check if current user is a member of any groups
  // change to this group
  const userGroups = await GroupsUsers.find({ user_id: currentUser.id });
  if (userGroups) {
    return true
  } else {
    return false
  }
} else {
  return false
}
});

router
.route('/group/:group_id/')
.post(async (req, res) => {
try {
    const { group_id }  = req.params;
    const { userId } = req.body
    const users = await PrivateInvitees.privateInvitation(userId, group_id);
    res.status(200).json(users);
} catch (err) {
    res.status(500).json({ err })
    console.log('err:',err)
}
})
router
    .route('/group/:group_id/:userId')
    .delete(async (req, res) => {
        const { group_id, userId } = req.params
        const deleteRequest = await PrivateInvitees.deleteInvitation(userId, group_id)
        if (deleteRequest) {
            res.status(200).json({
                deleteRequest,
            })
          } else {
            res
              .status(404)
              .json({ message: 'That reply-like association does not exist.' })
          }
})

module.exports = router;