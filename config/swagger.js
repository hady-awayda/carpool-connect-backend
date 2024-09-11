import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0", // You can use OpenAPI 3.0.0 version
  info: {
    title: "User API Documentation", // Title of the API
    version: "1.0.0", // Version of the API
    description: "API documentation for the User management system", // Description of the API
  },
  servers: [
    {
      url: "http://localhost:5000", // API server URL
    },
  ],
};

const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ["./src/controllers/*.js"], // Files containing annotations for API documentation
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwaggerUI = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at /docs");
};

export default setupSwaggerUI;
