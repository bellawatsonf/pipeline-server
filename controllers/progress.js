const { getPagingData, getPagination } = require("../helper/pagination");
const { Progress } = require("../models/index");
const { Sequelize, Op } = require("sequelize");

class ProgressController {
  static getProgress(req, res, next) {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);
    Progress.findAll()
      .then((data) => {
        // console.log(data.username, "ini datanya")
        // res.status(201).json(data);
        Progress.findAndCountAll({ limit, offset })
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
  static addProgress(req, res, next) {
    console.log(req, "request");
    let input = {
      nama_progress: req.body.nama_progress,
    };
    console.log(input, "input");
    Progress.create(input)
      .then((data) => {
        // console.log(data.username, "ini datanya")
        res.status(201).json({
          msg: "sukses menambahkan progress",
          nama_progress: data.nama_progress,
        });
      })
      .catch((err) => {
        console.log(err, "error");
        next(err);
        // console.log(err)
      });
  }
  static editProgress(req, res, next) {
    console.log(req.params.id, "id");
    let id = req.params.id;
    let input = {
      nama_progress: req.body.nama_progress,
    };
    console.log(input, "input");
    Progress.update(input, { where: { id }, returning: true })
      .then((data) => {
        console.log(data[1][0].oldTitle, "dari controller");
        if (data[0] === 1) {
          // console.log(data, "berhasil")
          res.status(201).json({
            message: "Berhasil memperbaharui data",
            Progress: data,
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
  static deleteProgress(req, res, next) {
    let id = req.params.id;
    Progress.destroy({ where: { id }, returning: true })
      .then((data) => {
        // console.log(data)
        if (data) {
          res.status(200).json({
            message: "Data Progress berhasil dihapus",
          });
        } else {
          throw { name: "DataTidakDitemukan", id };
        }
      })
      .catch((err) => next(err));
  }
  static getProgressById(req, res, next) {
    let id = req.params.id;
    Progress.findOne({ where: { id }, returning: true })
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

module.exports = ProgressController;
