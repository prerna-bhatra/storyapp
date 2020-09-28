const express = require('express');
const router = express.Router();
const Story  = require("../models/Story");

const { auth } = require("../middleware/auth");

//=================================
//             Add a new Story
//=================================


router.post("/addstory", (req, res) => {

    /*console.log(req.body)
    console.log(Story)*/

    const story= new Story(req.body);

    story.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })



});

//=================================
//            Update likes
//=================================



//=================================
//            Update dislikes
//=================================




//=================================
//            Update Views
//=================================

module.exports = router;

