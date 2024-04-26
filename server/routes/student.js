const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentcontroller');
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

// Route for student registration
router.post("/register",upload.single('image'), StudentController.registerStudent);


// Route for student login
router.post("/login", StudentController.loginStudent);

// Route for fetching student data
router.post("/fetch", StudentController.fetchStudent);

router.post("/edit", StudentController.Editstudent);

router.post("/fetchstudent", StudentController.fetch);
// Route for fetching students with waiting status
router.post("/fetch/waiting", StudentController.fetchStudentWithWaitingStatus);

// Route for fetching students' status
router.post("/fetch/students/status", StudentController.fetchStudentsStatus);

// Route for updating student status
router.post("/update/status", StudentController.updateStudentStatus);

// Route for checking student outpass
router.post("/check/outpass", StudentController.checkStudentOutpass);

// Route for creating outpass
router.post("/outpass/create", StudentController.createOutpass);

// Route for updating outpass history
router.post("/outpass/update", StudentController.updateOutpassHistory);

// Route for rejecting outpass
router.post("/outpass/reject", StudentController.rejectOutpass);

// Route for accepting outpass
router.post("/outpass/accept", StudentController.acceptOutpass);

// Route for fetching rejected outpasses
router.post("/outpass/rejected", StudentController.getRejectedOutpasses);

// Route for fetching rejected outpasses
router.post("/fetch/students/statushostel", StudentController.fetchStudentStatushostel);

module.exports = router;
