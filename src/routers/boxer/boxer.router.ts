import { Router } from "express";
import { BoxerController } from "../../controllers/boxer/boxer.controller";
import { asyncWrapper } from "../../lib/utils/async-wrapper/async-wrapper.util";


export const createRouterBoxer = (boxerController: BoxerController) => {

  const routerBoxer = Router();

  /**
   * @swagger
   * /api/v1/boxer:
   *   get:
   *     summary: Devuelve todos los boxeadores con paginación
   *     tags:
   *       - Boxers
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           minimum: 1
   *           default: 1
   *         required: false
   *         description: Número de página
   *       - in: query
   *         name: pageSize 
   *         schema:
   *           type: integer
   *           minimum: 1
   *           maximum: 100
   *           default: 10
   *         required: false
   *         description: Tamaño de la página
   *     responses:
   *       200:
   *         description: Lista de boxeadores obtenida con éxito
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: integer
   *                   example: 200
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 message:
   *                   type: string
   *                   example: "Éxito"
   *                 pagination:
   *                   $ref: '#/components/schemas/PaginationResponse'
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 statusCode:
   *                   type: integer
   *                   example: 500
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 message:
   *                   type: string
   *                   example: "Error interno del servidor"
   * 
   */

  routerBoxer.get('/', (req, res, next) => asyncWrapper(boxerController.getAll.bind(boxerController))(req, res, next));

  /**
 * @swagger
 * /api/v1/boxers/search:
 *   get:
 *     summary: Busca boxeadores por nombre y/o categoría
 *     tags:
 *       - Boxers
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre o parte del nombre del boxeador (búsqueda parcial con LIKE)
 *       - in: query
 *         name: id_category
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID de la categoría para filtrar
 *     responses:
 *       200:
 *         description: Resultados de la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Búsqueda exitosa"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Boxer'
 *       400:
 *         description: Parámetros de búsqueda inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */


  routerBoxer.get('/search', (req, res, next) => asyncWrapper(boxerController.search.bind(boxerController))(req, res, next));


  routerBoxer.get('/:id', (req, res, next) => asyncWrapper(boxerController.getBoxer.bind(boxerController))(req, res, next));

  /**
 * @swagger
 * /api/v1/boxers:
 *   post:
 *     summary: Crea un nuevo boxeador
 *     description: Registra un nuevo boxeador en el sistema con todos sus datos requeridos
 *     tags:
 *       - Boxers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Boxer'
 *           example:
 *             name: "Juan Pérez"
 *             id_school: 1
 *             age: 25
 *             disability: "Ninguna"
 *             id_category: 1
 *             weight: 70.5
 *             id_coach: 1
 *             details: "Boxeador profesional con 10 peleas"
 *             id_state: 1
 *             corner: "Rojo"
 *             fights: 10
 *             gender: "Masculino"
 *     responses:
 *       201:
 *         description: Boxeador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *       
 *             example:
 *               statusCode: 201
 *               success: true
 *               message: "Éxito al crear el boxeador"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 400
 *               success: false
 *               message: "Datos inválidos"
 *               error: "El campo 'name' es requerido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 500
 *               success: false
 *               message: "Error al crear el boxeador"
 *               error: "Error de conexión con la base de datos"
 */

  routerBoxer.post('/', (req, res, next) => asyncWrapper(boxerController.create.bind(boxerController))(req, res, next));

  /**
 * @swagger
 * /api/v1/boxers/{id}:
 *   delete:
 *     summary: Elimina un boxeador existente
 *     description: Elimina permanentemente un boxeador del sistema basado en su ID
 *     tags:
 *       - Boxers
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID del boxeador a eliminar
 *         example: "50c28235-3262-11f0-9f7c-c01803c715bd"
 *     responses:
 *       200:
 *         description: Boxeador eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *        
 *             example:
 *               statusCode: 200
 *               success: true
 *               message: "Boxeador eliminado"
 *       404:
 *         description: Boxeador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 404
 *               success: false
 *               message: "Boxeador no encontrado"
 *               error: "No se encontró el boxeador con el ID proporcionado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 500
 *               success: false
 *               message: "Error al eliminar el boxeador"
 *               error: "Error de conexión con la base de datos"
 */



  routerBoxer.delete('/:id', (req, res, next) => asyncWrapper(boxerController.delete.bind(boxerController))(req, res, next));

  /**
 * @swagger
 * /api/v1/boxers/{id}/state:
 *   patch:
 *     summary: Actualiza el estado de un boxeador
 *     description: Modifica el estado (id_state) de un boxeador específico
 *     tags:
 *       - Boxers
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID del boxeador a actualizar
 *         example: "50c28235-3262-11f0-9f7c-c01803c715bd"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: integer
 *                 description: Nuevo ID de estado para el boxeador
 *                 example: 2
 *                 minimum: 1
 *             required:
 *               - state
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *           
 *             example:
 *               statusCode: 200
 *               success: true
 *               message: "Éxito al actualizar el estado del boxeador"
 *       400:
 *         description: Estado inválido o datos incorrectos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 400
 *               success: false
 *               message: "Datos inválidos"
 *               error: "El campo 'state' debe ser un número positivo"
 *       404:
 *         description: Boxeador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 404
 *               success: false
 *               message: "Boxeador no encontrado"
 *               error: "No se encontró el boxeador con el ID proporcionado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 500
 *               success: false
 *               message: "Error al actualizar el estado"
 *               error: "Error de conexión con la base de datos"
 */

  routerBoxer.put('/:id', (req, res, next) => asyncWrapper(boxerController.updateState.bind(boxerController))(req, res, next));

  /**
 * @swagger
 * /api/v1/boxers/{id}:
 *   put:
 *     summary: Actualiza todos los datos de un boxeador
 *     description: Modifica completamente la información de un boxeador existente
 *     tags:
 *       - Boxers
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: UUID del boxeador a actualizar
 *         example: "50c28235-3262-11f0-9f7c-c01803c715bd"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Boxer'
 *           example:
 *             name: "Juan Pérez Actualizado"
 *             id_school: 1
 *             age: 26
 *             disability: "Ninguna"
 *             id_category: 2
 *             weight: 71.5
 *             id_coach: 2
 *             details: "Detalles actualizados"
 *             id_state: 2
 *             corner: "Azul"
 *             fights: 11
 *             gender: "Masculino"
 *     responses:
 *       200:
 *         description: Boxeador actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *         
 *             example:
 *               statusCode: 200
 *               success: true
 *               message: "Éxito al actualizar el boxeador"
 *       400:
 *         description: Datos de entrada inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 400
 *               success: false
 *               message: "Datos inválidos"
 *               error: "El campo 'name' es requerido"
 *       404:
 *         description: Boxeador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 404
 *               success: false
 *               message: "Boxeador no encontrado"
 *               error: "No se encontró el boxeador con el ID proporcionado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               statusCode: 500
 *               success: false
 *               message: "Error al actualizar el boxeador"
 *               error: "Error de conexión con la base de datos"
 */

  routerBoxer.patch('/:id', (req, res, next) => asyncWrapper(boxerController.update.bind(boxerController))(req, res, next));


  /**
   * @swagger
   * /api/v1/boxers/{id}/corner:
   *   patch:
   *     summary: Actualiza la esquina (corner) de un boxeador
   *     description: Permite modificar la esquina asignada a un boxeador específico
   *     tags:
   *       - Boxers
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
   *         description: UUID del boxeador a actualizar
   *         example: "50c28235-3262-11f0-9f7c-c01803c715bd"
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               corner:
   *                 type: string
   *                 description: Nombre de la esquina a asignar
   *                 example: "Rojo"
   *                 enum: [Rojo, Azul]
   *             required:
   *               - corner
   *     responses:
   *       200:
   *         description: Esquina actualizada correctamente
   *         content:
   *           application/json:
   *             schema:
   *               
   *               example:
   *                 statusCode: 200
   *                 success: true
   *                 message: "Éxito al actualizar la esquina del boxeador"
   *       404:
   *         description: Boxeador no encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *               example:
   *                 statusCode: 404
   *                 success: false
   *                 message: "Boxeador no encontrado"
   *                 error: "No se encontró el boxeador con el ID proporcionado"
   *       500:
   *         description: Error interno del servidor
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ErrorResponse'
   *               example:
   *                 statusCode: 500
   *                 success: false
   *                 message: "Error al actualizar la esquina"
   *                 error: "Error de conexión con la base de datos"
   */
  routerBoxer.put('/corner/:id', (req, res, next) => asyncWrapper(boxerController.updateCorner.bind(boxerController))(req, res, next));



  return routerBoxer;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Boxer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "50c28235-3262-11f0-9f7c-c01803c715bd"
 *         name:
 *           type: string
 *           example: "Juan Pérez"
 *         id_school:
 *           type: integer
 *           example: 1
 *         age:
 *           type: integer
 *           example: 25
 *         disability:
 *           type: string
 *           example: "ojo derecho sin visibilidad"
 *         id_category:
 *           type: integer
 *           example: 1
 *         weight:
 *           type: string
 *           example: "70.5"
 *         id_coach:
 *           type: integer
 *           example: 1
 *         details:
 *           type: string
 *           example: "Detalles de Juan"
 *         id_state:
 *           type: integer
 *           example: 1
 *         corner:
 *           type: string
 *           example: "Rojo"
 *         fights:
 *           type: integer
 *           example: 10
 *         gender:
 *           type: string
 *           example: "Masculino"
 *
 * 
 *     # Esquema para respuestas de error
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 400
 *           description: Código de estado HTTP
 *         success:
 *           type: boolean
 *           example: false
 *           description: Indica si la operación fue exitosa
 *         message:
 *           type: string
 *           example: "Parámetros inválidos"
 *           description: Mensaje general del error
 *         error:
 *           type: string
 *           example: "El campo 'name' debe tener al menos 3 caracteres"
 *           description: Detalle técnico del error
 *       required:
 *         - statusCode
 *         - success
 *         - message
 * 
 * 
 * 
 * 
 *     PaginationResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Boxer'
 *         total:
 *           type: integer
 *           example: 4
 *           description: Total de registros existentes
 *         totalPages:
 *           type: integer
 *           example: 2
 *           description: Total de páginas disponibles
 *         currentPage:
 *           type: integer
 *           example: 1
 *           description: Página actual
 *         pageSize:
 *           type: integer
 *           example: 2
 *           description: Cantidad de elementos por página
 *         next:
 *           type: string
 *           nullable: true
 *           example: "api/v1/boxer?page=2&pageSize=2"
 *           description: URL de la siguiente página (null si no hay)
 *         prev:
 *           type: string
 *           nullable: true
 *           example: null
 *           description: URL de la página anterior (null si no hay)
 */