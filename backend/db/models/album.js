'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async createAlbum({name, userId}) {
      
    }

    static associate(models) {
      // define association here
      Album.belongsTo(models.User, { foreignKey: 'userId' })
      Album.belongsToMany(models.Photo, {
        through: 'AlbumPhotos',
        as: 'photos',
         foreignKey: 'albumId'
        })
    }
  };
  Album.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};