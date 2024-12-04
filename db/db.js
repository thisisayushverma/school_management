import mysql from "mysql"
import fs from "fs"



const con = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 4000,
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'test',
  ssl: process.env.TIDB_ENABLE_SSL === 'true' ? {
      minVersion: 'TLSv1.2',
      // ca: process.env.TIDB_CA_PATH ? fs.readFileSync(process.env.TIDB_CA_PATH) : undefined
  } : null,
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