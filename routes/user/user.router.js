import express from "express";
import {login, signup} from "./user.controller.js";
import {loginValidator, signupValidator} from "./user.validators.js";
import {validate} from "../../middleware/validate.js";

const router = express.Router();

router.post('/signup', signupValidator, validate, signup);
router.post('/login', loginValidator, validate, login);

export default router;