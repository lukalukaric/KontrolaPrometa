const dotenv = require("dotenv");
var UserModel = require("../models/UserModel.js");
const jwt = require("jsonwebtoken");
const cheerio = require("cheerio");
var request = require('request');                                               
var iconv = require('iconv');
/*
https://stackoverflow.com/questions/12326688/node-js-scrape-encoding/18712021
*/

class Information {
  title;
  p;
  constructor(title) {
    this.title = title;
  }
  setP(p) {
    this.p = p;
  }
}

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
dotenv.config();
module.exports = {
  /**
   * UserController.list()
   */
  list: function (req, res) {
    UserModel.find(function (err, Users) {
      console.log(Users);
      if (err) {
        return res.status(500).json({
          message: "Error when getting User.",
          error: err,
        });
      }
      return res.status(201).json(Users);
    });
  },
  scraperFunction: function (req, respond) {
    var scraper = new Array();
    request.get({                                                                   
      url: 'http://www.gorenjskiglas.si/promet',                                         
      encoding: null,                                                               
    }, function(err, res, body) {                                                   
      var ic = new iconv.Iconv('windows-1250', 'utf-8');                              
      var buf = ic.convert(body);                                                   
      var utf8String = buf.toString('utf-8');
        const $ = cheerio.load(utf8String, { decodeEntities: true });
        
        const urlElems = $("div");
        var counter = 0;
        for (let i = 0; i < urlElems.length; i++) {
          const urlSpan = $(urlElems[0]).find("h5")[i + 1];
          if (urlSpan) {
            const urlText = $(urlSpan).text();
            scraper.push(new Information(urlText));
            counter++;
          }
        }
  
        var counter2 = 0;
        var counterForInsert = 0;
        for (let i = 0; i < urlElems.length; i++) {
          const urlSpan1 = $(urlElems[0]).find("p")[i];
          const urlSpantext = $(urlSpan1).text();
          if (counter2 == 2 && counter != 0) {
            scraper[counterForInsert].p = urlSpantext;
            counterForInsert++;
            counter--;
          }
          if (counter2 == 1) {
            counter2++;
          }
          if (urlSpantext == "Vir: www.promet.si") {
            counter2++;
          }
        }
        return respond.status(201).json(scraper);

    });                                                      
    },
  /**
   * UserController.show()
   */
  findUserByToken: function (req, res) {
    const token = req.params.id;
    jwt.verify(token, process.env.TOKEN, (err, user) => {
      console.log(err);
      console.log(user);
      if (err) return res.sendStatus(403);

      req.user = user;
    });
    UserModel.findOne({ _id: req.user.id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }

      return res.json(user);
    });
  },
  show: function (req, res) {
    UserModel.authenticate(
      req.body.name,
      req.body.password,
      function (error, user) {
        if (error || !user) {
          var err = new Error("Wrong username or password");
          err.status = 401;
          return res.status(401).json({ success: false });
        } else {
          console.log(user.name);
          //return res.redirect("profile");

          var token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.TOKEN,
            {
              expiresIn: 86400, // expires in 24 hours
            }
          );
          /*
          jwt.verify(token, process.env.TOKEN, (err, user) => {
            console.log(err);
            console.log(user);
            if (err) return res.sendStatus(403);

            req.user = user;
          });
          */
          return res.status(201).json({ token: token, success: true });
        }
      }
    );
  },

  /**
   * UserController.create()
   */
  create: function (req, res) {
    console.log("noter");
    var User = new UserModel({
      name: req.body.name,
      email: req.body.email,
      lastname: req.body.lastname,
      age: req.body.age,
      password: req.body.pass,
    });
    console.log(req.body);
    UserModel.findOne({ email: req.body.email }, function (err, UserToFind) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error when getting User.",
          error: err,
        });
      }
      if (UserToFind == null) {
        User.save(function (err, User) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              message: "Error when creating User",
              error: err,
            });
          }

          return res.status(201).json({ success: true });
        });
      } else {
        return res.status(201).json({ success: false });
      }
    });
  },

  /**
   * UserController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    UserModel.findOne({ _id: id }, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting User",
          error: err,
        });
      }

      if (!User) {
        return res.status(404).json({
          message: "No such User",
        });
      }

      User.id_user = req.body.id_user ? req.body.id_user : User.id_user;
      User.name = req.body.name ? req.body.name : User.name;
      User.lastname = req.body.lastname ? req.body.lastname : User.lastname;
      User.age = req.body.age ? req.body.age : User.age;
      User.email = req.body.email ? req.body.email : User.email;

      User.save(function (err, User) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating User.",
            error: err,
          });
        }

        return res.json(User);
      });
    });
  },

  /**
   * UserController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    UserModel.findByIdAndRemove(id, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the User.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
