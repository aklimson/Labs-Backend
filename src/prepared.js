import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// create the connection to database
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
})

try {
  // execute will internally call prepare and query
  const sql = 'SELECT * FROM `user` WHERE `username` = ?'
  const args = ['alice']

  const [results] = await connection.execute(sql, args)

  console.log(results)

} catch (err) {
  console.log(err)
}

// Close the database connection
await connection.end()
console.log('Database connection closed.')