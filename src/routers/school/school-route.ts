import { Router } from 'express';
import { SchoolController } from '../../controllers/school/school.controller';

export const createRouterSchool = (schoolController: SchoolController) => {

  const schoolRouter = Router();


  schoolRouter.get('/', (req, res) => {
    schoolController.getAll(req, res);
  });

  schoolRouter.post('/', (req, res) => {
    schoolController.create(req, res);
  });

  schoolRouter.get('/:id', (req, res) => {
    schoolController.getSchool(req, res);
  });


  schoolRouter.delete('/:id', (req, res) => {
    schoolController.delete(req, res);
  });


  schoolRouter.patch('/:id', (req, res) => {
    schoolController.delete(req, res);
  });

  return schoolRouter;
}

