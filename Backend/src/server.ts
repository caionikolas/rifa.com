import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createRaffle } from "./routes/create-raffle";
import { takeTicket } from "./routes/take-ticket";
import { getRaffle } from "./routes/get-raffle";
import { getTicket } from "./routes/get-ticket";
import { getRaffles } from "./routes/get-raffles";

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createRaffle);
app.register(takeTicket);
app.register(getRaffle);
app.register(getTicket);
app.register(getRaffles);

app.listen({ port: 3333 }).then(() => console.log("running"))