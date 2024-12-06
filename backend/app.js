import express from 'express';
import mysql from 'mysql2';
const port = 4000;
const app = express();

app.use(express.json());
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

app.get("/employees",(req,res)=>{
   const sql = "select * from employee_test";
   db.query(sql,(err,result)=>{
      if(err){
         console.log(err);
         return res.status(500).json({message:"error while try to fetch data from dtatabase",status:"failed"});
      }
      res.send(result);
   });
})
app.post("/employees",(req,res)=>{

   const {body:{id,first_name,last_name,email,password}} = req;
   const sql = "insert into employee_test values(?,?,?,?,?)";
   db.query(sql,[id,first_name,last_name,email,password],(err)=>{
      if(err){
         console.log(err);
         return res.status(500).json({message:"error while try to insert data into dtatabase",status:"failed"});
      }
      res.status(200).json({message:"success"});
   });
   // res.status(200).json({message:"success",data:body});
});

app.post("/login",(req,res)=>{
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