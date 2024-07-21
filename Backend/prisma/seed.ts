import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.raffle.create({
      data: {
        id: "a2ab747d-219d-48cb-9333-842bff07cd79",
        title: "Rifa de Carnaval",
        email: "diana@tal.com",
        password: "123",
        maximumNumbers: 100,
        drawDate: "2024/08/14",
        prizePool: "Um Kit Homem sagaz"
      }
    })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})