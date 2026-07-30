const { text } = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const MemoriaSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  src: {
    type: String,
    require: true,
  },
  favorite: { 
    type: Boolean,
  },
  comments: [commentSchema]
},
{ timestamps: true }
);

module.exports = mongoose.model("Memoria", MemoriaSchema)