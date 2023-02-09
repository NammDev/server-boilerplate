const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
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
