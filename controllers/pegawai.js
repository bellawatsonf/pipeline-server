const router = require("express").Router();
var jwt = require("jsonwebtoken");
const { Pegawai, Group } = require("../models/index");
const { decrypt } = require("../helper/bcrypt");
const { getPagingData, getPagination } = require("../helper/pagination");
const { Progress } = require("../models/index");
const { Sequelize, Op } = require("sequelize");

class PegawaiController {
  static getPegawai(req, res, next) {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);
    Pegawai.findAll({
      include: [{ model: Group }],
      where: {
        [Op.or]: [{ level: "user" }, { level: "admin" }],
      },
    })
      .then((data) => {
        // console.log(data.username, "ini datanya")
        // res.status(201).json(data);
        Pegawai.findAndCountAll({
          include: [{ model: Group }],
          limit,
          offset,
          where: {
            [Op.or]: [{ level: "user" }, { level: "admin" }],
          },
        })
          .then((data) => {
            const response = getPagingData(data, page, limit);
            res.send(response);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving tutorials.",
            });
          });
      })
      .catch((err) => {
        console.log(err, "error");
        next(err);
        // console.log(err)
      });
  }
  static addPegawai(req, res, next) {
    console.log(req, "request");
    let input = {
      nip: req.body.nip,
      nama_pegawai: req.body.nama_pegawai,
      posisi: req.body.posisi,
      group_id: req.body.group_id,
      level: req.body.level,
      password: "12345",
      lokasi: req.body.lokasi,
    };
    console.log(input, "input");
    Pegawai.create(input)
      .then((data) => {
        // console.log(data.nama_pegawai, "ini datanya")

        res.status(201).json({
          msg: "sukses melakukan register",
          nip: data.nip,
          id: data.id,
          token: jwt.sign(
            {
              nip: data.nip,
              level: data.level,
              nama_pegawai: data.nama_pegawai,
              id: data.id,
            },
            process.env.SECRET_KEY
          ),
        });
      })
      .catch((err) => {
        console.log(err, "error");
        next(err);
        // console.log(err)
      });
  }
  static editPegawai(req, res, next) {
    console.log(req.params.id, "id");
    let id = req.params.id;
    let input = {
      nip: req.body.nip,
      nama_pegawai: req.body.nama_pegawai,
      posisi: req.body.posisi,
      group_id: req.body.group_id,
      level: req.body.level,
      password: req.body.password,
      lokasi: req.body.lokasi,
    };
    console.log(input, "input");
    Pegawai.update(input, { where: { id }, returning: true })
      .then((data) => {
        console.log(data[1][0].oldTitle, "dari controller");
        if (data[0] === 1) {
          // console.log(data, "berhasil")
          res.status(201).json({
            message: "Berhasil memperbaharui data",
            Pegawai: data,
          });
          // let input ={
          //     description :`News with id ${data[1][0].id} updated`,
          //     name : data[1][0].title,
          //     authorId : req.userId,
          //     newsId : id
          // }
          // return History.create(input)
        } else {
          throw { name: "DataTidakDitemukan", id };
        }
      })

      .catch((err) => console.log(err));
  }

  static editPasswordPegawai(req, res, next) {
    console.log(req.params.id, "id");
    let id = req.params.id;
    let input = {
      password: req.body.password,
    };
    console.log(input, "input");
    Pegawai.update(input, { where: { id }, returning: true })
      .then((data) => {
        console.log(data[1][0].oldTitle, "dari controller");
        if (data[0] === 1) {
          // console.log(data, "berhasil")
          res.status(201).json({
            message: "Password has been change",
            Pegawai: data,
          });
          // let input ={
          //     description :`News with id ${data[1][0].id} updated`,
          //     name : data[1][0].title,
          //     authorId : req.userId,
          //     newsId : id
          // }
          // return History.create(input)
        } else {
          throw { name: "DataTidakDitemukan", id };
        }
      })

      .catch((err) => console.log(err));
  }
  static deletePegawai(req, res, next) {
    let id = req.params.id;
    Pegawai.destroy({ where: { id }, returning: true })
      .then((data) => {
        // console.log(data)
        if (data) {
          res.status(200).json({
            message: "Data Pegawai berhasil dihapus",
          });
        } else {
          throw { name: "DataTidakDitemukan", id };
        }
      })
      .catch((err) => next(err));
  }

  static getPegawaiById(req, res, next) {
    let id = req.params.id;
    Pegawai.findOne({
      include: [{ model: Group }],
      where: { id },
      returning: true,
    })
      .then((data) => {
        // console.log(data)
        if (data) {
          res.status(200).json({
            data,
          });
        } else {
          throw { name: "DataTidakDitemukan", id };
        }
      })
      .catch((err) => next(err));
  }
  static login(req, res, next) {
    const { nip, password } = req.body;

    Pegawai.findOne({ where: { nip } })
      .then((data) => {
        const checkHashedPassword = decrypt(password, data.password);
        if (data === null) {
          throw err;
        }
        if (data) {
          console.log(data, checkHashedPassword, "hasil");
          const token = jwt.sign(
            {
              nip: data.nip,
              nama_pegawai: data.nama_pegawai,
              level: data.level,
              id: data.id,
            },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            nama_pegawai: data.nama_pegawai,
            token,
            level: data.level,
            nip: data.nip,
            id: data.id,
          });
        } else {
          throw { name: "DataTidakValid" };
        }
      })
      .catch((err) => {
        console.log(err, "error");
        next(err);
      });
  }
}

module.exports = PegawaiController;
