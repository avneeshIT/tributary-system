const express = require("express");
const router = express.Router();
const tributeController = require("../controllers/tributeController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


router.get("/", tributeController.getAllTributes);



router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  tributeController.createTribute
);

router.delete(
  "/:id",
  authMiddleware,
  tributeController.deleteTribute
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  tributeController.updateTribute
);


module.exports = router;