import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { BadRequest } from "./_errors/bad-request";

export async function putRaffle(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .put('/raffles/:raffleId', {
    schema: {
      summary: 'Atualizar uma rifa',
      tags: ['Raffles'],
      body: z.object({
        title: z.string().min(4),
        email: z.string().email(),
        password: z.string(),
        maximumNumbers: z.number().positive().int(),
        drawDate: z.string().nullish(),
        prizePool: z.string().nullish(),
      }),
      params: z.object({
        raffleId: z.string().uuid()
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

    const { raffleId } = request.params

    const verificaId = await prisma.raffle.findUnique({
      where: {
        id: raffleId,
      }
    })

    if(verificaId === null) {
      throw new BadRequest('Rifa não encotrada.')
    }

    await prisma.raffle.delete({
      where: {
        id: raffleId,
      }
    })

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

