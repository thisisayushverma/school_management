import mysql from "mysql"

const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'qwerty@12345',
  database:'school_management'
})

con.connect((err)=>{
  if(err){
    console.log("Error while Connection DB",err);
  }
  else{
    console.log("Connected");
    // con.query("show databases",(err,res)=>{
    //   if(err){
    //     console.log("error while make an query ", err);
    //   }
    //   else{
    //     console.log("Result",res);
    //   }
    // })
  }
})




export default con;