module.exports = (sequelize, DataType) => {
    let person = sequelize.define('Person', {
        nume: {
            type: DataType.TEXT
        },
        prenume: {
            type: DataType.TEXT
        },
        cnp: {
            type: DataType.TEXT
        },
        varsta: {
            type: DataType.INTEGER
        }
    }, {
        timestamps: true
    });
    return person;
};
