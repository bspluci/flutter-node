const Member = require("../../models/Member"); // Member model 불러오기
const router = require("express").Router();
const auth = require("../../middleware/auth");
const multerUpload = require("../../middleware/multerUpload");
const util = require("../../functions/utils");

router.get("/getMemberList", async (req, res) => {
  await Member.getAllMemberList()
    .then((data) => {
      res.status(200).send({ ...util.codeOk, ...{ data } });
    })
    .catch(({ code, status, message }) => {
      code ? res.status(status).send({ code, status, message }) : res.status(500).send(util.codeErr);
    });
});

router.get("/updateMember", async (req, res) => {
  await Member.updateMember(req.query)
    .then((data) => {
      res.status(200).send({ ...util.codeOk, ...{ data } });
    })
    .catch(({ code, status, message }) => {
      code ? res.status(status).send({ code, status, message }) : res.status(500).send(util.codeErr);
    });
});

module.exports = router;
