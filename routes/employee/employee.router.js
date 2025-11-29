import express from "express";
import {create, deleteById, getById, list, updateById} from "./employee.controller.js";
import {createValidator, deleteValidator, idValidator, updateValidator, searchValidator} from "./employee.validators.js";
import {validate} from "../../middleware/validate.js";

const router = express.Router();

// No auth middleware here - already chained in index.js
router.get('/', searchValidator, validate, list);
router.post('/', createValidator, validate, create);
router.get('/:id', idValidator, validate, getById);
router.put('/:id', idValidator, updateValidator, validate, updateById);
router.delete('/', deleteValidator, validate, deleteById);

export default router;