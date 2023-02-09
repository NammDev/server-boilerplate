// Load package.json
const pjs = require('../package.json')

// Get some meta info from the package.json
const { name, version } = pjs

module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    postgres: {
      options: {
        host: 'localhost',
        port: 5432,
        database: 'sequelize_course',
        dialect: 'postgres',
        username: 'postgres',
        password: 'namkhanh',
        logging: false,
      },
      client: null,
    },
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
  },
}
