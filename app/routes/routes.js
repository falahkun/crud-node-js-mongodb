const router = require('express').Router();
const User = require('../model/model');
const fs = require('fs');
const mime = require('mime');

router.post("/upload", async (req, res) => {
    let matcher = req.body.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let fileName = Date.now().toString() + "image." + mime.getExtension(matcher[1]);
    try{
        fs.writeFileSync("publics/images/" + fileName, Buffer.from(matcher[2], 'base64'), 'utf8');
        return res.status(200).json({"status":true, "message":"Image Uploaded", "result":null});
    }catch(e) {
        res.status(403).json({"status":false, "message":"Can't Upload "+e, "result":null});
    }

    // console.log(req.body.image)
    // fs.writeFile(Date.now() + ".png", req.body.image, {encoding: 'base64'}, function(err) {
    //     if(err) {
    //         res.status(403).json({"status":false, "message":"cant upload image"});
    //     }
    //     res.status(200).json({"status":true, "message":"berhasil"});
    // });
});

router.get("/welcome", (req, res) => {
    res.json({"status":true, "message":"Welcome To my Api"});
});

router.post("/create", (req, res) => {
    let matcher = req.body.image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let fileName = Date.now().toString() + "image." + mime.getExtension(matcher[1]);
    fs.writeFileSync("publics/images/" + fileName, Buffer.from(matcher[2], 'base64'), 'utf8');
    
    let user = User({
        name: req.body.name,
        email: req.body.email,
        uid:req.body.uid,
        phone:req.body.phone,
        image: "localhost:5000/api/images/" + fileName,
    })
    user.save(function(err) {
        if(err) {
            res.status(404).json({"status":false, "message":"Can't Create", "result":null});
        }
        res.json({"status":true, "message":"Created"});
    });
});

router.get("/users", (req, res) => {
    User.find({}, function(err, users) {
        if(err) {
            res.status(404).json({"status":false, "message":"Can't Load", "result":null});}
        res.json({"status":true, "message":"Loaded", "result":users});
    })
});

router.get("/users/:id", (req, res) => {
    User.findById(req.params.id, function(err, user) {
        if(err) {
            res.status(404).json({"status":false, "message":"Can't Load", "result":null});
        }
        res.json({"status":true, "message":"Loaded", "result":user});
    })
})

router.put("/users/update/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, user) {
        if(err) {
            res.status(404).json({"status":false, "message":"Can't Update," + req.params.id + "is not found", "result":null});}
        res.json({"status":true, "message":"Updated"});
    })
})

router.delete("/users/delete/:id", (req, res) => {
    User.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.sendStatus(400);
            return res.json({"status":false, "message":"Can't Delete", "result":null});}
        res.json({"status":true, "message":"Updated"});
    })
})

router.get('/images/:image', (req, res) => {
    fs.readFile("./publics/images/" + req.params.image, function(err, data) {
        if(err) res.status(404).json({"status":false, "message":"Image is not found", "result":null});
        res.end(data);
    });
})


module.exports = router;
