module.exports = (Sequelize, DataTypes) => {

    const PostCreate = Sequelize.define("PostCreate", {

        currentUserId: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        ImageLink: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        notification: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        about: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        fees: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        perHour: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        perDay: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        perMonth: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        level:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        grade:{
            type: DataTypes.JSON,
            allowNull: true,
            defaultValue: [],
            validate: {
                notEmpty: false
            }
        },
        medium: {
            type: DataTypes.STRING,   //store as a json directly
            allowNull: false,
            validate: {
                notEmpty: false
            }
        },
        platform: {
            type: DataTypes.JSON,   //store as a json directly
            allowNull: false,
            defaultValue: [], // Default value is an empty array
            validate: {
                notEmpty: false
            }
        },
        type: {
            type: DataTypes.JSON,   //store as a json directly
            allowNull: false,
            defaultValue: [], // Default value is an empty array
            validate: {
                notEmpty: false
            }
        },
        areas: {
            type: DataTypes.JSON,   //store as a json directly
            allowNull: false,
            defaultValue: [], // Default value is an empty array
            validate: {
                notEmpty: false
            }
        },
        UploadImageLink: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        negotiable: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                notEmpty: false
            }
        },
        // isAccepted
        isAccepted: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },
        // isAccepted
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            validate: {
                notEmpty: true
            }
        },

    })

    return PostCreate;

}