const { Sector } = require("../models/index");
const { Sequelize, Op } = require("sequelize");
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};
class SektorController {
  static getSektor(req, res, next) {
    console.log(req, "req");
    const { page, size, title } = req.query;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    const { limit, offset } = getPagination(page, size);
    Sector.findAll()
      .then((data) => {
        Sector.findAndCountAll({ limit, offset })
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
  static addSektor(req, res, next) {
    console.log(req, "request");
    let input = {
      nama_sector: req.body.nama_sector,
    };
    console.log(input, "input");
    Sector.create(input)
      .then((data) => {
        // console.log(data.username, "ini datanya")
        res.status(201).json({
          msg: "sukses menambahkan sektor",
          nama_sector: data.nama_sector,
        });
      })
      .catch((err) => {
        console.log(err, "error");
        next(err);
        // console.log(err)
      });
  }
  static editSektor(req, res, next) {
    console.log(req.params.id, "id");
    let id = req.params.id;
    let input = {
      nama_sector: req.body.nama_sector,
    };
    console.log(input, "input");
    Sector.update(input, { where: { id }, returning: true })
      .then((data) => {
        console.log(data[1][0].oldTitle, "dari controller");
        if (data[0] === 1) {
          // console.log(data, "berhasil")
          res.status(201).json({
            message: "Berhasil memperbaharui data",
            Sektor: data,
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

  static deleteSektor(req, res, next) {
    let id = req.params.id;
    Sector.destroy({ where: { id }, returning: true })
      .then((data) => {
        // console.log(data)
        if (data) {
          res.status(200).json({
            message: "Data sektor berhasil dihapus",
          });
        } else {
          throw { name: "DataTidakDitemukan", id };
        }
      })
      .catch((err) => next(err));
  }

  static getSektorById(req, res, next) {
    let id = req.params.id;
    Sector.findOne({ where: { id }, returning: true })
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

module.exports = SektorController;
