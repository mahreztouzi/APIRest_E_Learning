const moodels = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

function signUp(req, res) {
  const email = req.params.email;
  const user = {
    email: email,
    name: req.body.name,
    password: req.body.password,
  };
  const schema = {
    name: { type: "string", optional: false, max: 20 },
    email: { type: "email", optional: false, max: 30 },
    password: { type: "string", optional: false, min: 6 },
  };

  const v = new Validator();
  const validationResponse = v.validate(user, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      errors: validationResponse,
    });
  }

  moodels.Enseignant.findOne({ where: { email: email } })
    .then((result) => {
      if (result) {
        return res.status(409).json({
          message: "email already exists",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const userData = {
              name: req.body.name,
              role: "professeur",
            };
            moodels.Users.create(userData)
              .then((result) => {
                const user = {
                  name: req.body.name,
                  // email: req.body.email,
                  email: req.params.email,
                  userId: result.id,
                  password: hash,
                };
                moodels.Enseignant.create(user)
                  .then((userResult) => {
                    res.status(201).json({
                      message: "user created successfully",
                      TableUsers: result,
                      TableEnseigants: userResult,
                    });
                  })
                  .catch((err) => {
                    res.status(500).json({
                      message: "erreur",
                      error: err,
                    });
                  });
              })

              .catch((err) => {
                res.status(500).json({
                  message: "erreur",
                  error: err,
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "erreur",
        error: err,
      });
    });
}

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

  moodels.Enseignant.findOne({
    where: { email: req.body.email },
    include: {
      model: moodels.Users,
      as: "User",
    },
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
                  userId: user.User.id,
                  enseignantId: user.id,

                  name: user.User.name,
                  role: user.User.role,
                },
                "secret",
                function (err, token) {
                  console.log({
                    email: user.email,
                    userId: user.User.id,
                    enseignantId: user.id,

                    name: user.User.name,
                    role: user.User.role,
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
  signUp: signUp,
  login: login,
};
