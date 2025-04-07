import { PoolConnection } from "mysql2/promise";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib/utils/pagination/pagination.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";
import { Boxer, BoxerModel } from "./boxer.model";

jest.mock('../../lib/utils/pagination/pagination.util');
jest.mock('../../lib/utils/validateElement/validate-element.util');

describe('BoxerModel', () => {

  let boxerModel: BoxerModel;
  let mockConnection: jest.Mocked<Partial<PoolConnection>>;

  let mockQueryResult: <T>(data: T) => jest.Mock<any, any, any>;
  let mockQueryError: (error: Error) => jest.Mock<any, any, any>;

  let mockValidateElements: jest.Mock<any, any, any>;

  const mockBoxer: Boxer = {
    id: 'eeerrrr-1223-erer',
    name: 'Sebatian de la cruz',
    id_school: 1,
    age: 12,
    disability: '',
    id_category: 1,
    weight: 12,
    id_coach: 1,
    details: 'no tiene detalles',
    id_state: 1,
    corner: 'rojo',
    fights: 12.21,
    gender: 'ds'
  };

  beforeEach(() => {

    mockConnection = {
      query: jest.fn(),
      release: jest.fn()
    };


    boxerModel = new BoxerModel({
      method: mockConnection as PoolConnection
    });

    mockQueryResult = <T>(data: T) => (mockConnection.query as jest.Mock).mockResolvedValueOnce(data);

    mockQueryError = (error: Error) => (mockConnection.query as jest.Mock).mockRejectedValueOnce(error);

  });

  afterEach(() => {
    jest.clearAllMocks();
  })


  describe('getAll', () => {

    it('should return all data  success ', async () => {

      mockQueryResult([mockBoxer]);

      const result = await boxerModel.getAll();

      const mockResponse = getStateSuccess({ data: mockBoxer });

      expect(result).toEqual(mockResponse);

    });


    it('should return all empty', async () => {

      mockQueryResult([[]])


      const result = await boxerModel.getAll();

      const mockResponse = getStateSuccess({ data: [] });

      expect(result).toEqual(mockResponse);

    });

    it('should return  by pagination success', async () => {

      const mockPagination = {
        success: true,
        pagination: {
          data: [
            {
              id: 'eeerrrr-1223-erer',
              name: 'Sebatian de la cruz',
              id_school: 1,
              age: 12,
              disability: '',
              id_category: 1,
              weight: 12,
              id_coach: 1,
              details: 'no tiene detalles',
              id_state: 1,
              corner: 'rojo',
              fights: 12.21,
              gender: 'ds'
            },
            {
              id: 'eeee-aaaa-1223121',
              name: 'David Tevez',
              id_school: 1,
              age: 12,
              disability: '',
              id_category: 1,
              weight: 12,
              id_coach: 1,
              details: 'no tiene detalles',
              id_state: 1,
              corner: 'rojo',
              fights: 12.21,
              gender: 'ds'
            }
          ],
          total: 10,
          totalPages: 2,
          currentPage: 1,
          pageSize: 5,
          next: '/api/boxers?page=2&pageSize=5',
          prev: null,
        },
      };

      (getPagination as jest.Mock).mockResolvedValueOnce(mockPagination);

      const result = await boxerModel.getAll('1', '3');

      const mockResult = getStateSuccess({
        pagination: mockPagination.pagination
      });

      expect(result).toEqual(mockResult)

    });

    it('should return  by pagination error', async () => {

      const mockError = new Error('Error al devolver la paginacion de los boxeadores');
      mockQueryError(mockError);

      (getPagination as jest.Mock).mockResolvedValueOnce({ success: false, pagination: null });

      const result = await boxerModel.getAll('1', '3');

      const mockResponse = getStateError({ error: mockError });

      expect(result).toEqual(mockResponse);


    });

  });

  describe('create', () => {

    it('should create a boxer successfully', async () => {

      mockQueryResult([mockBoxer]);

      const result = await boxerModel.create(mockBoxer);

      const mockResponse = getStateSuccess({ statusCode: 201, message: 'éxito al crear el boxeador' });

      expect(result).toEqual(mockResponse);

    });

    it('should return error when creating a boxer', async () => {

      const mockError = new Error('Error al crear  boxeador');

      mockQueryError(mockError);

      const result = await boxerModel.create(mockBoxer);


      expect(result).toEqual(getStateError({ error: mockError }));

    });

  });

  describe('update', () => {

    it('should update a boxer successfully', async () => {

      const valid = {
        ok: true,
        response: true
      };

      mockQueryResult([mockBoxer]);

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const result = await boxerModel.update(mockBoxer.id, mockBoxer);


      const mockResponse = getStateSuccess({ message: 'éxito al actualizar el boxeador' });

      expect(result).toEqual(mockResponse);

    });

    it('should return error when updating a boxer', async () => {

      const valid = {
        ok: false,
        response: false,
        message: 'Mensaje desconocido'
      };

      mockQueryResult([mockBoxer]);

      const mockError = new Error(valid.message);

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const result = await boxerModel.update(mockBoxer.id, mockBoxer);


      const mockResponse = getStateError({ error: mockError });

      expect(result).toEqual(mockResponse);

    });

    it('Should return an error when updating a boxer not found.', async () => {

      const valid = {
        ok: true,
        response: false
      };

      mockQueryResult([mockBoxer]);

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockError = new Error('Boxeador no encontrado');

      const result = await boxerModel.update(mockBoxer.id, mockBoxer);


      const mockResponse = getStateError({ statusCode: 400, error: mockError });

      expect(result).toEqual(mockResponse);

    });

  });

  describe('delete', () => {

    it('should delete a boxer successfully', async () => {

      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      mockQueryResult([mockBoxer]);

      const result = await boxerModel.delete(mockBoxer.id);


      const mockResponse = getStateSuccess({ message: 'Boxeador eliminado' });

      expect(result).toEqual(mockResponse);
    });

    it('should return error when deleting a boxer', async () => {

      const valid = {
        ok: false,
        response: false,
        message: 'Mensaje desconocido'
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockError = new Error(valid.message);

      const result = await boxerModel.delete(mockBoxer.id);


      const mockResponse = getStateError({ error: mockError });

      expect(result).toEqual(mockResponse);

    });


  });


  describe('getBoxer', () => {

    it('should return a boxer by id successfully', async () => {

      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockData = [mockBoxer];
      mockQueryResult([mockData]);

      const result = await boxerModel.getBoxer(mockBoxer.id);

      const mockResponse = getStateSuccess({ data: mockData[0] });

      expect(result).toEqual(mockResponse);

    });

    it('should return error when getting a boxer by id', async () => {

      const valid = {
        ok: false,
        response: false,
        message: 'Mensaje desconocido'
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockError = new Error(valid.message);

      const result = await boxerModel.getBoxer(mockBoxer.id);


      const mockResponse = getStateError({ error: mockError });

      expect(result).toEqual(mockResponse);

    });

  });

  describe('getByCategory', () => {

    it('should return a boxer by category successfully', async () => {

      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockData = [mockBoxer];
      mockQueryResult([mockData]);

      const result = await boxerModel.getByCategory(mockBoxer.id_category);

      const mockResponse = getStateSuccess({ data: mockData });

      expect(result).toEqual(mockResponse);

    });

    it('should return error when getting a boxer by category', async () => {

      const valid = {
        ok: false,
        response: false,
        message: 'Mensaje desconocido'
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockError = new Error(valid.message);

      const result = await boxerModel.getByCategory(mockBoxer.id_category);


      const mockResponse = getStateError({ error: mockError });

      expect(result).toEqual(mockResponse);

    });


  });

  describe('updateState', () => {

    it('should update a boxer state successfully', async () => {

      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      mockQueryResult([mockBoxer]);

      const result = await boxerModel.updateState(mockBoxer.id, {
        state: 1
      });


      const mockResponse = getStateSuccess({ message: 'éxito al actualizar el estado del boxeador' });

      expect(result).toEqual(mockResponse);

    });

    it('should return error when updating a boxer state', async () => {

      const valid = {
        ok: false,
        response: false,
        message: 'Mensaje desconocido'
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockError = new Error(valid.message);

      const result = await boxerModel.updateState(mockBoxer.id, {
        state: 1
      });


      const mockResponse = getStateError({ error: mockError });

      expect(result).toEqual(mockResponse);

    });
  });

  describe('update Corner', () => {

    it('should update a boxer corner successfully', async () => {

      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      mockQueryResult([{ affectedRows: 1 }]);

      const result = await boxerModel.updateCorner(mockBoxer.id, {
        corner: 'rojo'
      });


      const mockResponse = getStateSuccess({ message: 'éxito al actualizar la esquina  del boxeador' });

      expect(result).toEqual(mockResponse);

    });

    it('should return error when updating a boxer corner', async () => {

      const valid = {
        ok: false,
        response: false,
        message: 'Mensaje desconocido'
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockError = new Error(valid.message);

      const result = await boxerModel.updateCorner(mockBoxer.id, {
        corner: 'rojo'
      });


      const mockResponse = getStateError({ error: mockError });

      expect(result).toEqual(mockResponse);
    });

  });

  describe('search', () => {

    it('should return a boxer by name successfully', async () => {
      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockData = [mockBoxer];
      mockQueryResult([[mockData]]);

      const result = await boxerModel.search({ name: mockBoxer.name });

      const mockResponse = getStateSuccess({ data: [mockData] });

      expect(result).toEqual(mockResponse);

    });

    it('should return a boxer by category successfully', async () => {
      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockData = [mockBoxer];

      mockQueryResult([[mockData]]);

      const result = await boxerModel.search({ id_category: mockBoxer.id_category });

      const mockResponse = getStateSuccess({ data: [mockData] });

      expect(result).toEqual(mockResponse);

    });

    it('should return a boxer by name and category successfully', async () => {
      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockData = [mockBoxer];

      mockQueryResult([[mockData]]);

      const result = await boxerModel.search({ name: mockBoxer.name, id_category: mockBoxer.id_category });

      const mockResponse = getStateSuccess({ data: [mockData] });

      expect(result).toEqual(mockResponse);

    });

  });

});
