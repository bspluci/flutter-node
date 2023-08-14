const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // 암호화 모듈
const jwt = require("jsonwebtoken");
const fs = require("fs");
const errorFun = require("../functions/utils").errorFun;

// Schema 생성
const MemberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

MemberSchema.statics.updateMember = async function (payload) {
  await this.findOneAndUpdate(
    { email: payload.email },
    { $set: { name: payload.name, email: payload.email, phone: payload.phone, image: payload.image } },
    { new: true, upsert: true }
  );
};

MemberSchema.statics.getAllMemberList = async function (payload) {
  return await this.find();
};

module.exports = mongoose.model("member", MemberSchema);
