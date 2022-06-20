module.exports = (sequelize, DataType) => {
  let car = sequelize.define('Car', {
    marca: {
      type: DataType.TEXT
    },
    model: {
      type: DataType.TEXT
    },
    an_fabricatie: {
      type: DataType.INTEGER
    },
    capacitate_cilindrica: {
      type: DataType.INTEGER
    },
    taxa_impozit: {
      type: DataType.INTEGER
    }
  }, {
    timestamps: true
  });
  return car;
};
