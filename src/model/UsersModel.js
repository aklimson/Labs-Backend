import databaseService from "../service/DatabaseService.js"

/**
 * Model to interact with the 'users' table in the database.
 * @class
 */
class UsersModel {
  /**
   * Verify and convert user ID.
   * @param {string} id - The user ID as a string.
   * @returns {number} - The verified user ID as an integer.
   * @throws {Error} - Throws an error if the ID format is invalid.
   */
  verifyUserId(id) {
    const userId = parseInt(id)
    if (!Number.isInteger(userId)) {
      throw new Error('Invalid ID format')
    }
    return userId
  }

  /**
   * Get all users from the database.
   * @async
   * @returns {Promise<Array>} An array of users.
   */
  async getAllUsers() {
    const query = "SELECT * FROM user"
    return await databaseService.query(query)
  }

  /**
   * Add a new user to the database.
   * @async
   * @param {object} user - Details for the user.
   * @returns {Promise<number>} The ID of the newly created user.
   */
  async addUser(user) {
    const { username, email, password } = user
    const query = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)"
    const result = await databaseService.query(query, [username, email, password])
    return result.insertId
  }

  /**
   * Update an existing user in the database.
   * @async
   * @param {number} id - The ID of the user to update.
   * @param {object} user - Details of the user to update.
   * @returns {Promise<boolean>} True if the update was successful, false otherwise.
   */
  async updateUser(id, user) {
    const { username, email, password } = user
    const query = "UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?"
    const result = await databaseService.query(query, [username, email, password, id])
    return result.affectedRows > 0
  }

  /**
   * Delete a user from the database.
   * @async
   * @param {number} id - The ID of the user to delete.
   * @returns {Promise<boolean>} True if the deletion was successful, false otherwise.
   */
  async deleteUser(id) {
    const query = "DELETE FROM user WHERE id = ?"
    const result = await databaseService.query(query, [id])
    return result.affectedRows > 0
  }

    /**
   * Get one user by id.
   * @async
   * @param {number} id - The ID of the user.
   * @returns {Promise<object|null>} The user or null if not found.
   */
  async getUserById(id) {
    const query = 'SELECT * FROM user WHERE id = ?'
    const result = await databaseService.query(query, [id])
    return result[0] || null
  }

    /**
     * Delete all users from the database.
     */
    async deleteAllUsers() {
    const query = "DELETE FROM user"
    const result = await databaseService.query(query)
    return result.affectedRows
  }

    /**
   * Get users filtered by a search string.
   * @async
   * @param {string} searchStr - The search string.
   * @returns {Promise<Array>} Matching users.
   */
  async getUsersBySearchString(searchStr) {
    if (!searchStr) {
      const query = "SELECT * FROM user"
      return await databaseService.query(query)
    }

    const query = "SELECT * FROM user WHERE username LIKE ? OR email LIKE ?"
    return await databaseService.query(query, [`%${searchStr}%`, `%${searchStr}%`])
  }
}

export default new UsersModel()
