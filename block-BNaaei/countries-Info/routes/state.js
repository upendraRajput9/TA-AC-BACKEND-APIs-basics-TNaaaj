var express = require('express');
var Countries = require('../models/Countrie');
var State = require('../models/State')
var router = express.Router();

router.get('/',(req,res,next)=>{
    State.find({},(err,state)=>{
        if(err) return next(err);
        res.status.json({state:state.sort()})
    })
})


router.get('/population',(req,res,next)=>{
    var sort ={population:1}
    State.find().sort({population:1}).toArray((err,state)=>{
        console.log(err,state)
        if(err) return next(err);
        res.status.json({state})
    })
})

router.put('/:id/update',(req,res,next)=>{
    var id = req.params.id
State.findByIdAndUpdate(id,req.body,(err,state)=>{
    if(err) return next(err);
    res.status(200).json({state})
})
})

router.get('/:id/delete',(req,res,next)=>{
    var id = req.params.id
    State.findByIdAndDelete(id,(err,state)=>{
        if(err) return next(err);
        res.status(200).json({state})
    })
    })

    //
module.exports = router;