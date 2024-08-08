import Fastify from 'fastify';
import { PrismaClient, Prisma } from '@prisma/client';

const fastify = Fastify();
const prisma = new PrismaClient();

const processTransaction = (transaction: Prisma.TransactionClient) => {
  return new Promise<Prisma.TransactionClient>((resolve, reject) => {
    console.log('Transaction processing started for:', transaction);
    setTimeout(() => {
      console.log('Transaction processed for:', transaction);
      resolve(transaction);
    }, 30000); // 30 seconds
  });
};

// Send API
fastify.post<{ Body: Prisma.TransactionClient }>('/send', async (request, reply) => {
  const transaction = request.body;
  const savedTransaction = await prisma.transaction.create({ data: transaction });

  processTransaction(savedTransaction)
    .then(async (processedTransaction) => {
      await prisma.transaction.update({
        where: { id: savedTransaction.id },
        data: { status: 'completed' }
      });
      reply.send(processedTransaction);
    })
    .catch(async (error) => {
      await prisma.transaction.update({
        where: { id: savedTransaction.id },
        data: { status: 'failed' }
      });
      reply.status(500).send({ error: 'Transaction failed' });
    });
});

// Withdraw API
fastify.post<{ Body: Prisma.TransactionClient }>('/withdraw', async (request, reply) => {
  const transaction = request.body;
  const savedTransaction = await prisma.transaction.create({ data: transaction });

  processTransaction(savedTransaction)
    .then(async (processedTransaction) => {
      await prisma.transaction.update({
        where: { id: savedTransaction.id },
        data: { status: 'completed' }
      });
      reply.send(processedTransaction);
    })
    .catch(async (error) => {
      await prisma.transaction.update({
        where: { id: savedTransaction.id },
        data: { status: 'failed' }
      });
      reply.status(500).send({ error: 'Transaction failed' });
    });
});

const start = async () => {
  try {
    await fastify.listen(3001);
    console.log('Payment Manager Service is running on http://localhost:3001');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();