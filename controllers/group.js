const { Group } = require("../models/index");
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
class GroupController {
  static getGroup(req, res, next) {
    console.log(req, "req");
    const { page, size, title } = req.query;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    const { limit, offset } = getPagination(page, size);
    Group.findAll()
      .then((data) => {
        Group.findAndCountAll({ limit, offset })
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
  static addGroup(req, res, next) {
    console.log(req, "request");
    let input = {
      nama_group: req.body.nama_group,
    };
    console.log(input, "input");
    Group.create(input)
      .then((data) => {
        // console.log(data.username, "ini datanya")
        res.status(201).json({
          msg: "sukses menambahkan Group",
          nama_mroup: data.nama_group,
        });
      })
      .catch((err) => {
        console.log(err, "error");
        next(err);
        // console.log(err)
      });
  }
  static editGroup(req, res, next) {
    console.log(req.params.id, "id");
    let id = req.params.id;
    let input = {
      nama_group: req.body.nama_group,
    };
    console.log(input, "input");
    Group.update(input, { where: { id }, returning: true })
      .then((data) => {
        console.log(data[1][0].oldTitle, "dari controller");
        if (data[0] === 1) {
          // console.log(data, "berhasil")
          res.status(201).json({
            message: "Berhasil memperbaharui data",
            Group: data,
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

  static deleteGroup(req, res, next) {
    let id = req.params.id;
    Group.destroy({ where: { id }, returning: true })
      .then((data) => {
        // console.log(data)
        if (data) {
          res.status(200).json({
            message: "Data Group berhasil dihapus",
          });
        } else {
          throw { name: "DataTidakDitemukan", id };
        }
      })
      .catch((err) => next(err));
  }

  static getGroupById(req, res, next) {
    let id = req.params.id;
    Group.findOne({ where: { id }, returning: true })
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

module.exports = GroupController;
