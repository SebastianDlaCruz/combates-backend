import { PoolConnection } from "mysql2/promise";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";
import { Category, CategoryCrud } from "./category.interface";
import { CategoryModel } from "./category.model";


jest.mock('../../lib/utils/validateElement/validate-element.util');

describe('Category Model', () => {

  let categoryModel: CategoryCrud;
  let mockConnection: Partial<PoolConnection>;
  let mockCategory: Category

  let mockQueryResult: <T>(data: T) => jest.Mock<any, any, any>;
  let mockQueryError: (error: Error) => jest.Mock<any, any, any>;

  beforeEach(() => {

    mockCategory = {
      id: 1,
      name: 'Category 1',
      weight: 1
    }

    mockConnection = {
      query: jest.fn(),
      release: jest.fn()
    };

    categoryModel = new CategoryModel({ method: mockConnection as PoolConnection });

    mockQueryResult = <T>(data: T) => (mockConnection.query as jest.Mock).mockResolvedValue([data]);

    mockQueryError = (error: Error) => (mockConnection.query as jest.Mock).mockRejectedValue(error);

  })

  afterEach(() => {
    jest.clearAllMocks();
  })


  describe('getCategory', () => {

    it('should return a category', async () => {

      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      mockQueryResult([mockCategory]);

      const result = await categoryModel.getCategory(1);

      const mockResult = getStateSuccess({ data: mockCategory });

      expect(result).toEqual(mockResult);

    });

    it('should return an error if the category is not found', async () => {

      const valid = {
        ok: true,
        response: false
      };

      const mockError = new Error('Categoría no encontrada');

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const result = await categoryModel.getCategory(1);

      const mockResult = getStateError({ error: mockError })

      expect(result).toEqual(mockResult);

    });

    it('should return an error if the query fails', async () => {

      const valid = {
        ok: false,
        response: false,
        message: 'Error desconocido'
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const result = await categoryModel.getCategory(1);

      const mockResult = getStateError();

      expect(result).toEqual(mockResult);
    });

  });

  describe('create', () => {

    it('should create a category', async () => {

      mockQueryResult({ insertId: 1 });

      const result = await categoryModel.create(mockCategory);

      const mockResult = getStateSuccess({ statusCode: 201 });

      expect(result).toEqual(mockResult);

    });

    it('should return an error if the query fails', async () => {

      const mockError = new Error('Error al crear una categoría');

      mockQueryError(mockError);

      const result = await categoryModel.create(mockCategory);

      const mockResult = getStateError({ error: mockError });

      expect(result).toEqual(mockResult);

    });

  });

  describe('update', () => {
    it('should update a category', async () => {
      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      mockQueryResult({ affectedRows: 1 });

      const result = await categoryModel.update(1, mockCategory);

      const mockResult = getStateSuccess({ message: 'Categoría modificada' });

      expect(result).toEqual(mockResult);
    });

    it('should return an error if the query fails', async () => {

      const valid = {
        ok: false,
        response: false,
        message: 'Error desconocido'
      };

      (getValidateElements as jest.Mock).mockRejectedValueOnce(valid);

      const mockError = new Error(valid.message);

      mockQueryError(mockError);

      const result = await categoryModel.update(1, mockCategory);

      const mockResult = getStateError({ error: mockError });

      expect(result).toEqual(mockResult);

    });

    it('should return an error if the category is not found', async () => {

      const valid = {
        ok: true,
        response: false
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockError = new Error('Categoría no encontrada');

      const result = await categoryModel.update(mockCategory.id, mockCategory);

      const mockResult = getStateError({ error: mockError });

      expect(result).toEqual(mockResult);

    });
  })

  describe('delete', () => {
    it('should delete a category', async () => {
      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      mockQueryResult({ affectedRows: 1 });

      const result = await categoryModel.delete(1);

      const mockResult = getStateSuccess({ message: 'Categoría eliminada' });

      expect(result).toEqual(mockResult);
    });

    it('should return an error if the query fails', async () => {

      const valid = {
        ok: false,
        response: false,
        message: 'Error desconocido'
      };

      (getValidateElements as jest.Mock).mockRejectedValueOnce(valid);

      const mockError = new Error(valid.message);

      mockQueryError(mockError);

      const result = await categoryModel.delete(1);

      const mockResult = getStateError({ error: mockError });

      expect(result).toEqual(mockResult);

    });

    it('should return an error if the category is not found', async () => {

      const valid = {
        ok: true,
        response: false
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const mockError = new Error('Categoría no encontrada');

      const result = await categoryModel.delete(mockCategory.id);

      const mockResult = getStateError({ error: mockError });

      expect(result).toEqual(mockResult);

    });
  });

  describe('getAll', () => {

    it('should return all categories', async () => {

      mockQueryResult([mockCategory]);

      const result = await categoryModel.getAll();

      const mockResult = getStateSuccess({ data: [mockCategory] });

      expect(result).toEqual(mockResult);

    });

    it('should return an error if the query fails', async () => {

      const mockError = new Error('Error al consultar las categorías');

      mockQueryError(mockError);

      const result = await categoryModel.getAll();

      const mockResult = getStateError({ error: mockError });

      expect(result).toEqual(mockResult);

    });
  });



});