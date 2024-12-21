import { Router } from "express";
const router = Router();
import { fetchSearchResults } from "../modules/fetchSearchResults.js";

router.get('/search', fetchSearchResults);

export default router;