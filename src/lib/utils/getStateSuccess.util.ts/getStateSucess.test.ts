import { getStateSuccess } from "./getStateSuccess.util";

describe('Response quest success', () => {

  it('return normal data', () => {
    const response = getStateSuccess();

    expect(response).toEqual({
      statusCode: 200,
      success: true,
      message: 'Éxito'
    });

  });

  it('return normal data,change stateCode and message', () => {
    const response = getStateSuccess(
      { statusCode: 201, message: 'Creado exitosamente' }
    );

    expect(response).toEqual({
      statusCode: 201,
      success: true,
      message: 'Creado exitosamente'
    });

  });

  it('return add property  data', () => {

    const response = getStateSuccess(
      {
        data: [{
          id: 1,
          nombre: 'sebastian'
        }]
      }
    );

    expect(response).toEqual({
      statusCode: 200,
      success: true,
      message: 'Éxito',
      data: [{
        id: 1,
        nombre: 'sebastian'
      }]
    });

  });

  it('return pagination', () => {
    const pagination = {
      data: [
        {
          id: 1,
          name: 'sebastian'
        }
      ],
      total: 1,
      totalPages: 1,
      currentPage: 1,
      pageSize: 1,
      next: null,
      prev: null,

    };

    const response = getStateSuccess(
      {
        pagination
      }
    );

    expect(response).toEqual({
      statusCode: 200,
      success: true,
      message: 'Éxito',
      pagination: pagination
    });

  })

})