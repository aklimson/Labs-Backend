import bcrypt from 'bcrypt'
import db from '../config/database.js'
import jwt from './jwt.js'

class JwtUsersModel {
  async getAllUsers() {
    const con = await db.getConnection()

    const sql = `
      SELECT id, username, email, role, created_at, updated_at
      FROM user_jwt
      ORDER BY id
    `
    const [rows] = await con.execute(sql)
    return rows
  }

  async getUser(username) {
    const con = await db.getConnection()

    const sql = 'SELECT * FROM user_jwt WHERE username = ? LIMIT 1'
    const [rows] = await con.execute(sql, [username])
    return rows[0] || null
  }

  async initPasswords() {
    const con = await db.getConnection()

    const sql = 'SELECT id, password FROM user_jwt'
    const [users] = await con.execute(sql)

    let updated = 0

    for (const user of users) {
      const password = user.password || ''

      if (
        password.startsWith('$2a$') ||
        password.startsWith('$2b$') ||
        password.startsWith('$2y$')
      ) {
        continue
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      await con.execute(
        'UPDATE user_jwt SET password = ? WHERE id = ?',
        [hashedPassword, user.id]
      )

      updated += 1
    }

    return { updated }
  }

  async register(username, password, email) {
    const existingUser = await this.getUser(username)
    if (existingUser) {
      const err = new Error('The user already exists and can not be registered!')
      err.status = 409
      throw err
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const con = await db.getConnection()

    const sql = `
      INSERT INTO user_jwt (username, password, email, role)
      VALUES (?, ?, ?, ?)
    `
    await con.execute(sql, [username, hashedPassword, email, 'user'])

    return { username }
  }

  async login(username, password) {
    const user = await this.getUser(username)

    if (!user) {
      const err = new Error('Wrong user or password!')
      err.status = 401
      throw err
    }

    const success = await bcrypt.compare(password, user.password)

    if (!success) {
      const err = new Error('Wrong user or password!')
      err.status = 401
      throw err
    }

    const token = jwt.createJwtToken(user.username, user.role, user.email)
    const payload = jwt.verifyJwtToken(token)

    return { token, payload }
  }
}

export default new JwtUsersModel()