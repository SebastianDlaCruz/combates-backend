import { PoolConnection } from "mysql2/promise";
import { getStateError } from "../../utils/getStateError.util";
import { getStateSuccess } from "../../utils/getStateSuccess.util.ts/getStateSuccess.util";
import { getPagination } from "../../utils/pagination/pagination.util";
import * as utils from '../../utils/validateElement/validate-element.util';
import { Boxer, BoxerModel } from "./boxer.model";

jest.mock('../../utils/pagination/pagination.util', () => ({
  getPagination: jest.fn(),
}));

describe('BoxerModel', () => {

  let boxerModel: BoxerModel;
  let dbTest: <T>(data: T) => jest.Mock<any, any, any>
  let errorTest: (error: Error) => jest.Mock<any, any, any>;

  const mockConnection: Partial<PoolConnection> = {
    query: jest.fn(),
    release: jest.fn(),
  };

  beforeEach(() => {
    boxerModel = new BoxerModel(mockConnection as PoolConnection);
    dbTest = <T>(data: T) => (mockConnection.query as jest.Mock).mockResolvedValueOnce(data)
    errorTest = (error: Error) => (mockConnection.query as jest.Mock).mockRejectedValueOnce(error);

  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  /**
   * Crear el mock esperado que devolver la api, gestionamos el dato de que esta en nuestra base de datos y lo comparamos
   */

  it('should return boxer when given a valid by id ', async () => {

    const mockBoxer = { id: '1', name: 'sebastian', };

    dbTest([[mockBoxer]]);

    const result = await boxerModel.getBoxer('asf12-13312wss-asda');

    const stateSuccess = getStateSuccess({ message: 'Éxito', data: [mockBoxer] });

    expect(result).toEqual(stateSuccess);

  });

  it('should return an error when the database query fails', async () => {

    errorTest(new Error('error en la base de datos'));

    const result = await boxerModel.getBoxer('1');

    expect(result).toEqual(getStateError({ error: new Error('error en la base de datos') }))

  });

  it('should create new boxers return success', async () => {
    const dataMock: Boxer = {
      id: '1',
      name: 'John Doe',
      id_school: 1,
      age: 25,
      disability: 'None',
      id_category: 1,
      weight: 70,
      id_coach: 1,
      details: 'Some details',
      id_state: 1,
      corner: 'Red',
      fights: 5,
      gender: 'Male'
    }

    // la consulta de hice correctamente y al registro de le dio un id 1
    dbTest([{ insetId: 1 }]);

    const result = await boxerModel.create(dataMock);

    expect(mockConnection.query).toHaveBeenCalledWith('INSERT INTO Boxer SET ?', [dataMock]);

    expect(result).toEqual(getStateSuccess({ statusCode: 201, message: 'éxito al crear el boxeador' }))
  });

  it('should return an error  when the database  query fails ', async () => {

    const mockData = {
      id: '1',
      name: 'John Doe',
      id_school: 1,
      age: 25,
      disability: 'None',
      id_category: 1,
      weight: 70,
      id_coach: 1,
      details: 'Some details',
      id_state: 1,
      corner: 'Red',
      fights: 5,
      gender: 'Male'
    };

    errorTest(new Error('error al crear un boxeador'));

    const result = await boxerModel.create(mockData);
    expect(result).toEqual(getStateError({ error: new Error('error al crear un boxeador') }));

  });

  it('should  update boxers return success', async () => {

    dbTest([{ affectedRows: 1 }]);


    const dataMock: Boxer = {
      id: "e88ffbd5-0686-11f0-aa75-c01803c715bd",
      name: "Ana Gómez",
      id_school: 1,
      age: 25,
      disability: "Ninguna",
      id_category: 2,
      weight: 70.5,
      id_coach: 1,
      details: "Detalles de Juan",
      id_state: 1,
      corner: "Roja",
      fights: 10,
      gender: "Masculino"
    };


    jest.spyOn(utils, 'getValidateElements').mockResolvedValueOnce({ ok: true, response: true });

    const result = await boxerModel.update(dataMock.id, dataMock);


    expect(result).toEqual(getStateSuccess());

    expect(mockConnection.query).toHaveBeenCalledWith(`UPDATE Boxer
        SET 
         name = ?,
         id_school = ?,
         disability = ?,
         id_category = ?,
         weight = ?,
         id_coach = ?,
         details = ?,
         id_state = ?,
         corner = ? ,
         fights = ?,
         gender = ?, 
         age = ?
          WHERE 
        id = UUID_TO_BIN(?);`,
      [
        dataMock.name,
        dataMock.id_school,
        dataMock.disability,
        dataMock.id_category,
        dataMock.weight,
        dataMock.id_coach,
        dataMock.details,
        dataMock.id_state,
        dataMock.corner,
        dataMock.fights,
        dataMock.gender,
        dataMock.age,
        dataMock.id
      ]
    );

  });

  it('should update boxers return error', async () => {

    const dataMock: Boxer = {
      id: "e88ffbd5-0686-11f0-aa75-c01803c715bd",
      name: 'John Doe',
      id_school: 1,
      age: 25,
      disability: 'None',
      id_category: 1,
      weight: 70,
      id_coach: 1,
      details: 'Some details',
      id_state: 1,
      corner: 'Red',
      fights: 5,
      gender: 'Male'

    };

    errorTest(new Error('error al actualizar el boxeador'));

    const result = await boxerModel.update('1', dataMock);

    expect(result).toEqual(getStateError({ error: new Error('error al actualizar el boxeador') }))
  });


  it('should update state return success', async () => {

    dbTest([{ affectedRows: 1 }]);

    const state = { state: 1 };

    jest.spyOn(utils, 'getValidateElements').mockResolvedValueOnce({
      ok: true,
      response: true
    });

    const result = await boxerModel.updateState('e88ffbd5-0686-11f0-aa75-c01803c715bd', state);

    expect(result).toEqual(getStateSuccess());

  });


  it('should update state return error', async () => {

    errorTest(new Error('Boxer no encontrado'));
    const state = { state: 1 };
    const result = await boxerModel.updateState('1', state);

    expect(result).toEqual(getStateError({ error: new Error('Boxer no encontrado') }));
  });

  it('should delete boxer return success', async () => {

    dbTest([{ affectedRows: 1 }]);

    const result = await boxerModel.delete('1');

    expect(result).toEqual(getStateSuccess({
      statusCode: 204,
      message: 'Boxeador eliminado'
    }));

  });


  it('should delete boxer return error', async () => {

    errorTest(new Error('Boxer no encontrado'));
    const result = await boxerModel.delete('1');
    expect(result).toEqual(getStateError({ error: new Error('Boxer no encontrado') }));


  });


  it('should return boxer by category', async () => {

    const mockBoxer = {
      id: '1',
      name: 'sebastian',
      id_school: null,
      age: null,
      disability: null,
      id_category: null,
      weight: null,
      id_coach: null,
      details: null,
      id_state: null,
      corner: null,
      fights: null,
      gender: null
    };

    dbTest([mockBoxer]);

    jest.spyOn(utils, 'getValidateElements').mockResolvedValueOnce({
      ok: true,
      response: true
    });


    const result = await boxerModel.getByCategory(1);

    expect(result).toEqual(getStateSuccess({ data: mockBoxer }));

  });


  it('should return boxer by category error', async () => {

    errorTest(new Error('error en la base de datos'));

    const result = await boxerModel.getByCategory(1);
    expect(result).toEqual(getStateError({ error: new Error('error en la base de datos') }));

  });

  it('should return all boxers', async () => {
    const dataMock = [
      {
        id: '1',
        name: 'sebastian',
        id_category: 1
      },
      {
        id: '2',
        name: 'sebastian',
        id_category: 1
      },
      {
        id: '3',
        name: 'sebastian',
        id_category: 1
      }

    ];

    dbTest([dataMock]);

    const result = await boxerModel.getAll();
    expect(result).toEqual(getStateSuccess({ data: dataMock }));
  });

  it('should return all boxers error', async () => {

    errorTest(new Error('Error al consultar los boxeadores'));

    const result = await boxerModel.getAll();
    expect(result).toEqual(getStateError({ error: new Error('Error al consultar los boxeadores') }));

  });

  it('should return all boxers with pagination', async () => {

    const mockPagination = {
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
      },
    };

    (getPagination as jest.Mock).mockResolvedValueOnce(mockPagination);

    const result = await boxerModel.getAll('1', '3');

    expect(result).toEqual(getStateSuccess({
      pagination: mockPagination.pagination
    }))

  });

  it('should return all boxers with pagination error', async () => {
    (getPagination as jest.Mock).mockRejectedValueOnce(new Error('Error de paginación'));

    const result = await boxerModel.getAll('1', '5');

    expect(result).toEqual(getStateError({ error: new Error('Error de paginación') }))
  })


})