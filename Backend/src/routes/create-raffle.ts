import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createRaffle(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/raffles', {
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

    const raffle = await prisma.raffle.create({
      data: {
        title,
        email,
        password,
        maximumNumbers,
        drawDate,
        prizePool,
      }
    })

    return reply.status(201).send({ raffleId: raffle.id })
  })
}

