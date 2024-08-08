import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const fastify = Fastify();
const prisma = new PrismaClient();
const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key');

// User registration
fastify.post<{ Body: { email: string, password: string } }>('/register', async (request, reply) => {
  const { email, password } = request.body;
  
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return reply.status(400).send({ error: error.message });
  
  // Create the user in the database
  const newUser = await prisma.user.create({
    data: {
      email,
      password, // In production, you should hash the password before saving
    },
  });

  reply.send(newUser);
});

// User login
fastify.post<{ Body: { email: string, password: string } }>('/login', async (request, reply) => {
  const { email, password } = request.body;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return reply.status(401).send({ error: error.message });
  return reply.send(data);
});

// Retrieve all accounts for a user
fastify.get<{ Params: { userId: number } }>('/accounts', async (request, reply) => {
  const userId = request.params.userId;
  const accounts = await prisma.account.findMany({ where: { userId } });
  reply.send(accounts);
});

// Retrieve all transactions for an account
fastify.get<{ Params: { accountId: string } }>('/accounts/:accountId/transactions', async (request, reply) => {
  const accountId = parseInt(request.params.accountId);
  const histories = await prisma.history.findMany({ where: { accountId } });
  reply.send(histories);
});

// Swagger documentation
fastify.register(require('fastify-swagger'), {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Account Manager API',
      description: 'API documentation for Account Manager Service',
      version: '0.1.0'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  exposeRoute: true
});

const start = async () => {
  try {
    await fastify.listen(3000);
    // fastify.swagger();
    console.log('Account Manager Service is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();