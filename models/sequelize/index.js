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
        validate: {
          isEmail: true,
        },
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
      // soft delete, set a flag but not really delete it
      paranoid: true,
    }
  )

  const ContactInfo = sequelize.define(
    'ContactInfo',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      phone: {  
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  )

  const Tweet = sequelize.define(
    'Tweet',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  )

  //one-to-one => hasOne, belognsTo
  User.hasOne(ContactInfo, {
    foriegnKey: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  })
  ContactInfo.belongsTo(User)

  //one-to-many => hasMany, belognsTo
  User.hasMany(Tweet, {
    foriegnKey: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  })
  Tweet.belongsTo(User)

  //many-to-many => belongsToMany
  User.belongsToMany(User, { as: 'User', foreignKey: 'UserId', through: 'Follow' })
  User.belongsToMany(User, { as: 'Followed', foreignKey: 'FollowedId', through: 'Follow' })

  // Create a Table if it not exist or ready
  // Alter, when modify attributes, it will create
  sequelize.sync({ alter: true })
}
