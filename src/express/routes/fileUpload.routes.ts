import express, { Router } from "express"
import multer from "multer"
import { profilePicUpload, profileStorage } from "../controllers/fileUpload.controller"
import { welcomeController } from "../controllers/user.controller"
import auth from "../middleware/auth"
const router = Router()

// profile pic upload
const uploadProfile = multer({ storage: profileStorage })
router.put('/profile-pic-upload', auth, uploadProfile.single('profile_photo'), profilePicUpload)


export default router