const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // 암호화 모듈
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const errorFun = require("../functions/utils").errorFun;

// Schema 생성
const PostSchema = new mongoose.Schema(
  {
    writer: {
      type: String,
      required: true,
    },
    writerId: {
      type: ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    like: {
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

PostSchema.statics.getAllPostList = async function (payload) {
  // 페이지 네이션
  const page = payload.page;
  const limit = payload.limit;
  const skip = (page - 1) * limit;
  const posts = await this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();

  return posts;
};

PostSchema.statics.updatePost = async function (payload, file) {
  if (!payload.id) payload.id = new mongoose.mongo.ObjectId();

  await this.findOneAndUpdate(
    { _id: payload.id },
    {
      $set: {
        writer: payload.writer,
        writerId: payload.memberId,
        title: payload.title,
        content: payload.content,
        like: 0,
        image: `http://172.20.59.28:8080/api/post/postImages/${file.filename}`,
      },
    },
    { new: true, upsert: true }
  );
};

module.exports = mongoose.model("post", PostSchema);
