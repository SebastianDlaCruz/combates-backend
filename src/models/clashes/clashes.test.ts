import { PoolConnection } from "mysql2/promise";
import { ClashesModel } from "./clashes.model";

describe('Clashes', () => {

  let clashesModel: ClashesModel;
  let dbTest: (data: any) => jest.Mock<any, any, any>;
  let errorTest: (error: Error) => jest.Mock<any, any, any>;

  const mockConnection: Partial<PoolConnection> = {
    query: jest.fn()
  };

  beforeEach(() => {
    clashesModel = new ClashesModel(mockConnection as PoolConnection);
    dbTest = (data: any) => (mockConnection.query as jest.Mock).mockResolvedValueOnce(data);
  });



  it('should ', async () => {

  })
})