import express from 'express';
import mysql from 'mysql2';
import cors from "cors";
const port = 4000;
const app = express();

app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}))
// app.use(express.urlencoded({extended:true}));   
const dbConfig = {
   host:"localhost",
   user:"root",
   database:"demo",
   password:"mubarek2012##"
}
const db = mysql.createConnection(dbConfig);
db.connect((err)=>{
   if(err){
      console.log(err);
   }
   console.log("Database connected");
});

app.get("/",(req,res)=>{
   res.send("hello world");
});

app.get("/employee",(req,res)=>{
   const sql = "select * from employee_test";
   db.query(sql,(err,result)=>{
      if(err){
         console.log(err);
         return res.status(500).json({message:"error while try to fetch data from dtatabase",status:"failed"});
      }
      res.send(result);
   });
})
app.post("/employee",(req,res)=>{
   console.log(req.body);

   const {body:{first_name,last_name,email,password}} = req;
   const value = [first_name, last_name, email, password];
   const sql = "insert into employee_test(first_name, last_name, email, password) values(?,?,?,?)";
   db.query(sql,value,(err)=>{
      if(err){
         console.log(err);
         return res.status(500).json({message:"error while try to insert data into dtatabase",status:"failed"});
      }
      res.status(200).json({message:"success"});
   });
   // res.status(200).json({message:"success",data:body});
});

app.post("/login",(req,res)=>{
   console.log(req.body)
   const {body:{email,password}} = req;
   const sql = "select * from employee_test where email = ? and password = ?"
    db.query(sql,[email, password],(err,result)=>{
      if(err){
         console.log('error while try to fetch data from database',err);
         return res.status(500).json({message:"failed",error:"can't fetch data from database"});
      }
      res.status(200).json({message:"success",data:result});
   })
});
app.listen(port,()=>{
   console.log(`Server is running on port ${port}`)
});