import express from "express";
import {User,Account} from "../db.js";
import {z} from "zod"
import  jwt  from "jsonwebtoken";
const userRouter = express.Router();
import dotenv from "dotenv";
dotenv.config();

import authMiddleware  from "../middlewares.js";

const JWT_SECRET=process.env.JWT_SECRET;

const signupBody =z.object({
    username:z.string().email(),
	firstName:z.string(),
	lastName:z.string(),
	password:z.string()
})

userRouter.post("/signup",async(req,res)=>{
    const success=signupBody.safeParse(req.body);
    if(!success){
       return res.json({
            message:"Incorrect Credentials"
        })
    }
        const { username, firstName, lastName, password } = req.body;
        
    const user=await User.findOne({
        username:username
    })
    if(user){
        return res.json({
            message:"username already taken"
        })
    }




    try {
        const user=await User.create({
            username,
            password,
            firstName,
            lastName
        })
       const userId=user._id;

    await Account.create({
    userId,
    balance: parseInt(Math.random() * 10000),
  });

       const token=jwt.sign({userId},JWT_SECRET);

        res.status(200).json({
            message: "User created successfully",
	        token:token
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"Error in Signup"
        })
    }
})

const signinBody =z.object({
    username:z.string().email(),
	password:z.string()
})

userRouter.post("/signin",async (req,res)=>{
    const { success } = signinBody.safeParse(req.body)
        if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const {username,password}=req.body;
    try {
        const user=await User.findOne({
            username,
            password
        })
        if(user){
             const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
        }
       
            res.json({
               message: "Email/Password doesnt exist"})
        
    } catch (error) {
        res.json({
            message:"Error while logging in"
        })
    }
})

const updateBody =z.object({
	password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
})

userRouter.put("/update", authMiddleware ,async (req,res)=>{
    const {success}=updateBody.safeParse(req.body);
    if(!success){
         res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
}
)

userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


userRouter.get("/getUser", authMiddleware, async (req, res) => {
  const user = await User.findOne({
    _id: req.userId,
  });
  res.json(user);
});


export default userRouter;