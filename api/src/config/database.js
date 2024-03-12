import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'database-1.c18cukuqyzii.us-east-1.rds.amazonaws.com',
  port: 5432, // Default port for PostgreSQL
  username: 'postgres', // Replace with your PostgreSQL username
  password: '12345678', // Replace with your PostgreSQL password
  database: '', // Replace with your PostgreSQL database name
  ssl: { rejectUnauthorized: false },
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

export default sequelize;
