//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyparser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));

const app=express();
const port =3000;

var userIsAuthorised = false;

app.use(bodyparser.urlencoded({extended : true}));

function passwordcheck(req,res,next){
    const password = req.body["password"];
    if(password === "Iamanil"){
        userIsAuthorised =true;
    }
    next();
}
app.use(passwordcheck);

app.get("/" ,(req,res)=>{
    res.sendFile(_dirname + "/public/index.html");
});

app.post("/check",(req,res)=>{
    if(userIsAuthorised){
        res.sendFile(_dirname +"/public/secret.html");
    }else{
        res.sendFile(_dirname + "/public/index.html");
    }
});


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});
