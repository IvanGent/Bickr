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

    static async addPhoto({ albumId, photoId }) {
      const rel = await AlbumPhoto.create({
        albumId,
        photoId
      })
      const message = 'Photo Added';
      return message;
    }

    static async removePhoto({ albumId, photoId }) {
      await AlbumPhoto.destroy({
        where: {
          photoId,
          albumId
        }
      })
      const message = 'Photo Deleted';
      return message;
    }


    static associate(models) {
      // // define association here
      AlbumPhoto.belongsTo(models.Photo, { foreignKey: 'id'});
      AlbumPhoto.belongsTo(models.Album, { foreignKey: 'id'});
    }
  };
  AlbumPhoto.init({
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Photos',
      //   key: 'id'
      // }
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Albums',
      //   key: 'id'
      // }
    }
  }, {
    sequelize,
    modelName: 'AlbumPhoto',
  });
  return AlbumPhoto;
};