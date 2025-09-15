import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Crear la planta
  await prisma.plant.create({
    data: {
      name: "Perú",
      code: "PE",
      address: "Av. Principal S/N - Lima",
      operations: {
        create: [
          {
            name: "Impresión",
            cost: {
              create: {
                KG_300: 0.015,
                KG_500: 0.015,
                TN_1: 15.0,
                TN_3: 10.0,
                TN_5: 8.0,
                TN_10: 7.0,
                TN_20: 5.0,
                TN_30: 4.8,
              },
            },
          },
          {
            name: "Laminado",
            cost: {
              create: {
                KG_300: 15.0,
                KG_500: 15.0,
                TN_1: 15.0,
                TN_3: 10.0,
                TN_5: 8.0,
                TN_10: 7.0,
                TN_20: 5.0,
                TN_30: 4.8,
              },
            },
          },
          {
            name: "Embolsado",
            cost: {
              create: {
                KG_300: 15.0,
                KG_500: 15.0,
                TN_1: 15.0,
                TN_3: 10.0,
                TN_5: 8.0,
                TN_10: 7.0,
                TN_20: 5.0,
                TN_30: 4.8,
              },
            },
          },
        ],
      },
    },
  });

  await prisma.plant.create({
    data: {
      name: "Colombia",
      code: "COL",
      address: "Av. Principal S/N - Bogotá",
      operations: {
        create: [
          {
            name: "Corte",
            cost: {
              create: {
                KG_300: 0.015,
                KG_500: 0.015,
                TN_1: 15.0,
                TN_3: 10.0,
                TN_5: 8.0,
                TN_10: 7.0,
                TN_20: 5.0,
                TN_30: 4.8,
              },
            },
          },
          {
            name: "Laminado",
            cost: {
              create: {
                KG_300: 15.0,
                KG_500: 15.0,
                TN_1: 15.0,
                TN_3: 10.0,
                TN_5: 8.0,
                TN_10: 7.0,
                TN_20: 5.0,
                TN_30: 4.8,
              },
            },
          },
          {
            name: "Embolsado",
            cost: {
              create: {
                KG_300: 15.0,
                KG_500: 15.0,
                TN_1: 15.0,
                TN_3: 10.0,
                TN_5: 8.0,
                TN_10: 7.0,
                TN_20: 5.0,
                TN_30: 4.8,
              },
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
