'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async getPhotos() {
      const photos = await Photo.scope('preview').findAll({
        limit: 20
      });
      return photos;
    };

    static async findPhoto({id}) {
      const photo = await Photo.scope('main').findByPk(id);
      return photo;
    }

    static async profilePhotos(userId) {
      const photos = await Photo.scope('preview').findAll({
        where: { userId }
      })
      return photos;
    }

    static async addAPhoto({ userId, thumbSrc, src }) {
      const photo = await Photo.create({
        src,
        thumbSrc,
        userId
      })
      return await Photo.scope('preview').findByPk(photo.id);
    }

    static async removePhoto({id}) {
      await Photo.destroy({
        where: {
          id
        }
      })
      const message = 'Photo Deleted';
      return message;
    }

    static associate(models) {
      // define association here
      Photo.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };
  Photo.init({
    src: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbSrc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    albumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
    scopes: {
      preview: {
        attributes: { exclude: ['src'] },
      },
      main: {
        attributes: { exclude: ['thumbSrc']}
      }
    }
  });
  return Photo;
};
