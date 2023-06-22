const db = require("../models");
const Review = db.review;
const User = db.users;
const Op = db.Sequelize.Op;


const reviewCtrl ={
    postReview: async(req,res)=>{
    const {userId, feeback, image} = req.body;
    try{
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }

        const review = await Review.create({userId, feeback, image});
        res.status(201).json(review);
        }catch(err){
            console.log(err);
           return res.status(500).json({msg:err.message})
        }
    },
    getReview: async(req,res)=>{
        const reviewId = req.params.id;

        try{
            const review = await Review.findByPk(reviewId, {
                include: {model: User, attributes: ['id', 'username']}
            });

            if(!review){
                return res.status(404).json({msg: 'Review not found'})
            }

            res.json(review)
        }catch(err){
             console.log(err);
            return res.status(500).json({msg:err.message})
        }
    },
    getAllReview: async(req,res)=>{
        try{
            const reviews  = await Review.findAll();
            return res.status(201).json(reviews);

        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    updateReview: async(req,res)=>{
        try{
            const patchObject = req.body;
            const {feeback, image} = patchObject;
            const updateReview = await Review.update(patchObject,{
                where: {id: req.params.id}
            })

            res.status(200).json("Review update successfully");

        }catch(err){
            res.status(500).json({msg: err.message});

        }
       
    }

}

module.exports = reviewCtrl;