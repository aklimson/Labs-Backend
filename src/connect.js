import mysql from 'mysql2/promise'

const connection = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'K1limson_',
  database: 'maria'
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
