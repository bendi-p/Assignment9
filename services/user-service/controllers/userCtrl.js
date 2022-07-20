var mongoose = require("mongoose");
var userSchema = require("../../../schema/User");
const bcrypt = require("bcrypt");

function createUser(req, res) {
  try {
    if (!req.body.email) {
      throw new Error("Email id is required");
    }
    if (!req.body.email.includes("@northeastern.edu")) {
      throw new Error ("Please enter a valid northeastern email id");
    }
    if (!req.body.password) {
      throw new Error("Password is required");
    }
    if (req.body.password.length < 8) {
      throw new Error ("Password length should be minimum 8 characters");
    }
    
    var smallPresent = false;
    var blockPresent = false;
    var numPresent = false;
    var splPresent = false;
    var splCharFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    for (let i = 0; i < req.body.password.length; i++) {
      var char = req.body.password.charAt(i);
      if (char === char.toLowerCase() && isNaN(char * 1)) {
        smallPresent = true;
      }
      if (char === char.toUpperCase() && isNaN(char * 1)) {
        blockPresent = true;
      }
      if (!isNaN(char * 1)) {
        numPresent = true;
      }
    }

    if (splCharFormat.test(req.body.password)) {
      splPresent = true;
    }

    if (!smallPresent) {
      throw new Error ("Password must contain atleast 1 small letter");
    }

    if (!blockPresent) {
      throw new Error ("Password must contain atleast 1 block letter");
    }

    if (!numPresent) {
      throw new Error ("Password must contain atleast 1 number");
    }

    if (!splPresent) {
      throw new Error ("Password must contain atleast 1 special character");
    }

    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err, "err while hashing password");
        return res.status(500).json({
          success: false,
          error_message: err,
        });
      } else {
        console.log(hash, "hash");
        userSchema
          .create({
            email: req.body.email,
            password_hash: hash
          })
          .then((new_user) => {
            console.log(new_user, "user created");
            return res.status(200).json({
              success: true,
              new_user,
              message: "User created successfully!",
            });
          })
          .catch((err) => {
            console.log(err, "err while creating user");
            return res.status(500).json({
              success: false,
              error_message: err,
            });
          });
      }
    });
  } catch (err) {
    console.log(err, "err caught");
    return res.status(500).json({
      success: false,
      error_message: err.message,
    });
  }
}

function deleteUser(req, res) {
  try {
    if (!req.query.email) {
      throw new Error("email is required");
    }

    if (!req.query.email.includes("@northeastern.edu")) {
      throw new Error ("Please enter a valid Northeastern email id");
    }

    if (!req.query.password) {
      throw new Error ("password is required");
    }

    console.log(req.query.email, "email");

    userSchema.findOne({
      email: req.query.email
    }).then((user) => {
          console.log(user, 'user');
          
          if (user) {
            var password_true = bcrypt.compareSync(req.query.password, user.password_hash);
            if (password_true) {
              userSchema
              .findOneAndDelete(
                {
                  email: req.query.email
                }
              )
              .then((deleted_user) => {
                console.log(deleted_user, "deleted user");
                return res.status(200).json({
                  success: true,
                  message: "User deleted successfully!",
                });
              })
              .catch((err) => {
                console.log(err, "err while deleting user");
                return res.status(500).json({
                  success: false,
                  error_message: err,
                });
              });
            } else {
              return res.status(500).json({
                success: false,
                error_message: "Incorrect username/password"
              })
            }
          } else {
            return res.status(500).json({
              success: false,
              error_message: "User not found!"
            })
          }
      }).catch(err => {
          console.log(err, 'err while fetching user');
          return res.status(500).json({
              success: false,
              error_message: err
          })
      })

  } catch (err) {
    console.log(err, "err caught");
    return res.status(500).json({
      success: false,
      error_message: err.message,
    });
  }
}

function updateUser(req, res) {

    try {

      if (!req.body.email) {
        throw new Error ("Email is required");
      }

      if (req.body.email) {
        if (req.body.email.includes("@northeastern.edu")) {
          // update_user["email"] = req.body.email;
        } else {
          throw new Error ("Please enter a valid Northeastern email id");
        }
    }

      if (!req.body.password) {
        throw new Error ("Password is required");
      }

      if (!req.body.new_password) {
        throw new Error ("New password is required");
      }

      userSchema.findOne({
        email: req.body.email
      }).then((user) => {
            console.log(user, 'user');
            
            if (user) {
              var password_true = bcrypt.compareSync(req.body.password, user.password_hash);
              if (password_true) {
                var update_user = {};

                if (req.body.new_password) {
                    if (req.body.new_password.length < 8) {
                      return res.status(500).json({
                        success: false,
                        error_message: "Password length should be minimum 8 characters"
                      })
                    }
                    
                    var smallPresent = false;
                    var blockPresent = false;
                    var numPresent = false;
                    var splPresent = false;
                    var splCharFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                    for (let i = 0; i < req.body.new_password.length; i++) {
                      var char = req.body.new_password.charAt(i);
                      if (char == char.toLowerCase()) {
                        smallPresent = true;
                      }
                      if (char == char.toUpperCase()) {
                        blockPresent = true;
                      }
                      if (!isNaN(char * 1)) {
                        numPresent = true;
                      }
                    }
                
                    if (splCharFormat.test(req.body.new_password)) {
                      splPresent = true;
                    }
                
                    if (!smallPresent) {
                      return res.status(500).json({
                        success: false,
                        error_message: "Password must contain atleast 1 lower case letter"
                      });
                    }
                
                    if (!blockPresent) {
                      return res.status(500).json({
                        success: false,
                        error_message: "Password must contain atleast 1 block letter"
                      });
                    }
                
                    if (!numPresent) {
                      return res.status(500).json({
                        success: false,
                        error_message: "Password must contain atleast 1 number"
                      });
                    }
                
                    if (!splPresent) {
                      return res.status(500).json({
                        success: false,
                        error_message: "Password must contain atleast 1 special character"
                      });
                    }
                    const saltRounds = 10;
                    update_user["password_hash"] = bcrypt.hashSync(req.body.new_password, saltRounds);
                }
        
                userSchema.findOneAndUpdate({email: req.body.email}, update_user).then((updated_user) => {
                    console.log(updated_user, 'user')
                    if (updated_user == null) {
                      return res.status(500).json({
                        success: false,
                        error_message: "User not found"
                      })
                    } else {
                      return res.status(200).json({
                          success: true,
                          message: "User updated successfully!",
                      })
                    }
                }).catch(err => {
                    console.log(err, 'err while updating user');
                    return res.status(500).json({
                        success: false,
                        error_message: err
                    })
                })
              } else {
                return res.status(500).json({
                  success: false,
                  error_message: "Incorrect username/password"
                })
              }
            } else {
              return res.status(500).json({
                success: false,
                error_message: "User not found!"
              })
            }
        }).catch(err => {
            console.log(err, 'err while fetching user');
            return res.status(500).json({
                success: false,
                error_message: err
            })
        })

    } catch (err) {
        console.log(err, 'err caught');
        return res.status(500).json({
            success: false,
            error_message: err.message
        })
    }
}

function getAllUsers(req, res) {

    try {

        userSchema.find().then(users => {
            console.log(users, 'users');
            return res.status(200).json({
                success: true,
                users
            })
        }).catch(err => {
            console.log(err, 'err while getting users');
            return res.status(500).json({
                success: false.valueOf,
                error_message: err
            })
        })

    } catch (err) {
        console.log(err, 'err caught');
        return res.status(500).json({
            success: false,
            error_message: err.message
        })
    }

}

function login(req, res) {

  try {

    if (!req.body.email) {
      throw new Error ("Email is required");
    }

    if (!req.body.password) {
      throw new Error ("Password is required");
    }

    userSchema.findOne({
      email: req.body.email
    }).then((user) => {
          console.log(user, 'user');
          
          if (user) {
            var password_true = bcrypt.compareSync(req.body.password, user.password_hash);
            if (password_true) {
              return res.status(200).json({
                success: true,
                user
              })
            } else {
              return res.status(500).json({
                success: false,
                error_message: "Incorrect username/password"
              })
            }
          } else {
            return res.status(500).json({
              success: false,
              error_message: "User not found!"
            })
          }
      }).catch(err => {
          console.log(err, 'err while fetching user');
          return res.status(500).json({
              success: false,
              error_message: err
          })
      })

  } catch (err) {
    console.log(err, 'err caught');
    return res.status(500).json({
      success: false,
      error_message: err.message
    });
  }

}

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  login
};
