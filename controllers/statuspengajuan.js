const { StatusPengajuan } = require("../models/index");
const { Sequelize, Op } = require("sequelize");
const { getPagingData, getPagination } = require("../helper/pagination");

class PengajuanController {
  static getPengajuan(req, res, next) {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);
    StatusPengajuan.findAll()
      .then((data) => {
        // console.log(data.username, "ini datanya")
        // res.status(201).json(data);
        StatusPengajuan.findAndCountAll({ limit, offset })
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
  static addPengajuan(req, res, next) {
    console.log(req, "request");
    let input = {
      nama_pengajuan: req.body.nama_pengajuan,
    };
    console.log(input, "input");
    StatusPengajuan.create(input)
      .then((data) => {
        // console.log(data.username, "ini datanya")
        res.status(201).json({
          msg: "sukses menambahkan Pengajuan",
          nama_pengajuan: data.nama_pengajuan,
        });
      })
      .catch((err) => {
        console.log(err, "error");
        next(err);
        // console.log(err)
      });
  }
  static editPengajuan(req, res, next) {
    console.log(req.params.id, "id");
    let id = req.params.id;
    let input = {
      nama_pengajuan: req.body.nama_pengajuan,
    };
    console.log(input, "input");
    StatusPengajuan.update(input, { where: { id }, returning: true })
      .then((data) => {
        console.log(data[1][0].oldTitle, "dari controller");
        if (data[0] === 1) {
          // console.log(data, "berhasil")
          res.status(201).json({
            message: "Berhasil memperbaharui data",
            Pengajuan: data,
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
  static deletePengajuan(req, res, next) {
    let id = req.params.id;
    StatusPengajuan.destroy({ where: { id }, returning: true })
      .then((data) => {
        // console.log(data)
        if (data) {
          res.status(200).json({
            message: "Data Pengajuan berhasil dihapus",
          });
        } else {
          throw { name: "DataTidakDitemukan", id };
        }
      })
      .catch((err) => next(err));
  }

  static getPengajuanById(req, res, next) {
    let id = req.params.id;
    StatusPengajuan.findOne({ where: { id }, returning: true })
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
}

module.exports = PengajuanController;
