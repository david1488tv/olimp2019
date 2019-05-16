const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        google_id: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        liked: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    }, {
        timestamps: false,
        freezeTableName: true,
    });

    User.associate = function (models) {
        const { HistoryEntry, Subjects, Coefficients, Choice } = models;
        User.HistoryEntry = User.hasMany(HistoryEntry, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            },
        });
        User.Subjects = User.hasMany(Subjects, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            },
        });
        User.Coefficients = User.hasMany(Coefficients, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            },
        });
        User.Choice = User.hasMany(Choice, {
            onDelete: 'CASCADE',
            foreignKey: {
                name: 'user_id',
                allowNull: false,
            },
        });
    };

    return User;
};
