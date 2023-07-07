const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

function signUp(req, res) {
  const user = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.params.email,
    password: req.body.password,
  };
  const schema = {
    nom: { type: "string", optional: false, max: 20 },
    prenom: { type: "string", optional: false, max: 20 },
    email: { type: "email", optional: false, max: 30 },
    password: { type: "string", optional: false, min: 6 },
  };

  const v = new Validator();
  const validationResponse = v.validate(user, schema);

  if (validationResponse !== true) {
    return res.status(400).json({
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.Apprenant.findOne({ where: { email: req.params.email } })
    .then((result) => {
      if (result) {
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(req.body.password, salt, function (err, hash) {
            const userData = {
              name: req.body.nom,
              role: "apprenant",
            };
            models.Users.create(userData)
              .then((result) => {
                const user = {
                  nom: req.body.nom,
                  prenom: req.body.prenom,
                  email: req.params.email,
                  role: "apprenant",
                  userId: result.id,
                  password: hash,
                };
                models.Apprenant.create(user)
                  .then((userResult) => {
                    res.status(201).json({
                      message: "User created successfully",
                      TableUsers: result,
                      TableApprenant: userResult,
                    });
                  })
                  .catch((err) => {
                    res.status(500).json({
                      message: "Error",
                      error: err,
                    });
                  });
              })

              .catch((err) => {
                res.status(500).json({
                  message: "Error",
                  error: err,
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error",
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
      message: "Validation failed",
      errors: validationResponse,
    });
  }

  models.Apprenant.findOne({
    where: { email: req.body.email },
    include: {
      model: models.Users,
      as: "User",
    },
  })
    .then((user) => {
      if (user === null) {
        return res.status(401).json({
          message: "Invalid email",
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
                  apprenantId: user.id,
                  roleAp: user.role,
                  name: user.User.name,
                  role: user.User.role,
                },
                "secret",
                function (err, token) {
                  console.log({
                    email: user.email,
                    userId: user.User.id,
                    apprenantId: user.id,
                    roleAp: user.role,
                    name: user.User.name,
                    role: user.User.role,
                  });

                  res.status(200).json({
                    message: "Login successful",
                    token: token,
                  });
                }
              );
            } else {
              return res.status(401).json({
                message: "Invalid password",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    });
}

module.exports = {
  signUp: signUp,
  login: login,
};
