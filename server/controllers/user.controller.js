const User = require('../models/User.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
    register: (req, res) => {
        const user = new User(req.body);
        user.save()
            .then((newUser) => {
                console.log(newUser);
                console.log("successful register");
                res.json({
                    successMessage: "thank you for registering",
                    user: newUser
                });
            })
            .catch((err) => {
                console.log('registration not successful');
                console.log(err);
                res.status(400).json(err);
            });
    },
    login: async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user === null) {
        // email not found in users collection
        return res.status(300).json({ errors: { email: { message: "user doesn't not egzists" } } });
    }
//verify password
// if(user){
//     const isMatch= await bcrypt.compare(passord,user.password)
//     is(isMatch){
//         const token=await user.generateToken();
//         res.cookie("jwt",token,{
//             expires:new Date(Date.now()+86400000),
//             httpOnly:true
//         });
//         res.status(200).send("Logged In")

//     }else{
//         res.status(400).send("Invalid password")
//     }
// }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if (!correctPassword) {
      
        return res.status(300).json({ errors: { password: { message: "passwordi is not correct" } } });
    }

  
    const userToken = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!" });
},
logout: (req, res) => {
    console.log("logging out")
    res.clearCookie("usertoken");
    res.json({
        message: "You have succesfully logged out"
    })

},
    getOneUser: (req, res) => {
        User.findOne({ _id: req.params.id })
            .then((oneUser) => {
                console.log(oneUser);
                res.json(oneUser);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
     
};
module.exports.createUser = (req, res) => {
    // console.log(req.body.role)
    User.exists({role: "admin"})
    .then(userExists => {
        if (userExists && req.body.role=="admin") {
            return Promise.reject({errors:{role:{message:"admin egziston"}}});
        }
        return User.create(req.body);
    })
    .then(saveResult => res.json(saveResult))
    .catch(err => res.status(300).json(err));
}
module.exports.getAllUsers = (request, response) => {
    User.find({}).sort({name:'asc'})
        .then(users => {
           
            response.json(users);
        })
        .catch(err => {
            response.json(err)
        })
}
module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
module.exports.getUser = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(user => response.json(user))
        .catch(err => response.json(err));
}

module.exports.updateUser = (request, response) => {
 
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.json(err))
}

module.exports.message = (req, res) => {
    const name = req.body.name;
    const email = req.body.email; 
    const message = req.body.message;
  
    const createUser = new User({
      name: name,
      email: email,
      message: message,
    });
  
    createUser
      .save() 
      .then((created) => {
        console.log(created);
        res.status(200).send("Registered");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error registering user");
      });
  };