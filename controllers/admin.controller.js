const moodels = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

function login(req, res) {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const schema = {
    email: { type: "email", optional: false },
    password: { type: "string", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(user, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  }

  moodels.Admin.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (user === null) {
        return res.status(401).json({
          message: "invalide email",
        });
      } else {
        bcryptjs.compare(
          req.body.password,
          user.password,

          function (err, result) {
            if (result) {
              const token = jwt.sign(
                {
                  email: user.email,
                  userId: user.id,
                  name: user.name,
                },
                "secret",
                function (err, token) {
                  console.log({
                    email: user.email,
                    userId: user.id,
                    name: user.name,
                  });

                  res.status(200).json({
                    message: "login succefuly",
                    token: token,
                  });
                }
              );
            } else {
              return res.status(401).json({
                message: "invalide password",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went wrong",
        erreur: err,
      });
    });
}

module.exports = {
  login: login,
};
