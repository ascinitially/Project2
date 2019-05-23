var bcrypt = require('bcrypt-nodejs')

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: { type: DataTypes.STRING, allowNull: false, validate: { len: [1] } },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    imageURL: { type: DataTypes.STRING, allowNull: true },
    aboutMe: { type: DataTypes.STRING, allowNull: true }
  }, {
      dialect: 'mysql'
    });

  User.validPassword = function (password, passwd, done, user) {
    bcrypt.compare(password, passwd, function (err, isMatch) {
      if (err) console.log(err)
      if (isMatch) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  };
  User.associate = function (models) {
    User.hasMany(models.Deal, {
      ondDelete: "cascade"
    });
  };
  //encryption occurs here before password logged to database
  User.addHook('beforeCreate', function (user, fn) {
    var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      return salt
    });
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      var fn = function fn() { };
      if (err) return err;
      console.log(user.password);
      User.update({ password: hash }, { where: { username: user.username } })
      console.log(user.password);
      return fn(null, user)
    });
  });
  return User;
};