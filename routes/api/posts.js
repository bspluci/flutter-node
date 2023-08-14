const Post = require("../../models/Post");
const router = require("express").Router();
const auth = require("../../middleware/auth");
const util = require("../../functions/utils");
const formidable = require("formidable");
const multerUpload = require("../../middleware/multerUpload");

router.get("/getAllPostList", async (req, res) => {
  await Post.getAllPostList(req.query)
    .then((data) => {
      res.status(200).send({ ...util.codeOk, ...{ data } });
    })
    .catch(({ code, status, message }) => {
      code ? res.status(status).send({ code, status, message }) : res.status(500).send(util.codeErr);
    });
});

router.post("/uploadPost", multerUpload.single("image"), async (req, res) => {
  if (req.fileValidationError) {
    return res.status(404).send({ code: "upload file limits", status: 404, message: req.fileValidationError });
  }

  await Post.updatePost(req.body, req.file)
    .then((data) => {
      res.status(200).send({ ...util.codeOk, ...{ data } });
    })
    .catch(({ code, status, message }) => {
      code ? res.status(status).send({ code, status, message }) : res.status(500).send(util.codeErr);
    });
});

router.get("/postImages/:image", async (req, res) => {
  res.status(200).sendFile(process.env.PWD + `/assets/postImages/${req.params.image}`);
});

module.exports = router;
