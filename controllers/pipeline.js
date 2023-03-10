const router = require("express").Router();
var jwt = require("jsonwebtoken");
const {
  Pipeline,
  Pegawai,
  Group,
  Progress,
  StatusPengajuan,
} = require("../models/index");
const { decrypt } = require("../helper/bcrypt");
const { getPagingData, getPagination } = require("../helper/pagination");

const { Sequelize, Op } = require("sequelize");

class PegawaiController {
  static getPipelineUser(req, res, next) {
    let id = req.id;
    console.log(id, "idgetpipeline");
    const { page, size, nama_nasabah } = req.query;
    const { limit, offset } = getPagination(page, size);

    let opt = {
      include: [
        { model: Pegawai },
        { model: Progress },
        { model: StatusPengajuan },
      ],
      limit,
      offset,
      where: { id_pegawai: id, status_archive: false },
    };

    if (nama_nasabah) {
      opt.where.nama_nasabah = { [Op.iLike]: `%${nama_nasabah}%` };
    }

    // Pipeline.findAll({
    //   include: [
    //     { model: Pegawai },
    //     { model: Progress },
    //     { model: StatusPengajuan },
    //   ],
    //   where: {
    //     id_pegawai: id,
    //     status_archive: false,
    //     nama_nasabah: {
    //       [Op.like]: nama_nasabah,
    //     },
    //   },
    // })
    Pipeline.findAll(opt)
      .then((data) => {
        console.log(data.length, "ini datanya");
        // res.status(201).json(data);
        // Pipeline.findAndCountAll({
        //   include: [
        //     { model: Pegawai },
        //     { model: Progress },
        //     { model: StatusPengajuan },
        //   ],
        //   limit,
        //   offset,
        //   where: {
        //     id_pegawai: id,
        //     status_archive: false,
        //     nama_nasabah: {
        //       [Op.like]: nama_nasabah,
        //     },
        //   },
        // })
        Pipeline.findAndCountAll(opt)
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
  static getPipeline(req, res, next) {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);
    Pipeline.findAll({
      include: [
        { model: Pegawai },
        { model: Progress },
        { model: StatusPengajuan },
      ],
    })
      .then((data) => {
        // console.log(data.username, "ini datanya")
        // res.status(201).json(data);
        Pipeline.findAndCountAll({
          include: [
            { model: Pegawai },
            { model: Progress },
            { model: StatusPengajuan },
          ],
          limit,
          offset,
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
  static addPipeline(req, res, next) {
    console.log(req, "request");
    let input = {
      nama_nasabah: req.body.nama_nasabah,
      id_pengajuan: req.body.id_pengajuan,
      tgl_RKP_A: req.body.tgl_RKP_A,
      tgl_RKP_B: req.body.tgl_RKP_B,
      tgl_cair: req.body.tgl_cair,
      tgl_proyeksi_cair_rpm: req.body.tgl_proyeksi_cair_rpm,
      id_pegawai: req.body.id_pegawai,
      id_progress: req.body.id_progress,
      status_archive: req.body.status_archive,
      limit: req.body.limit,
    };
    console.log(input, "inputttt");
    Pipeline.create(input)
      .then((data) => {
        // console.log(data.nama_pegawai, "ini datanya")
        res.status(201).json({
          msg: "sukses menambahkan pipeline",
          Pipeline: data,
        });
      })
      .catch((err) => {
        console.log(err, "error");
        next(err);
        // console.log(err)
      });
  }
  static editPipeline(req, res, next) {
    console.log(req.params.id, "id");
    let id = req.params.id;
    let input = {
      nama_nasabah: req.body.nama_nasabah,
      id_pengajuan: req.body.id_pengajuan,
      tgl_RKP_A: req.body.tgl_RKP_A,
      tgl_RKP_B: req.body.tgl_RKP_B,
      tgl_cair: req.body.tgl_cair,
      tgl_proyeksi_cair_rpm: req.body.tgl_proyeksi_cair_rpm,
      id_pegawai: req.body.id_pegawai,
      id_progress: req.body.id_progress,
      status_archive: req.body.status_archive,
      limit: req.body.limit,
    };

    console.log(input, "input");

    // Pipeline.update(input, { where: { id }, returning: true })
    //   .then((data) => {
    //     console.log(data[1][0].oldTitle, "dari controller");
    //     if (data[0] === 1) {
    //       // console.log(data, "berhasil")
    //       res.status(201).json({
    //         message: "Berhasil memperbaharui data",
    //         Pipeline: data,
    //       });
    //       // let input ={
    //       //     description :`News with id ${data[1][0].id} updated`,
    //       //     name : data[1][0].title,
    //       //     authorId : req.userId,
    //       //     newsId : id
    //       // }
    //       // return History.create(input)
    //     } else {
    //       throw { name: "DataTidakDitemukan", id };
    //     }
    //   })

    //   .catch((err) => console.log(err));
    Pipeline.create(input)
      .then((data) => {
        // console.log(data.nama_pegawai, "ini datanya")
        res.status(201).json({
          msg: "sukses menambahkan pipeline",
          Pipeline: data,
        });
      })
      .catch((err) => {
        console.log(err, "error");
        next(err);
        // console.log(err)
      });
  }
  static deletePipeline(req, res, next) {
    let id = req.params.id;
    let input = {
      status_archive: true,
    };

    Pipeline.update(input, { where: { id }, returning: true }).then((data) => {
      console.log(data[1][0].oldTitle, "dari controller");
      if (data[0] === 1) {
        // console.log(data, "berhasil")
        res.status(201).json({
          message: "Berhasil memperbaharui data",
          Pipeline: data,
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
    });
    // Pipeline.destroy({ where: { id }, returning: true })
    //   .then((data) => {
    //     // console.log(data)
    //     if (data) {
    //       res.status(200).json({
    //         message: "Data Pegawai berhasil dihapus",
    //       });
    //     } else {
    //       throw { name: "DataTidakDitemukan", id };
    //     }
    //   })
    //   .catch((err) => next(err));
  }

  static deletePipelineAdmin(req, res, next) {
    let id = req.params.id;
    Pipeline.destroy({ where: { id }, returning: true })
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

  static getPipelineById(req, res, next) {
    let id = req.params.id;
    Pipeline.findOne({
      include: [
        { model: Pegawai },
        { model: Progress },
        { model: StatusPengajuan },
      ],

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
}

module.exports = PegawaiController;
