import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
})

try {
  const [results, fields] = await connection.query(
    'SELECT * FROM `user` WHERE `username` = "alice"'
  )

  console.log(results)
  console.log(fields)
} catch (err) {
  console.log(err)
}

await connection.end()
console.log('Database connection closed.')
