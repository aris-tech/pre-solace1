const baseServerUrl = 'http://localhost:5000';
const baseClientUrl = 'http://localhost:3000';

module.exports = {
  baseServerUrl,
  baseClientUrl,
  mongoUri: 'mongodb://localhost',
  secretOrKey: 'secret',
  google: {
    clientId:
      '752387862901-lok75chm5jf0vil5akm2unut0sj57hn0.apps.googleusercontent.com',
    clientSecret: 'AZ2DDQKxapzLIuSTjiy-7CTD',
    callbackUrl: `${baseClientUrl}/auth/google/callback`,
  },
};
