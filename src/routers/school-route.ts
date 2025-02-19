import { Router } from 'express';
import { SchoolController } from '../controllers/school/school.controller';
import { SchoolModel } from '../models/school/school.model';

export const schoolRouter = Router();

const schoolModel = new SchoolModel();
const schoolController = new SchoolController(schoolModel);

schoolRouter.get('/', (req, res) => {
  schoolController.getAll(req, res);
})

schoolRouter.post('/', (req, res) => {
  schoolController.create(req, res);
})