import { Router } from "express";
import { getCountries } from "../src/controllers/countryController";

const router = Router();
router.get("/countries", getCountries);
export default router;
