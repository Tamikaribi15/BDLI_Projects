const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  notificationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  createdFor: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'userId',
    },
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'userId',
    },
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Read', 'Unread'),
    allowNull: false,
    defaultValue: 'Unread',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Notification;
