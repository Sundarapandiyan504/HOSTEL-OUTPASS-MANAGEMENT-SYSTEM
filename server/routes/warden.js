const express = require('express');
const router = express.Router();
const { registerWarden, loginWarden, wardenfetch,wardenhostel,wardenassign,wardenfetchAndFetchStudent,combinedRouteHandler,cancel,fetch,Editstudent,report } = require('../controllers/wardencontroller');
const multer = require('multer');


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname );
	}
  });
  
  const upload = multer({ storage })
// Route for warden registration
router.post('/register',upload.single('image'), registerWarden);

// Route for warden login
router.post('/login', loginWarden);

router.post('/fetch', wardenfetch);

router.post('/fetchstu', fetch);

router.post('/hostel', wardenhostel); 

router.post('/assign', wardenassign);

router.post("/edit", Editstudent);

router.post("/report", report);

router.post('/studentfetch', wardenfetchAndFetchStudent);

router.post('/combine', combinedRouteHandler);

router.post('/cancel', cancel);

module.exports = router;