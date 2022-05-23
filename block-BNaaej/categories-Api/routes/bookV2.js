var express = require('express');
const { base } = require('../models/BookV3');
var BookV3 = require('../models/BookV3')
var router = express.Router();

router.get('/',(req,res,next)=>{
BookV3.find({},(err,book)=>{
    if(err) return next(err);
    res.status(200).json({book});
})    
})

router.post('/',(req,res,next)=>{
    req.body.category =  req.body.category.split(" ");
    BookV3.create(req.body,(err,book)=>{
        if(err) return next(err);
        res.status(200).json(book);
    })
})

router.get('/:id',(req,res,next)=>{
    var id = req.params.id;
    BookV3.findById(id,(err,book)=>{
        if(err) return next(err);
        res.status(200).json({book});
    })    
    })

    router.get('/:id/category',(req,res,next)=>{
        var id = req.params.id;
        BookV3.find({category:id},(err,book)=>{
            if(err) return next(err);
            res.status(200).json({book});
        })    
        })
    
        router.put('/:id/category',(req,res,next)=>{
var id = req.params.id;
        req.body.category =  req.body.category.split(" ");
    BookV3.findById(id,req.body,(err,book)=>{
        if(err) return next(err);
        res.status(200).json(book);
    })
})

router.delete('/:category',(req,res,next)=>{
    var id = req.params.category;
           
        BookV3.find({category:category},{$pull:{category:category}},(err,book)=>{
            if(err) return next(err);
            res.status(200).json(book);
        })
    })


router.get('/:id/author',(req,res,next)=>{
    var authore = req.params.id;
    BookV3.find({authore:authore},(err,book)=>{
        if(err) return next(err);
        res.status(200).json({book});
    })    
})

router.get('/tags',(req,res,next)=>{
    BookV3.find({},(err,book)=>{
        if(err) return next(err);
        var asctag = book.tags.sort()
        res.status(200).json({tags:book.tags,asctag});
    })    
    })
    router.get(':tags/tags',(req,res,next)=>{
        var tags= req.params.tags;
        BookV3.find({},(err,book)=>{
            if(err) return next(err);
            var asctag = book.tags.sort()
            res.status(200).json({tags:book.tags,asctag});
        })    
        })
module.exports = router