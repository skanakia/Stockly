'use strict'
const User = require("../../models/User");
const passport = require("../../config/passport");

module.exports = (app)=>{

    const getCurrentUser =(req, res) =>{
        const { id, username } = req.user;
        res.json({
          id, username
        });
      }

    //current user Data
    app.get("/api/user/current", (req,res)=>{
        if(!req.user){
            return res.status(401).json({"error": "Please log in to continue"})
        }else {
            User.findOne({_id:req.user.id})
            .then((dbUser)=>{
                res.json(
                    {id: dbUser._id,
                    username: dbUser.username,
                    email: dbUser.email,
                    })
            }).catch((err)=>{
                res.json(err)
        })
    }
    });
    
    //user login
    //expects to receive an object from the client
    app.post("/api/user/login", passport.authenticate("local"), function (req,res) {
        console.log("login attempt", req.body)
        if (!req.user) {
            return res.status(401).json({
              message: 'Invalid username or password.'
            })
          }
          getCurrentUser(req, res);
    })

    //User Signup
    //expects to receive an object from the client
    app.post("/api/user/signup", (req,res)=>{
        console.log("signup attempt", req.body);
        User.create(req.body)
        .then((dbUser)=>{
            console.log("signup success");
            res.end()
        }).catch((err)=>{
            console.log(err);
            res.json(err)
        })
    })

    //user logout
    app.get("/logout",(req, res)=>{
        req.logout();
        res.end();
    })

    

}