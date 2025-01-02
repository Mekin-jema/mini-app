import express from "express"
import mysql from "mysql2"



const app = express()
app.use(express.json())

const config= {
  user:'root',
  host:'localhost',
  password:'1234',
  database:"demo",
  waitForConnections:true,
  connectionLimit:10,
  queueLimit:0,

}

export const db=mysql.createPool(config)
  // console.log(db)

if(db){
  console.log("Database connected successfully")
}

app.post("/add-user",(req,res)=>{
  const {first_name,last_name,email,password}= req.body
  // console.log(data)
  const q='insert into auth  (first_name,last_name,email,password) values (?,?,?,?)'
  db.query(q,[first_name,last_name,email,password], (err, results) => {
    if(err) {
      res.status(500).send("Error happening while inserting to the database")
    } else {
      res.status(200).json({
        message:"User created successfully",
        user:results
      })
    }
  })
})

app.post("/login",(req,res)=>{
  const {email,password}=req.body
  const q=`select * from auth where email=?`
  db.query(q,[email,password],(err,results)=>{
     if(err){
       res.status(500).send("Error happening while fetching data from the database")}
      else{
        if(results.length>0){
          if(results[0].password===password){
            res.status(200).json({
              message:"User logged in successfully",
              user:results[0]
            })
          }else{
            res.status(400).send("Invalid password")
          }
        }else{
          res.status(400).send("User not found")
        }
      }

})
})

app.listen(3000,()=>{
  console.log("Server is Running on port 3000")
})