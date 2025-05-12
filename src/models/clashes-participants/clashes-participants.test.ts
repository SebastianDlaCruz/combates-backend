import { PoolConnection } from "mysql2/promise";
import { beforeEach } from "node:test";
import { IClashesParticipants } from "../../lib/interfaces/clashes-participants.interface";
import { getStateSuccess } from "../../lib/utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getValidateElements } from "../../lib/utils/validateElement/validate-element.util";
import { ClashesParticipants, ClashesParticipantsModel } from "./clashes-participants.model";


jest.mock('../../lib/utils/validateElement/validate-element.util');


describe('ClashesParticipants', () => {

  let clashesParticipants: IClashesParticipants;
  let mockConnection: jest.Mocked<Partial<PoolConnection>>;

  let mockQueryResult: <T>(data: T) => jest.Mock<any, any, any>;
  let mockQueryError: (error: Error) => jest.Mock<any, any, any>;

  const mockCP: ClashesParticipants = {
    id: 1,
    id_boxer: 'eeee-ssss-223',
    id_clashes: 1
  }

  beforeEach(() => {

    mockConnection = {
      query: jest.fn(),
      release: jest.fn()
    };


    clashesParticipants = new ClashesParticipantsModel({
      method: mockConnection as PoolConnection
    });

    mockQueryResult = <T>(data: T) => (mockConnection.query as jest.Mock).mockResolvedValueOnce(data);

    mockQueryError = (error: Error) => (mockConnection.query as jest.Mock).mockRejectedValueOnce(error);


  });

  afterEach(() => {
    jest.clearAllMocks();
  })


  describe('delete', () => {

    it('should delete participants correctly ', async () => {

      const valid = {
        ok: true,
        response: true
      };


      (getValidateElements as jest.Mock).mockResolvedValueOnce(valid);

      (mockConnection.query as jest.Mock)
        .mockResolvedValueOnce([[mockCP]]);

      const result = await clashesParticipants.delete(mockCP.id);

      const mockResult = getStateSuccess();

      expect(result).toEqual(mockResult);


    })

  })

});