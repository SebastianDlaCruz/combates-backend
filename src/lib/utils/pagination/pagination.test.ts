import { PoolConnection } from "mysql2/promise";
import { getPagination } from "./pagination.util";

/* jest.mock('../connection-db.util', () => ({
  getConnectionDB: jest.fn(),
})); */

const mockConnection: Partial<PoolConnection> = {
  query: jest.fn(),
  release: jest.fn(),
};

describe('Pagination', () => {

  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar mocks después de cada prueba
  });


  it('should return pagination success true', async () => {

    const mockData = [{ id: 1, name: 'Boxer 1' }, { id: 2, name: 'Boxer 2' }]

    const mockTotalItems = [{ totalItems: 2 }];

    (mockConnection.query as jest.Mock).mockResolvedValueOnce([mockData])
      .mockResolvedValueOnce([mockTotalItems]);

    const config = {
      page: 1,
      pageSize: 2,
      querySelect: 'SELECT * FROM Boxer LIMIT ? OFFSET ?',
      queryItems: 'SELECT COUNT(*) as totalItems FROM boxer',
      routerApi: '/api/boxers',
      connection: mockConnection as PoolConnection
    }

    const result = await getPagination(config);

    expect(result.success).toBe(true);
    expect(result.pagination.data).toEqual([{ id: 1, name: 'Boxer 1' }, { id: 2, name: 'Boxer 2' }]);
    expect(result.pagination.total).toBe(2);
    expect(result.pagination.totalPages).toBe(1);
    expect(result.pagination.currentPage).toBe(1);
    expect(result.pagination.pageSize).toBe(2);
    expect(result.pagination.next).toBeNull();
    expect(result.pagination.prev).toBeNull();

  });
});