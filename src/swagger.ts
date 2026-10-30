import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Desafio API FUll",
    description: "Desafio de la semana 3",
  },
  host: "localhost:3000",
  basePath: "/api",
};

const outputFile = "./swagger_output.json";
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc);   