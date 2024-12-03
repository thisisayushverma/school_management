import mysql from "mysql"

const con = mysql.createConnection({
  host:process.env.HOST,
  port:process.env.PORT,
  user:process.env.USERNAME,
  password:process.env.PASSWORD,
  database:process.env.DATABASE,
  connectTimeout: 10000
})


// const con = new Pool({
//   host:process.env.HOST,
//   port:process.env.PORT,
//   user:process.env.USERNAME,
//   password:process.env.PASSWORD,
//   database:process.env.DATABASE
// })

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