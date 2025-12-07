import  jwt from "jsonwebtoken";

const JWT_SECRET="1234"
 const authMiddleware=async(req,res,next)=>{
   const token=req.headers.authorization;
  
   try {
      const decoded=jwt.verify(token,JWT_SECRET);
       if(decoded){
     req.userId = decoded.userId;

        next();
   }
   } catch (error) {
            return res.status(403).json({});
   }
 
}

export default authMiddleware;