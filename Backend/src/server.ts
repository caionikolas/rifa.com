import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { date, z } from "zod"

import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { generateSlug } from "./utils/generate-slug";
import { randomUUID } from "node:crypto";

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
    }),
    response: {
      201: z.object({
        raffleId: z.string().uuid(),
      })
    }
  }
}, async (request, reply) => {
  const { 
    title,
    email,
    password,
    maximumNumbers,
    drawDate,
    prizePool,
  } = request.body

  const uuid = randomUUID().toString()
  const getslug = uuid.substring(uuid.length - 10)

  const slug = generateSlug(getslug)

  /*
  const raffleWithSameSlug = await prisma.raffle.findUnique({
    where: {
      slug,
    }
  })

  if (raffleWithSameSlug !==) {
    throw new Error('Slug ja existe')
  }
 */
  const raffle = await prisma.raffle.create({
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