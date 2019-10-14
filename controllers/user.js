const express = require("express");

const Users = require("../models/users");

const router = express.Router();

const validation = require("../middleware/dataValidation");
const userValidation = require("../middleware/user-middleware");
const Notifications = require("../models/notifications");

const { userSchema } = require("../schemas");

router.route("/").get(async (req, res) => {
  const users = await Users.find();
  res.status(200).json({
    users
  });
});

router
  .route("/:id")
  .put(validation(userSchema), async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    const userExists = await Users.find({ id }).first();
    if (!userExists) {
      res.status(404).json({ message: "That user does not exist." });
    } else {
      const updated = await Users.update({ id }, changes);
      res.status(200).json({ updated });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    const deleted = await Users.remove({ id });
    if (deleted) {
      res.status(200).json({ message: "The user has been deleted." });
    } else {
      res.status(404).json({ message: "That user does not exist." });
    }
  })
  .get(async (req, res) => {
    const { id } = req.params;
    const user = await Users.find({ id }).first();
    if (user && user.id) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "That user does not exist." });
    }
  });

router
  .router("/:id/notifications")
  .all(userValidation.validateUserId)
  .get(async (req, res) => {
    const { id } = req.params;
    const notifications = await Notifications.findByUserId(id);
    res.status(200).json(notifications);
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const { invoker_id, type_id, type } = req.body;
    const postNotification = await Notifications.addToUser(
      id,
      invoker_id,
      type_id,
      type
    );
    res.status(201).json(postNotification);
  });

module.exports = router;
