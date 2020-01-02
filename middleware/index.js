// Dependencies
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
// Routers
const usersRouter = require("../controllers/user");
const authRouter = require("../controllers/auth");
const allegiancesRouter = require("../controllers/allegiance");
const usersAllegiancesRouter = require("../controllers/user_allegiance");
const groupsRouter = require("../controllers/group");
const groupsUsersRouter = require("../controllers/group_user");
const groupsAllegiancesRouter = require("../controllers/group_allegiance");
const postsRouter = require("../controllers/post");
const postsLikesRouter = require("../controllers/post_like");
const repliesRouter = require("../controllers/reply");
const repliesLikesRouter = require("../controllers/reply_like");
const feedRouter = require("../controllers/feed");
const notificationsRouter = require("../controllers/notification");
const privateGroupInvitesRouter = require("../controllers/join_private_group_request");

module.exports = (server) => {
// Library Middleware
server.use(cors(), helmet(), express.json(), compression());
    // API endpoints
server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);
server.use("/api/allegiances", allegiancesRouter);
server.use("/api/users_allegiances", usersAllegiancesRouter);
server.use("/api/groups", groupsRouter);
server.use("/api/groups_users", groupsUsersRouter);
server.use("/api/groups_allegiances", groupsAllegiancesRouter);
server.use("/api/posts", postsRouter);
server.use("/api/posts_likes", postsLikesRouter);
server.use("/api/replies", repliesRouter);
server.use("/api/replies_likes", repliesLikesRouter);
server.use("/api/feed", feedRouter);
server.use("/api/notifications", notificationsRouter);
server.use("/api/private", privateGroupInvitesRouter);
return server
}