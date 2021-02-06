'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AlbumPhotos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      photoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Photos'
        }
      },
      albumId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Albums',
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AlbumPhotos');
  }
};