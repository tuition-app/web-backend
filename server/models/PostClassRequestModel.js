module.exports = (Sequelize, DataTypes) => {

    const PostClassRequest = Sequelize.define("PostClassRequest", {
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
        // fees: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     validate: {
        //         notEmpty: true
        //     }
        // },
        perHour: {
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
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        medium: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        platform: {
            type: DataTypes.JSON,   //store as a json directly
            allowNull: false,
            defaultValue: [], // Default value is an empty array
            validate: {
                notEmpty: true
            }
        },
        type: {
            type: DataTypes.JSON,   //store as a json directly
            allowNull: false,
            defaultValue: [], // Default value is an empty array
            validate: {
                notEmpty: true
            }
        },
        areas: {
            type: DataTypes.JSON,   //store as a json directly
            allowNull: false,
            defaultValue: [], // Default value is an empty array
            validate: {
                notEmpty: true
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


    })

    return PostClassRequest;

}