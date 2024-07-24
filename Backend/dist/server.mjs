import {
  errorHandler
} from "./chunk-BQKJ63XU.mjs";
import {
  createRaffle
} from "./chunk-GDAQNBV7.mjs";
import {
  getRaffle
} from "./chunk-3JPKBQ2F.mjs";
import {
  getRaffles
} from "./chunk-I33Y4HK7.mjs";
import {
  getTicket
} from "./chunk-NADG7A55.mjs";
import {
  takeTicket
} from "./chunk-YM74E3U3.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/server.ts
import fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import cors from "@fastify/cors";
var app = fastify().withTypeProvider();
app.register(cors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Rifa.com",
      description: "Site para gera\xE7\xE3o de rifas online",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createRaffle);
app.register(takeTicket);
app.register(getRaffle);
app.register(getTicket);
app.register(getRaffles);
app.setErrorHandler(errorHandler);
app.listen({
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
  host: "0.0.0.0"
}).then(() => console.log("running"));
export {
  app
};
