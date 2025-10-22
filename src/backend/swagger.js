

import swaggerJsdoc from "swagger-jsdoc";
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API REST",
      version: "1.0.0",
    },
    description: "Documentacion de API REST con Express, Prisma y PostgreSQL",
    contac: {
      email: "16644218@senati.pe",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"],
};
export const swaggerSpec = swaggerJsdoc(swaggerOptions);
