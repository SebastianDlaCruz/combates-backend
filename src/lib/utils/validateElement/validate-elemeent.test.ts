import { PoolConnection } from "mysql2/promise";
import { Boxer } from "../../../models/boxer/boxer.model";
import { getValidateElements } from "./validate-element.util";

describe('getValidateElements', () => {

  let mockConnection: Partial<PoolConnection>;
  let mockBoxer: Boxer;

  beforeEach(() => {
    mockBoxer = {
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

    mockConnection = {
      query: jest.fn().mockResolvedValueOnce([[mockBoxer]])
    }


  })

  it('should receive the element and value parameters ', async () => {

    const result = await getValidateElements({
      connection: mockConnection as PoolConnection,
      element: 'Boxer',
      filterBy: 'id',
      value: [mockBoxer.id]
    });


    expect(result).toEqual({
      ok: true,
      response: true
    })
  });

  it('should receive query (sql y value)', async () => {

    const result = await getValidateElements({
      connection: mockConnection as PoolConnection,
      query: {
        sql: 'SELECT name FROM Boxer WHERE name = ?',
        value: [mockBoxer.name]
      }
    });

    expect(result).toEqual({
      ok: true,
      response: true
    })

  })

});