"use strict"

const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  userContributed: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Trip'
  },
  content: 'string',
});

const tripSchema = mongoose.Schema({
  userContributed: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  name: 'string',
  location: {
    "longAndLat": 'string',
    "state": 'string'
  },
  nights: 'string',
  totalMileage: 'string',
  shortDescription: 'string',
  longDescription:'string',
  difficulty: 'string',
  features: ['string'],
  comments: [commentSchema]
});

const userSchema = mongoose.Schema({
  userName: 'string',
  firstName: 'string',
  lastName: 'string',
  password: 'string',
  tripsPosted:[tripSchema]
});

//prehook for username
tripSchema.pre('find', function(next) {
	this.populate('user');
	next();
});


tripSchema.methods.serialize = function() {
	return {
		id: this._id,
		name: this.name,
		userContributed: this.userName,
		location: this.location,
		nights: this.nights,
		totalMileage: this.totalMileage,
		shortDescription: this.shortDescription,
		longDescription: this.longDescription,
		difficulty: this.difficulty,
		features: this.features
	};	
};

userSchema.methods.serialize = function() {
	return {
		id: this._id,
		userName: this.userName,
		firstName: this.firstName,
		lastName: this.lastName,
		password: this.password,
		tripsPosted: this.tripsPosted,
	};	
};
const Trip = mongoose.model("Trips", tripSchema);
const User = mongoose.model("Users", userSchema);
const Comment = mongoose.model("Comments", commentSchema);

module.exports = { Trip, User, Comment};