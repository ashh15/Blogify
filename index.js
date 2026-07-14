require("dotenv").config();
const path=require("path");
const express=require("express");
const userRoute=require("./routes/user");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const app=express();
const PORT=process.env.PORT;
mongoose.connect(process.env.MONGO_URI).then((e)=>console.log("MongoDB Connected!"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.get("/",(req,res)=>{
    res.render("home",{
        user:req.user,
    });
})

app.use("/user",userRoute);
app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`));