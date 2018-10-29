import express from "express";
import models from "../../models";

const Users = models.users;
const router = express.Router();

router.get("/", (req, res, next) => {
  Users.findAll().then(data => {
    console.log(JSON.stringify(data));
    res.status(200).send(JSON.stringify(data));
  });
});

router.get("/:id", (req, res, next) => {
  Users.findByID(req.params.id).then(data => {
    console.log(JSON.stringify(data));
    res.status(200).send(JSON.stringify(data));
  });
});

router.post("/", (req, res, next) => {
  Users.findOrCreate({
    where: { username: req.body.username },
    defaults: req.body
  }).spread((data, created) => {
    res.status(200).send(JSON.stringify(data.get({ plain: true })));
  });
});

router.put("/:id", (req, res, next) => {
  Users.update(req.body, { where: { id: req.params.id } }).then(data => {
    console.log(data);
  });
});

router.delete("/:id", (req, res, next) => {
  res.send("Delete  user by id");
});

export default router;
