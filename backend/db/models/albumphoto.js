'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlbumPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AlbumPhoto.init({
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Photos',
        key: 'id'
      }
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Albums',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'AlbumPhoto',
  });
  return AlbumPhoto;
};