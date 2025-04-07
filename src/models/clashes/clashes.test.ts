import { PoolConnection } from "mysql2/promise";
import { IClashes } from "../../lib/interfaces/clashes.interface";
import { getStateError } from "../../lib/utils/getStateError.util";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../lib/utils/pagination/pagination.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";
import { Clashes, ClashesModel } from "./clashes.model";

jest.mock('../../lib/utils/validateElement/validate-element.util');

jest.mock('../../lib/utils/pagination/pagination.util');

describe('ClashesModel', () => {

  let mockConnection: Partial<PoolConnection>;
  let clashesModel: IClashes;

  let mockQueryResolve: <T>(data: T) => jest.Mock<any, any>;
  let mockQueryReject: (error: Error) => jest.Mock<any, any>;

  let mockClashes: Clashes;

  beforeEach(() => {

    mockConnection = {
      query: jest.fn(),
      release: jest.fn(),
    };

    clashesModel = new ClashesModel({ method: mockConnection as PoolConnection });

    mockQueryResolve = <T>(data: T) => (mockConnection.query as jest.Mock).mockResolvedValueOnce(data);

    mockQueryReject = (error: Error) => (mockConnection.query as jest.Mock).mockRejectedValueOnce(error);

    mockClashes = {
      id: 1,
      id_category: 1,
      id_state: 'active',
      id_type_clashes: 1,
      rounds: 3,
      number: 1
    };

  });

  afterEach(() => {
    jest.clearAllMocks();
  })


  describe('create', () => {

    it('should create a new clash and return success response', async () => {

      mockQueryResolve([
        {
          affectedRows: 1,
        },
      ]);

      const response = await clashesModel.create(mockClashes);

      expect(response).toEqual(getStateSuccess({
        statusCode: 201
      }));

    });

    it('should handle error when creating a clash', async () => {

      const error = new Error('Database error');
      mockQueryReject(error);

      const response = await clashesModel.create(mockClashes);

      expect(response).toEqual(getStateError({ error }));

    });

  });

  describe('update', () => {

    it('should update a clash and return success response', async () => {

      const valid = {
        ok: true,
        response: true
      };


      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      mockQueryResolve([
        {
          affectedRows: 1,
        },
      ]);

      const response = await clashesModel.update(mockClashes.id, mockClashes);

      expect(response).toEqual(getStateSuccess({
        statusCode: 200
      }));

    });


    it('should handle error when updating a clash', async () => {

      const valid = {
        ok: true,
        response: false
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const error = new Error('Enfrentamiento no encontrado');

      mockQueryReject(error);

      const response = await clashesModel.update(mockClashes.id, mockClashes);

      expect(response).toEqual(getStateError({ error }));

    });


  });

  describe('delete', () => {

    it('should delete a clash and return success response', async () => {

      const valid = {
        ok: true,
        response: true
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      mockQueryResolve([mockClashes]);

      const response = await clashesModel.delete(mockClashes.id);

      expect(response).toEqual(getStateSuccess());

    });

    it('should handle error when deleting a clash', async () => {

      const valid = {
        ok: true,
        response: false
      };

      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      const error = new Error('Error enfrentamiento no encontrado');

      mockQueryResolve([mockClashes]);

      const response = await clashesModel.delete(mockClashes.id);

      expect(response).toEqual(getStateError({ error }));

    });

  });

  describe('getAll', () => {

    it('should return all clashes', async () => {

      const mockClashesArray = [mockClashes, mockClashes];

      mockQueryResolve([mockClashesArray]);

      const response = await clashesModel.getAll();

      expect(response).toEqual(getStateSuccess({
        data: mockClashesArray
      }));

    });

    it('should return all clashes a pagination', async () => {

      const mockClashesArray = [mockClashes, mockClashes];

      const mockPagination = {
        success: true,
        pagination: {
          data: mockClashesArray,
          currentPage: 1,
          total: 2,
          totalPages: 1,
          page: 1,
          pageSize: 2,
          prev: null,
          next: null
        }
      };

      (getPagination as jest.Mock).mockResolvedValueOnce(mockPagination);

      mockQueryResolve([mockClashesArray]);

      const response = await clashesModel.getAll('1', '2');

      expect(response).toEqual(getStateSuccess({
        pagination: mockPagination.pagination
      }));
    });

    it('should handle error when getting all clashes', async () => {

      const error = new Error('Database error');
      mockQueryReject(error);

      const response = await clashesModel.getAll();

      expect(response).toEqual(getStateError({ error }));

    });

  });

});


