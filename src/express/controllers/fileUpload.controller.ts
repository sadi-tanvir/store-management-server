import multer from "multer"
import randomString from "randomstring"
import path from "path"
import fs from "fs"
import { Response } from "express"
import User from "../../models/User"



// profile storage
export const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/profile-pic/')
    },
    filename: (req, file, cb) => {
        let p1 = randomString.generate(5)
        let p2 = randomString.generate(5)
        let ext = (path.extname(file.originalname)).toLowerCase()

        let fullName = `${p1}_${p2}${ext}`
        cb(null, fullName)
    }
})

// profile upload callback function
export const profilePicUpload = async (req: any, res: Response) => {
    // if file field empty
    if (!req.file) {
        return res.status(400).json({ message: 'input field is empty.' })
    }

    // find user from database
    const _user = await User.findOne({ email: req?.email })

    // update profile picture to database
    const _profileUpload = await User.findOneAndUpdate(
        { email: _user?.email },
        { $set: { image: req.file.filename } },
        { new: true }
    )

    if (_user?.image != 'empty-avatar.png') {
        fs.unlinkSync(`./public/profile-pic/${_user?.image}`)
    }

    // success
    return res.status(200).json({
        status: true,
        message: 'The profile photo has been uploaded.',
        profile_photo: _profileUpload?.image
    })
}