const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Users = mongoose.model("Users", UsersSchema);
