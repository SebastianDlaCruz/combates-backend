import { Request, Response } from "express";
import { IBoxer } from "../../interfaces/boxer.interface";
import { BoxerController } from "./boxer.controller";

const mockBoxer: Partial<IBoxer> = {
  getAll: jest.fn(),
  getBoxer: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
  updateState: jest.fn(),
  update: jest.fn(),
  getByCategory: jest.fn(),
};

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockResolvedValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

const mockRequest = (body: any = {}, params: any = {}, query: any = {}) => ({
  body,
  params,
  query
} as Request);



describe('BoxerControl', () => {

  let boxerController: BoxerController;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    boxerController = new BoxerController(mockBoxer as IBoxer);
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  })

  it('getAll, should return all boxers by pagination', async () => {

    const dataMock = {
      statusCode: 200,
      success: true,
      message: 'Éxito',
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
      },
    };

    (mockBoxer.getAll as jest.Mock).mockResolvedValueOnce(dataMock);

    await boxerController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(dataMock.statusCode);
    expect(res.json).toHaveBeenCalledWith(dataMock);
  })

});