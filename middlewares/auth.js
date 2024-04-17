const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const dotenv = require('dotenv');
const db = require("../models");
const users = db.allusers;


dotenv.config();

const strategy = new Auth0Strategy({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
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
