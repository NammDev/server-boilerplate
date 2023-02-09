const Models = require('../models/sequelize')
// CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

class UserService {
  constructor(sequelize) {
    Models(sequelize)
    this.client = sequelize
    this.models = sequelize.models
  }

  async createUser({ firstName, lastName, email, password }) {
    try {
      const user = await this.models.User.create({
        firstName,
        lastName,
        email,
        password,
      })
      return user
    } catch (error) {
      return error
    }
  }

  async getAllUsers() {
    try {
      const users = await this.models.User.findAll()
      return users
    } catch (err) {
      return err
    }
  }

  async getAllUsersAttribute() {
    try {
      const users = await this.models.User.findAll({
        attributes: ['firstName', 'email'],
        // attributes: { exlude: ['password']}
      })
      return users
    } catch (err) {
      return err
    }
  }

  // Return only 1 record
  async findOneUser() {
    try {
      const users = await this.models.User.findOne({
        where: { firstName: 'Nguyen' },
      })
      return users
    } catch (err) {
      return err
    }
  }

  async getAllUsersWhere() {
    try {
      const users = await this.models.User.findAll({ where: { firstName: 'Nguyen' } })
      return users
    } catch (err) {
      return err
    }
  }

  async updateUser() {
    try {
      await this.models.User.update(
        { lastName: 'lastName changed' },
        { where: { firstName: 'wdj' } }
      )
      return 'updated User'
    } catch (err) {
      return err
    }
  }

  async deleteUser() {
    try {
      const user = await this.models.User.destroy({ where: { firstName: 'wdj' } })
      return 'deleted User'
    } catch (err) {
      return err
    }
  }

  async getUser() {
    return 'UserService: Getting a User from Database'
  }

  async getClient() {
    return this.models
  }
}

module.exports = UserService
