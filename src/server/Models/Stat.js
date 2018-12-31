const Stat = (sequelize, DataTypes) => {
  const Stat = sequelize.define(
    'Stat', // name of Model
    {
      // fields

      name: DataTypes.TEXT,
      date: DataTypes.DATE,
      value: DataTypes.FLOAT
    },
    {
      getterMethods: {}
    },
    {
      classMethods: {}
    }
  );
  return Stat;
};

module.exports = Stat;
