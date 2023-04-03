const router = require("express").Router();
var jwt = require("jsonwebtoken");
const {
  Pipeline,
  Pegawai,
  Group,
  Progress,
  StatusPengajuan,
  Sector,
} = require("../models/index");
const { decrypt } = require("../helper/bcrypt");
const { getPagingData, getPagination } = require("../helper/pagination");

const { Sequelize, Op } = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../models/index.js");
const FormatDate = require("../helper/formatdate");
const moment = require("moment/moment");
db.query = { query } = db.sequelize;

class PegawaiController {
  static getPipelineUser(req, res, next) {
    let id = req.id;
    console.log(id, "idgetpipeline");
    const { page, size, nama_nasabah, waktu_awal, filter_tahun } = req.query;
    console.log(filter_tahun, "waktuawal");
    let year = filter_tahun ? filter_tahun : filter_tahun;
    let year2 =
      filter_tahun || filter_tahun !== ""
        ? filter_tahun
        : new Date().getFullYear();
    let bulan = waktu_awal === "all" ? "01" : waktu_awal;
    let bulan2 = waktu_awal === "all" ? "12" : waktu_awal;
    let startdate = `${year}-${bulan}-01`;
    let enddate = `${year2}-${bulan2}-31`;

    const { limit, offset } = getPagination(page, size);

    let opt = {
      include: [
        { model: Pegawai, include: [{ model: Group }] },
        { model: Progress },
        { model: StatusPengajuan },
        { model: Sector },
      ],
      limit,
      offset,
      where: {
        id_pegawai: id,
        status_archive: false,
        // createdAt: { [Op.between]: [waktu_awal, waktu_akhir] },
      },
      order: [["createdAt", "DESC"]],
    };

    if (nama_nasabah) {
      console.log(nama_nasabah, "datanamanasabah");
      opt.where.nama_nasabah = { [Op.iLike]: `%${nama_nasabah}%` };
    }
    if (waktu_awal || waktu_awal === "all" || filter_tahun) {
      opt.where.createdAt = {
        [Op.gte]: startdate,
        [Op.lte]: enddate,
      };
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
    const { page, size, nama_nasabah, waktu_awal, filter_tahun } = req.query;
    // console.log(waktu_awal.split("-")[1], "waktuawal");
    let year = filter_tahun ? filter_tahun : filter_tahun;
    let year2 =
      filter_tahun || filter_tahun !== ""
        ? filter_tahun
        : new Date().getFullYear();
    let bulan = waktu_awal === "all" ? "01" : waktu_awal;
    let bulan2 = waktu_awal === "all" ? "12" : waktu_awal;
    let startdate = `${year}-${bulan}-01`;
    let enddate = `${year2}-${bulan2}-31`;
    const { limit, offset } = getPagination(page, size);

    let opt = {
      include: [
        { model: Pegawai, include: [{ model: Group }] },

        { model: Progress },
        { model: StatusPengajuan },
        { model: Sector },
      ],
      limit,
      offset,
      where: {},
      order: [["createdAt", "DESC"]],
    };

    if (nama_nasabah) {
      console.log(nama_nasabah, "datanamanasabah");
      opt.where.nama_nasabah = { [Op.iLike]: `%${nama_nasabah}%` };
    }
    if (waktu_awal || waktu_awal === "all" || filter_tahun) {
      opt.where.createdAt = {
        [Op.gte]: startdate,
        [Op.lte]: enddate,
      };
    }
    // Pipeline.findAll({
    //   include: [
    //     { model: Pegawai },
    //     { model: Progress },
    //     { model: StatusPengajuan },
    //   ],
    // })
    Pipeline.findAll(opt)
      .then((data) => {
        // console.log(data.username, "ini datanya")
        // res.status(201).json(data);
        // Pipeline.findAndCountAll({
        //   include: [
        //     { model: Pegawai },
        //     { model: Progress },
        //     { model: StatusPengajuan },
        //   ],
        //   limit,
        //   offset,
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

  static async getPipelineDashboard(req, res, next) {
    // const { page, size, nama_nasabah } = req.query;
    // console.log(nama_nasabah, "namanasbaah");

    // const { limit, offset } = getPagination(page, size);

    // Pipeline.findAll({
    //   attributes: [
    //     [
    //       Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("tgl_proyeksi")),
    //       "production_to_month",
    //     ],
    //     [Sequelize.fn("SUM", Sequelize.col("nominal_cair")), "total"],
    //     [Sequelize.col("Pegawai.nama_pegawai"), "nama_pegawai"],
    //     [Sequelize.col("Pegawai.Group.nama_pegawai"), "nama_pegawai"],
    //   ],
    //   include: [
    //     {
    //       model: Pegawai,
    //       attributes: [[Sequelize.col("Group.nama_group"), "nama_group"]],
    //       as: "Pegawai",
    //       include: [
    //         {
    //           model: Group,
    //           as: "Group",
    //         },
    //       ],
    //     },
    //   ],
    //   where: {
    //     [Op.and]: [
    //       Sequelize.where(
    //         Sequelize.fn("date_part", "year", Sequelize.col("tgl_proyeksi")),
    //         Sequelize.fn("date_part", "year", Sequelize.fn("NOW"))
    //       ),
    //     ],
    //   },
    //   group: [
    //     Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("tgl_proyeksi")),
    //     Sequelize.col("Pegawai.id"),
    //     Sequelize.col("Pegawai.Group.nama_group"),
    //   ],

    //   limit,
    //   offset,
    // })
    //   .then((data) => {
    //     // console.log(data, "ini datanya");
    //     // res.send(data);

    //     Pipeline.findAndCountAll({
    //       attributes: [
    //         [
    //           Sequelize.fn(
    //             "DATE_TRUNC",
    //             "month",
    //             Sequelize.col("tgl_proyeksi")
    //           ),
    //           "production_to_month",
    //         ],
    //         [Sequelize.fn("SUM", Sequelize.col("nominal_cair")), "total"],
    //         [Sequelize.col("Pegawai.nama_pegawai"), "nama_pegawai"],
    //       ],
    //       include: [
    //         {
    //           model: Pegawai,
    //           as: "Pegawai",
    //         },
    //       ],
    //       where: {
    //         [Op.and]: [
    //           Sequelize.where(
    //             Sequelize.fn(
    //               "date_part",
    //               "year",
    //               Sequelize.col("tgl_proyeksi")
    //             ),
    //             Sequelize.fn("date_part", "year", Sequelize.fn("NOW"))
    //           ),
    //         ],
    //       },
    //       group: [
    //         Sequelize.fn("DATE_TRUNC", "month", Sequelize.col("tgl_proyeksi")),
    //         Sequelize.col("Pegawai.id"),
    //       ],

    //       limit,
    //       offset,
    //     })
    //       .then((data) => {
    //         console.log(data, "datapipelinedashboard");
    //         const response = getPagingData(data, page, limit);
    //         res.send(response);
    //       })
    //       .catch((err) => {
    //         res.status(500).send({
    //           message:
    //             err.message ||
    //             "Some error occurred while retrieving tutorials.",
    //         });
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err, "error");
    //     next(err);
    //     // console.log(err)
    //   });

    const data = await db.sequelize
      .query(
        `SELECT n2.nama_pegawai, n2.id,n2.nama_group,DATE_TRUNC('month',pp.tgl_proyeksi) AS  production_to_month,SUM(pp.nominal_cair) as total FROM "Pipelines" as pp inner join (select Pg.id, Pg.nama_pegawai, Gr.nama_group,Pg.group_id from "Pegawais" as Pg INNER JOIN "Groups" as Gr ON Gr.id= Pg.group_id) n2 ON n2.id = pp.id_pegawai WHERE date_part('year', pp.tgl_proyeksi) = date_part('year', CURRENT_DATE) GROUP BY DATE_TRUNC('month',pp.tgl_proyeksi), n2.id,n2.nama_pegawai,n2.nama_group`,
        {
          type: db.sequelize.QueryTypes.SELECT,
        }
      )
      .then((data) => {
        console.log(data, "ini datanya");
        res.send(data);
      })
      .catch((err) => {
        console.log(err, "error");
        next(err);
        // console.log(err)
      });

    console.log(data, "dataquery");
  }

  static async getPipelineGroup(req, res, next) {
    let data = await db.sequelize
      .query(
        `SELECT n2.nama_pegawai, n2.id,n2.initial_group,
          SUM(pp.nominal_cair) as total FROM "Pipelines" as pp 
          inner join (select Pg.id, Pg.nama_pegawai, Gr.nama_group,Gr.initial_group,Pg.group_id from "Pegawais" as Pg
          INNER JOIN "Groups" as Gr 
          ON Gr.id= Pg.group_id) n2 
          ON n2.id = pp.id_pegawai 
          WHERE date_part('year', pp.tgl_proyeksi) = date_part('year', CURRENT_DATE)
          GROUP BY  n2.id,n2.nama_pegawai ,n2.initial_group`,
        {
          type: db.sequelize.QueryTypes.SELECT,
        }
      )
      .then((data) => {
        res.send(data);
      })
      .catch((e) => {
        next(e);
      });
  }
  static addPipeline(req, res, next) {
    console.log(req, "request");
    let input = {
      nama_nasabah: req.body.nama_nasabah,
      id_pengajuan: req.body.id_pengajuan,
      tgl_RKP_A: req.body.tgl_RKP_A,
      tgl_RKP_B: req.body.tgl_RKP_B,
      nominal_cair: req.body.nominal_cair,
      tgl_proyeksi: req.body.tgl_proyeksi,
      id_pegawai: req.body.id_pegawai,
      id_sector: req.body.id_sector,
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
      nominal_cair: req.body.nominal_cair,
      tgl_proyeksi: req.body.tgl_proyeksi,
      id_pegawai: req.body.id_pegawai,
      id_progress: req.body.id_progress,
      id_sector: req.body.id_sector,
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
