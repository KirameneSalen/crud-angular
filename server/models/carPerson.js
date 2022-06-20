module.exports = (sequelize, DataType) => {
  let model = sequelize.define('CarPerson', {
  }, {
    timestamps: true
  });
  sequelize.models.Car.belongsToMany(sequelize.models.Person, { through: model });
  sequelize.models.Person.belongsToMany(sequelize.models.Car, { through: model });
  return model;
};
