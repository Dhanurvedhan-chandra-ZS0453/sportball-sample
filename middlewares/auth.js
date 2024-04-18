const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const dotenv = require('dotenv');
const db = require("../models");
const users = db.allusers;


dotenv.config();

const strategy = new Auth0Strategy({
    domain: 'dev-3s0j68qpfmtfkc23.us.auth0.com',
    clientID: '8OFdywSeBqFb0o0Bx8Gm2d0RZDejq09y',
    clientSecret: '_m1VG6NwxORJPd7E4-5mtoLgzoHhOaHCm4Z1kDmjXNQYRty6WCY8FAuE0yiL5Pzq',
    callbackURL: 'http://localhost:3002/callback'
}, async (accessToken, refreshToken, extraParams, profile, done) => {
    const profile_id = profile.id;
    const profile_name = profile._json.name !== '' ? profile._json.name : profile._json.nickname;

    try {
        let user = await users.findOne({ where: { auth_id: profile_id } });
        console.log(profile);
        if (!user) {
            user = await users.create({
                auth_id: profile_id,
                email: profile_name,
            });
        }

        // Pass the user object to done
        return done(null, user);
    } catch (error) {
        return done(error);
    }
});

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    return done(null, id);
});

passport.use(strategy);

module.exports = passport;
