const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin,adminfetch,fetchStudent,deletestudent,report,studentsfetch,fetch,studentedit,studente } = require('../controllers/adminController');
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
// Route to register a new admin
router.post('/register', registerAdmin);

// Route to login an admin
router.post('/login', loginAdmin);

router.post('/report', report);

// Route to fetch student an admin
router.post('/fetch', adminfetch);

router.post('/fetchstudent', fetch);

router.post('/studentedit',upload.single('image'), studentedit);

router.post('/studente', studente);

// Route to fetch student an admin
router.post('/fetchstuf', studentsfetch);

router.post('/fetchStu', fetchStudent);

router.post('/delete', deletestudent);
// Other routes for admin management (update, delete, etc.) can be added here

module.exports = router;
