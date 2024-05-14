module.exports = (Sequelize, DataTypes) => {

        const PostAddAbout = Sequelize.define("PostAddAbout", {
    
            currentUserId: {
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
            // isDeleted
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                validate: {
                    notEmpty: true
                }
            },
            
    
        })
    
        return PostAddAbout;
    
    }