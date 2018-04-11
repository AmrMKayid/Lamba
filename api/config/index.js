// Global App Configuration
module.exports = {
    FRONTEND_URI: process.env.FRONTEND_URI || 'http://localhost:4200/',
    SECRET: '32876qihsdh76@&#!742(*#HG&#28702y&##@^!()(&^#))jhscbd',
    MONGO_URI:
        process.env.NODE_ENV === 'production'
            ? 'mongodb://AmrMKayid:Lamba*2018@ds237489.mlab.com:37489/lamba'
            : 'mongodb://localhost:27017/lamba',
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};
