import express from 'express';
import request from 'supertest';
import { BoxerController } from '../../controllers/boxer/boxer.controller';
import { IBoxer } from '../../interfaces/boxer.interface';
import { createRouterBoxer } from './boxer-route';

const mockBoxer: Partial<IBoxer> = {
  getAll: jest.fn(),
  getBoxer: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  updateState: jest.fn(),
  update: jest.fn(),
  getByCategory: jest.fn(),
};

const boxerController = new BoxerController(mockBoxer as IBoxer);

const app = express();
app.use(express.json());
app.use('/boxer', createRouterBoxer(boxerController));

describe('Boxer Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('GET BOXERS ALL', () => {

    it('pagination ', async () => {

      const dataMock = {
        statusCode: 200,
        message: 'Éxito',
        success: true,
        pagination: {
          data: [
            { id: '1', name: 'John Doe', id_category: 1 },
            { id: '2', name: 'Jane Doe', id_category: 2 },
          ],
          total: 10,
          totalPages: 2,
          currentPage: 1,
          pageSize: 5,
          next: '/api/boxers?page=2&pageSize=5',
          prev: null,
        }
      };

      (mockBoxer.getAll as jest.Mock).mockResolvedValueOnce(dataMock);

      const response = await request(app).get('/boxer').query(dataMock)

      expect(response.status).toBe(200);
      expect(response.body).toEqual(dataMock)

    });
  })



})