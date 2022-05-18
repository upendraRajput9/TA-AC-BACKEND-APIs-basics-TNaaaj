var express = require('express');
var Book = require('../models/Book');
var NewBook= require('../models/Newbook');
var Author = require('../models/Author');
var router = express.Router();



router.get('/new', (req,res,next)=>{
  res.render('bookForm',{newBook:"newBook"})
})
router.get('/',(req,res)=>{
  NewBook.find({},(err,books)=>{
    if(err) return next(err);
    res.json({list:books})
  })
});

router.post('/',(req,res)=>{
  NewBook.create(req.body,(err,book)=>{
    console.log("hello")
    if(err) return res.redirect('/new');
    res.render("authorForm",{book,newBook:"newBook"})
  })
})

router.post("/:id/author",(req,res,next)=>{
  let id = req.params.id;
  Author.create(req.body,(err,author)=>{
    if(err) return next(err);
    NewBook.findByIdAndUpdate(id,{$set:{author:author}},(err,book)=>{
      if(err) return next(err);
      res.redirect("/api/books/");
    });
  })
})

router.get('/:id',(req,res,next)=>{
  var id = req.params.id;
  console.log(id)
  NewBook.findById(id,(err,book)=>{
    if(err) return next(err);
  
    res.json({book})
  })
});

router.get('/:id/edit',(req,res,next)=>{
  var id = req.params.id;
  console.log(id)
  NewBook.findById(id,(err,book)=>{
    if(err) return next(err);
    res.json({book})
  })
});

router.post('/:id/edit',(req,res,next)=>{
  var id = req.params.id;
  NewBook.findByIdAndUpdate(id,req.body,(err,book)=>{
    if(err) return next(err);
    res.redirect('/api/books/'+id)
  })
});

router.get('/:id/delete',(req,res,next)=>{
  var id = req.params.id;
  console.log(id)
  NewBook.findByIdAndRemove(id,(err,book)=>{
    console.log(book)
    if(err) return next(err);
    Author.findByIdAndDelete(book.author._id,(arr)=>{
      res.redirect('/api/books/')
    })
    
  })
});


module.exports = router;
