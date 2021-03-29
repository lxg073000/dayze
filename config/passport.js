const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose  = require('mongoose');
const keys = require('./keys');

const User = mongoose.model('users'); /////////////!!!


const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

// module.exports = passport => {
//   passport.use(new JwtStrategy(options, (jwt_payload, done)=>{
//     console.log(jwt_payload);
//     done();
//   }))
// }

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done)=>{
    User.findById(jwt_payload.id)
      .then(user=>{
        if (user){
          return done(null, user);
        }
      })
    console.log(jwt_payload);
    done();
  }))
}