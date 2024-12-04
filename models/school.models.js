import con from "../db/db.js"

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}


// Function to fetch all schools
const getSchools = async (req,res) => {

    const {latitude,longitude} = req.body;
    if(!latitude || !longitude) {
      return res.status(401).json({
        message:"required credential are not found",
        success:false
      })
    }


    if(typeof latitude != "number" || typeof longitude != "number") return res.status(401).json({
      message:"credentials are not in correct format",
      success:false
    })
  try {
    con.query("select * from schools",(err,result)=>{
      if(err){
        console.log("error while getting data",err);
        return res.status(501).json({
          message:"Error while getting list",
          success:false
        })
      }

      const pairs = []
      // console.log(result[0].id);
      result.forEach((element) => {
        const val = haversineDistance(latitude,longitude , element.latitude,element.longitude)
        pairs.push([val,element])
      });


      pairs.sort((a,b)=> a[0] - b[0])

      // console.log(pairs);
      const finalVal = []

      pairs.forEach(element =>{
        finalVal.push(element[1])
      })
      console.log(finalVal);
      return res.status(201).json({
        data:finalVal,
        message:"Data find successfully",
        success:true
      })
    })

  } catch (err) {
    console.error("Error fetching schools:", err);
    throw err;
  }
};

// Function to add a school
const addSchool = async (req,res) => {

  const { name, address, latitude, longitude } = req.body;
  if(!name || !address || !latitude || !longitude) return res.status(401).json({
    message:"All credentials are not found",
    success:false
  })

  if(typeof latitude != "number" || typeof longitude != "number") return res.status(401).json({
    message:"credentials are not in correct format",
    success:false
  })

  try {
    con.query("INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",[name, address, latitude, longitude],(err,result)=>{
        if(err) {
          console.log("error while adding data",err);
          return res.status(500).json({
            message:"Error while adding data in db, so try again",
            success:false
          })
        }
        return res.status(201).json({
          data:result,
          message:"data added successfully",
          success:true
        })
      }
    );
    
  } catch (err) {
    console.error("Error adding school:", err);
    throw err;
  }
};

export  { getSchools, addSchool };
