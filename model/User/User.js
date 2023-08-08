//The provided code is written in JavaScript and uses the Mongoose library to define a data schema for a user in a MongoDB database.
const mongoose = require("mongoose"); //Here, the require function is used to import the "mongoose" library, which is a popular Object Data Modeling (ODM) library for MongoDB

//schema
//The first argument to the mongoose.Schema constructor is an object that defines the schema's fields and their properties. The second argument is another object that contains configuration options for the schema.
const userSchema = new mongoose.Schema(
  { //fisrt argument 
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountLevel: {
      type: String,
      enum: ["bronze", "silver", "gold"],
      default: "bronze",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    notificationPreferences: {
      email: { type: String, default: true },
      //..other notifications (sms) also we can add later but for noe i  course just add emeil notifiaction option
    },
    gender: {
      type: String,
      enum: ["male", "female", "prefer not to say", "non-binary"],
    },
    profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],//An array of MongoDB ObjectIDs referencing User documents/model. This can be used to track users who viewed the profile
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],//An array of MongoDB ObjectIDs referencing user documents/model. This can be used to track users who follow this user.
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],//An array of MongoDB ObjectIDs referencing user documents/model. This can be used to track users whom this user follows.
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],//An array of MongoDB ObjectIDs referencing user documents/model. This can be used to track users whom this user has blocked.
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],//An array of MongoDB ObjectIDs referencing post documents/model associated with this user.
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],//An array of MongoDB ObjectIDs referencing post documents/model that this user has liked.
    passwordResetToken: {
      type: String, //A string representing a token for password reset functionality.
    },
    passwordResetExpires: {
      type: Date,  //  date field indicating the expiration of the password reset token.
    },
    accountVerificationToken: {
      type: String,
    },
    accountVerificationExpires: {
      type: Date,
    },
  },
  {//second argument The second argument to the schema constructor contains configuration options:
    timestamps: true,  //This option automatically adds "createdAt" and "updatedAt" fields to each document, recording the creation and last update timestamps.
    toJSON: {
      virtuals: true,  //This option includes virtual properties when converting a document to JSON.
    },
    toObject: {
      virtuals: true, //This option includes virtual properties when converting a document to a plain JavaScript object. 
    },
  }
);


//compile schema to  model
const User = mongoose.model("User", userSchema);//The mongoose.model function creates a Mongoose model based on the schema definition. The first argument is the singular name of the collection that the model corresponds to ("User" in this case). This line effectively compiles the schema into a model that you can use to interact with the MongoDB collection

module.exports = User;  // his line exports the User model so that it can be imported and used in other parts of your application.