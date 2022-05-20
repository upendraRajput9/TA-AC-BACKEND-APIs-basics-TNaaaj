var express = require('express');
var Countries = require('../models/Countrie');
var State = require('../models/State');
var mongoclient = require('mongodb');
var url = "mongodb://localhost/countries-info"
var router = express.Router();

const databasename = "countries-Info"
router.get('/',(req,res,next)=>{
  
        Countries.find({},(err,countries)=>{
            if(err) return next(err);

            res.status(200).json({countries:countries.sort()})
        })
    })
   

router.post('/',(req,res,next)=>{
    Countries.create(req.body,(err,country)=>{
        if(err) return next(err);
        res.status(200).json({country})
    })
})
router.put('/:id/update',(req,res,next)=>{
    var id = req.params.id;
    req.body.religions=req.body.religions.spilt(" ");
    req.body.neighbouring_countires=req.body.neighbouring_countires.spilt(" ");
    Countries.findByIdAndUpdate(id,req.body,(err,country)=>{
if(err) return next(err);
res.status(200).json({country})
    })
})
router.put('/:id/delete',(req,res,next)=>{
    var id = req.params.id;
    Countries.findByIdAndDelete(id,(err,country)=>{
if(err) return next(err);
res.status(200).json({country})
    })
})

router.post('/:id',(req,res,next)=>{
    var id = req.params.id;
    req.body.country=id;
    State.create(req.body,(err,state)=>{
        if(err) return next(err);
        Countries.findByIdAndUpdate(id,{$push:{state:state._id}},(err,country)=>{
            if(err) return next(err);
         res.status(200).json({state})
        })
    })
    
})

router.get("/:id/neighbourCountries",(req,res,next)=>{
    var id = req.params.id;
    Countries.findById(id,(err,coutry)=>{
        if(err) return next(err);
        res.status(200).json({countries:country.neighbouring_countires})
    })
});
router.get("/:id/religions",(req,res,next)=>{
    var id = req.params.id;
    Countries.findById(id,(err,coutry)=>{
        if(err) return next(err);
        res.status(200).json({religions:country.religions})
    })
})

router.get('/:id/filterBYreligion',(req,res,next)=>{
    var religion = req.params.id;
    Countries.aggregate([{"$match":{religions:religion}}],
    function(err,data){
        if ( err ) return next(err);
        res.status(200).json({data})
      
    }
    )
})

router.get('/:id/filterBycontinent',(req,res,next)=>{
    var continent = req.params.id;
    Countries.find({continent:continent},(err,countries)=>{
        if(err) return next(err);
        res.status(200).json({coutries})
    })
})

router.get('/:id/filterBypopulation',(req,res,next)=>{
    var population = req.params.id;
    Countries.find({population:{$lte:population}},(err,countries)=>{
        if(err) return next(err);
        res.status(200).json({coutries})
    })
})
module.exports = router;