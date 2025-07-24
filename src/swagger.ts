import path from "node:path";
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {

  definition: {
    openapi: "3.0.0",
    info: {
      title: "API fights",
      version: "1.0.0",
      description: "API que generar enfrentamientos entre boxeadores de distintas escuelas de boxeo",
    }
  },
  apis: [`${path.join(__dirname, 'routers/**/*.router.ts')}`]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;