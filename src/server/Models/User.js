const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', // name of Model
    {
      // fields
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      created: DataTypes.DATE,
      role: { type: DataTypes.TINYINT, defaultValue: 0 }
    },
    {
      getterMethods: {}
    },
    {
      classMethods: {}
    }
  );
  return User;
};

module.exports = User;
