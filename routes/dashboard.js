const express = require("express");

const removeFile = require("../helper/removeFile")
 
const router = express.Router();
const multer = require("multer");
const upload = multer({"dest": "upload/"})


const userAuth = require("../middleware/authentication");
const Photo = require("../models/Photo");
const User = require("../models/User");

router.use(userAuth);

router.get('/', async(req, res)=> {

    const photos = req.user?.uploaded_photos;
    const res_photo = await Promise.all(photos.map(async(p)=>{
        const photo = await Photo.findById(p);
        return {
            id: photo?.id,
            path: photo?.path
        }
    }))

    res.status(200).json({"photos": res_photo});
});
router.route('/upload')
.get((req, res)=>{
    res.render("photo")
})
.post(upload.single("file"), async(req, res)=>{
    const file = await Photo.create({
        oringinal_name: req.file.originalname,
        path: req.file.path,
        uploader: req.user
    });
    const user = await User.findById(req.user._id)
    user.uploaded_photos.push(file)
    await user.save()
    res.status(301).json({"msg": "file uploaded"})
})

router.route('/:id')
.get(async(req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.status(200).json({"path": photo.path})

})
.put(upload.single("file"),async(req, res) => {
   removeFile((await Photo.findById(req.params.id))?.path)
    const photo = await Photo.findByIdAndUpdate(req.params.id, {
        oringinal_name: req.file.originalname,
        paht: req.file.path
    })
    res.status(301).json({"msg": "update successful"})
})
.delete(async(req, res)=>{

    const photo = await Photo.findById(req.params.id)

    removeFile(photo?.path)
    const user = await User.findById(req.user.id);
        
    let photos = []


    user.uploaded_photos.pop(photo.id)
    photos = user.uploaded_photos;



    await User.updateOne(user, {uploaded_photos: photos})
    await Photo.findByIdAndDelete(req.params.id);

    res.status(300).json({"msg": "deleted"})
})




module.exports = router;