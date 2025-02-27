import { getConnectionDB } from "../../utils/connection-db.util";
import { getStateError } from "../../utils/getStateError.util";
import { getStateSuccess } from "../../utils/getStateSucces.utilt";
import { Boxer, BoxerModel } from "./boxer.model";

jest.mock('../../utils/connection-db.util.ts')


describe('BoxerModel', () => {

  let boxerModel: BoxerModel;
  let dbTest: <T>(data: T) => jest.Mock<any, any, any>
  let errorTest: (error: Error) => jest.Mock<any, any, any>;

  beforeEach(() => {
    boxerModel = new BoxerModel();
    dbTest = <T>(data: T) => (getConnectionDB as jest.Mock).mockResolvedValue({
      query: jest.fn().mockResolvedValue(data)
    });

    errorTest = (error: Error) => (getConnectionDB as jest.Mock).mockRejectedValue(error);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  /**
   * Crear el mock esperado que devolver la api, gestionamos el dato de que esta en nuestra base de datos y lo comparamos
   */

  it('should return boxer when given a valid by id ', async () => {

    const mockBoxer = { id: '1', name: 'sebastian' };

    dbTest([mockBoxer]);

    const result = await boxerModel.getBoxer('1');

    expect(result).toEqual(getStateSuccess({ data: mockBoxer }))

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

  })
})