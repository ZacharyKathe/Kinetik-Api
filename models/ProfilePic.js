const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class ProfilePic extends Model {}

ProfilePic.init(
    {
        profilePicture: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'ProfilePic',   
    }
);

module.exports = ProfilePic;