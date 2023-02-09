const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        // get from database -> manipulate it
        // be call every single time grab the user
        get() {
          const rawValue = this.getDataValue('firstName')
          return rawValue ? rawValue.toUpperCase() : null
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // manipulate first -> send to database
        set(value) {
          this.setDataValue('password', `hasehed(${value})`)
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  )
  // Create a Table if it not exist or ready
  // Alter, when modify attributes, it will create
  sequelize.sync({ alter: true })
}
