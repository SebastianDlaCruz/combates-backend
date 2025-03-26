import express from 'express';
import request from 'supertest';
import { BoxerController } from '../../controllers/boxer/boxer.controller';
import { IBoxer } from '../../lib/interfaces/boxer.interface';
import { Boxer } from '../../models/boxer/boxer.model';
import { getStateError } from '../../utils/getStateError.util';
import { getStateSuccess } from '../../utils/getStateSuccess.util.ts/getStateSuccess.util';
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

let testMethods = (func: any, data: any) => {
  (func as jest.Mock).mockResolvedValueOnce(data);
}

describe('Boxer Routes', () => {

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('GET BOXERS ALL', () => {

    it('should data pagination boxers ', async () => {

      const dataMock = getStateSuccess({
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
      });

      testMethods(mockBoxer.getAll, dataMock);

      const response = await request(app).get('/boxer').query(dataMock)

      expect(response.status).toBe(200);
      expect(response.body).toEqual(dataMock)

    });

    it('should data boxers', async () => {

      const dataMock = getStateSuccess({
        data: [
          { id: '1', name: 'John Doe', id_category: 1 },
          { id: '2', name: 'Jane Doe', id_category: 2 }
        ]
      });

      testMethods(mockBoxer.getAll, dataMock);

      const response = await request(app).get('/boxer').query(dataMock);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(dataMock);

    })
  })

  describe('POST BOXER', () => {

    it('should create boxer', async () => {

      const dataMock = getStateSuccess({ statusCode: 201 });

      const sendMock: Boxer = {
        id: '1',
        name: 'sebastian',
        id_school: 1,
        disability: 'nada',
        gender: 'masculino',
        corner: 'roja',
        id_category: 1,
        fights: 2,
        weight: 64.23,
        id_coach: 1,
        details: 'nada',
        id_state: 1,
        age: 20
      };

      testMethods(mockBoxer.create, dataMock);

      const response = await request(app).post('/boxer')
        .send(sendMock);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(dataMock);
    });

    it('should error create error', async () => {

      const invalidateData = {
        name: 'Mike Tyson',
      };

      const response = await request(app).post('/boxer').
        send(invalidateData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');

    });

  });

  describe('PUT Boxer', () => {

    it('should update boxer', async () => {

      const dataMock = getStateSuccess();

      const sendMock: Boxer = {
        id: '1',
        name: 'sebastian',
        id_school: 1,
        disability: 'nada',
        gender: 'masculino',
        corner: 'roja',
        id_category: 1,
        fights: 2,
        weight: 64.23,
        id_coach: 1,
        details: 'nada',
        id_state: 1,
        age: 30
      };

      testMethods(mockBoxer.update, dataMock);

      const response = await request(app).patch('/boxer/1').send(sendMock);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(dataMock);

    });

  });

  describe('DELETE Boxer', () => {

    it('should delete boxer success', async () => {

      const mockResponse = getStateSuccess({ statusCode: 201 });

      testMethods(mockBoxer.delete, mockResponse);

      const response = await request(app).delete('/boxer/1');

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockResponse);
    });

    it('should delete boxer error', async () => {
      const mockResponse = getStateError();

      testMethods(mockBoxer.delete, mockResponse);

      const response = await request(app).delete('/boxer/1');

      expect(response.status).toBe(500);
      expect(response.body).toEqual(mockResponse);

    })
  })



})