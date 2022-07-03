const express = require("express");

const router = express.Router();


const userAuth = require("../middleware/authentication");
const Photo = require("../models/Photo");

router.use(userAuth);

router.get('/', (req, res)=> {
    const photos = req.user?.uploaded_photos;
    const res_photo = photos.map((p)=>{
        return {
            id: p._id,
            path: p.path
        }
    })
    res.status(200).json({"photos": photos});
});

router.route('/:id')
.get(async(req, res) => {
    const photo = await Photo.findById(req.params.id);

})
.post((req, res) => {

})
.put((req, res) => {

})


module.exports = router;