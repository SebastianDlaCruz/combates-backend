import { PoolConnection } from "mysql2/promise";
import { beforeEach } from "node:test";
import { ClashesParticipants, ClashesParticipantsModel } from "./clashes-participants.model";


jest.mock('../../lib/utils/validateElement/validate-element.util');

const mockConnection: Partial<PoolConnection> = {
  query: jest.fn(),
  release: jest.fn(),
};

const mockData: ClashesParticipants = {
  id: 1,
  id_boxer: 'boxer_123',
  id_clashes: 1,
}

describe('ClashesParticipants', () => {

  let model: ClashesParticipantsModel;

  let dbTest: <T>(data: T) => jest.Mock<any, any, any>;

  beforeEach(() => {

    model = new ClashesParticipantsModel({ method: mockConnection as PoolConnection });

    dbTest = <T>(data: T) => (mockConnection.query as jest.Mock).mockResolvedValueOnce(data);

    jest.clearAllMocks();

  });

  afterEach(() => {
    jest.clearAllMocks();
  })


  it('should create clashes participants', async () => {

    /* dbTest([{ insetId: 1 }]); */

    /* const result = await model.create(mockData);

    expect(mockConnection.query).toHaveBeenCalledWith('INSERT INTO clashes_participants SET ?', [mockData]);

    expect(result).toEqual(getStateSuccess({ statusCode: 201 }))
 */
  });

});