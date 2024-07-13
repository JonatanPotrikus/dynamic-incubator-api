export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  company: {
    name: process.env.COMPANY_NAME,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  jwtSecret: process.env.JWT_SECRET,
});
