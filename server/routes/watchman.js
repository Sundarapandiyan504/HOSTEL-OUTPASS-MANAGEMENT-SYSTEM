const express = require("express");
const router = express.Router();
const watchmanController = require("../controllers/watchmanController");

// Route to create a new Watchman
router.post("/", watchmanController.createWatchman);

// Route for Watchman login
router.post("/login", watchmanController.loginWatchman);

// Route to fetch Watchman details
router.post("/fetch", watchmanController.fetchWatchman);

// Route to update student status
router.post("/upd", watchmanController.updateStudentStatus);

// Route to fetch all Watchmen
router.post("/fetch/Watchman", watchmanController.fetchAllWatchmen);

// Route to verify token
router.post("/verify", watchmanController.verifyToken);

// Route to check student
router.post("/stucheck", watchmanController.checkStudent);

// Route to create an outpass
router.post("/outpass", watchmanController.createOutpass);

// Route to update an outpass
router.post("/outpassUpdate", watchmanController.updateOutpass);

module.exports = router;
