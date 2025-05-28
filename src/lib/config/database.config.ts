const {
  HOST,
  USER,
  PORTDB,
  PASSWORD,
  DATABASE } = process.env;


export const configDb = {
  host: HOST,
  user: USER,
  port: parseInt(PORTDB || '3306'),
  password: PASSWORD,
  database: DATABASE,
  connectionLimit: 10,
  queueLimit: 0,
} as const;