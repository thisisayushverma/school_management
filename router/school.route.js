
import { Router } from "express";
import {getSchools ,addSchool } from "../models/school.models.js"

// GET: List schools

const router = Router()

router.get("/listSchools", async (req, res) => {
  try {
    await getSchools(req,res);
  } catch (err) {
    console.log("error",err);
  }
});

// POST: Add a school
router.post("/addSchool", async (req, res) => {
 
  try {
    const id = await addSchool(req,res);
  } catch (err) {
    console.log("error",err);
  }
});

export default router;
