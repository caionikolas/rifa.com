import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod"

import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const prisma = new PrismaClient({
  log: ['query'],
})

app
  .withTypeProvider<ZodTypeProvider>()
  .post('/raffle', {
  schema: {
    body: z.object({
      title: z.string().min(4),
      email: z.string().email(),
      password: z.string(),
      maximumNumbers: z.number().positive().int(),
      drawDate: z.string().nullish(),
      prizePool: z.string().nullish(),
      slug: z.string()
    })
  }
}, async (request, reply) => {
  const { 
    title,
    email,
    password,
    maximumNumbers,
    drawDate,
    prizePool,
    slug,
  } = request.body

  const raffle = await prisma.rifa.create({
    data: {
      title,
      email,
      password,
      maximumNumbers,
      drawDate,
      prizePool,
      slug,
    }
  })

  return reply.status(201).send({ raffleId: raffle.id })
})

app.listen({ port: 3333 }).then(() => console.log("running"))