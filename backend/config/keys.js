const mongoURI = process.env.MONGO_URI
const secretOrKey = process.env.SECRET_KEY
module.exports = {
    mongoURI: mongoURI.toString(),
    secretOrKey: secretOrKey.toString()
  };
