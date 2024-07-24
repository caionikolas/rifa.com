import fastify from "fastify";
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import { serializerCompiler, validatorCompiler, jsonSchemaTransform, ZodTypeProvider } from "fastify-type-provider-zod";
import { createRaffle } from "./routes/create-raffle";
import { takeTicket } from "./routes/take-ticket";
import { getRaffle } from "./routes/get-raffle";
import { getTicket } from "./routes/get-ticket";
import { getRaffles } from "./routes/get-raffles";
import { errorHandler } from "./error-handler";
import cors from "@fastify/cors";

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(cors, {
  origin: '*',
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'Rifa.com',
      description: 'Site para geração de rifas online',
      version: '1.0.0'
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createRaffle);
app.register(takeTicket);
app.register(getRaffle);
app.register(getTicket);
app.register(getRaffles);

app.setErrorHandler(errorHandler)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => console.log("running"))