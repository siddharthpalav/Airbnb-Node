// import 'dotenv/config';
// import { PrismaClient } from '../src/generated/client';

// // src/src/generated/client.ts
// // import { PrismaClient } from '../src/generated/prisma/client';

// export default new PrismaClient({ accelerateUrl: process.env.DATABASE_URL! });

import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../src/generated/client';

const adapter = new PrismaMariaDb({
	host: process.env.DATABASE_HOST as string,
	user: process.env.DATABASE_USER as string,
	password: process.env.DATABASE_PASSWORD as string,
	database: process.env.DATABASE_NAME as string,
	connectionLimit: 5
});

export default new PrismaClient({ adapter });
