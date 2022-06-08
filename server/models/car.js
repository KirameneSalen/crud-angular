module.exports = (sequelize, DataType) => {
    let model = sequelize.define('Car', {
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
    /*
      Aceasta linie este comentata pentru a demonstra legatura dintre tabelul Information si tabelul Post prin id
    */
    // model.belongsTo(sequelize.models.Post, {foreignKey: 'id_post', onDelete: 'set null'});
    return model;
  };
  