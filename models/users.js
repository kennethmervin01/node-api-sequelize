// const bcrypt = require("bcrypt-nodejs");
import bcrypt from "bcrypt-nodejs";
export default (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },

    username: {
      type: Sequelize.STRING(16),
      allowNull: false,
      unique: true
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true
    }
  });

  // User.associate = models => {
  //   User.hasMany(models.password, {
  //     foreignKey: "user_id",
  //     sourceKey: "id"
  //   });
  // };

  // User.beforeSave = async (user, options) => {
  //   let err;
  //   if (user.changed("password")) {
  //     let salt, err;
  //     [err, salt] = await bcrypt.genSaltSync(10);
  //     if (err) console.log("Cant Save User Error 1");
  //     [err, hash] = await bcrypt.hashSync(user.password, salt);
  //     if (err) console.log("Cant Save User Error 2");
  //     user.password = hash;
  //   }
  // };
  //
  // User.prototype.validPassword = function(password) {
  //   return bcrypt.compareSync(password, this.password);
  // };

  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  return User;
};
