var jwt = require("jsonwebtoken");
const {
  Pegawai,
  Sector,
  Progress,
  StatusPengajuan,
} = require("../models/index.js");

const authentication = (req, res, next) => {
  console.log(req, "headertokenn");
  if (!req.headers.token) {
    res.status(400).json({
      message: "Please Login First",
    });
  }
  try {
    var decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY);
    req.nip = decoded.nip;
    req.level = decoded.level;
    req.id = decoded.id;
    console.log(decoded, "======");

    Pegawai.findOne({ where: { nip: req.nip } }).then((data) => {
      if (data) {
        next(); // proses melanjutkan yg dirouter yaitu category dan news
      } else {
        throw { name: "DataTidakDitemukan" };
      }
    });
  } catch (err) {
    console.log(err, "eror");
    next(err);
  }
};

const authorizeSektor = (req, res, next) => {
  const id = req.params.id;
  console.log(id, "id params");
  // console.log(req.userId)
  Sector.findOne({ where: { id } })
    .then((data) => {
      // console.log(data)
      if (!data) next({ name: "DataTidakDitemukan", id });
      else {
        // console.log(req.level,"dsdsd")
        if (req.level === "admin" || req.level === "super admin") {
          next();
        } else {
          // console.log(data.authorId, req.userId)
          if (data.authorId === req.userId) {
            next();
          } else {
            throw { name: "NotAuthorized" };
          }
        }
      }
    })
    .catch((err) => next(err));
};

const authorizeGetSektor = (req, res, next) => {
  const id = req.params.id;
  console.log(req, "request");
  // console.log(req.userId)
  Sector.findAll()
    .then((data) => {
      // console.log(data)
      if (data) {
        // res.status(200).json({Sektor:data})
        if (req.level === "admin" || req.level === "super admin") {
          next();
        } else {
          // console.log(err);
          // res.status(403).json({
          //   msg: "not authorize",
          // });
          throw { name: "NotAuthorized" };
        }
      } else {
        throw { name: "DataTidakDitemukan" };
      }
    })
    .catch((err) => next(err));
};

const authorizeProgress = (req, res, next) => {
  const id = req.params.id;
  console.log(req, "request");
  // console.log(req.userId)
  Progress.findAll()
    .then((data) => {
      // console.log(data)
      if (data) {
        // res.status(200).json({Sektor:data})
        if (req.level === "admin" || req.level === "super admin") {
          next();
        } else {
          // console.log(err);
          // res.status(403).json({
          //   msg: "not authorize",
          // });
          throw { name: "NotAuthorized" };
        }
      } else {
        throw { name: "DataTidakDitemukan" };
      }
    })
    .catch((err) => next(err));
};

const authorizeStatusPengajuan = (req, res, next) => {
  const id = req.params.id;
  console.log(req, "request");
  // console.log(req.userId)
  StatusPengajuan.findAll()
    .then((data) => {
      // console.log(data)
      if (data) {
        // res.status(200).json({Sektor:data})
        if (req.level === "admin" || req.level === "super admin") {
          next();
        } else {
          // console.log(err);
          // res.status(403).json({
          //   msg: "not authorize",
          // });
          throw { name: "NotAuthorized" };
        }
      } else {
        throw { name: "DataTidakDitemukan" };
      }
    })
    .catch((err) => next(err));
};

const authorizeGroup = (req, res, next) => {
  const id = req.params.id;
  console.log(req, "request");
  // console.log(req.userId)
  Group.findAll()
    .then((data) => {
      // console.log(data)
      if (data) {
        // res.status(200).json({Sektor:data})
        if (req.level === "admin" || req.level === "super admin") {
          next();
        } else {
          // console.log(err);
          // res.status(403).json({
          //   msg: "not authorize",
          // });
          throw { name: "NotAuthorized" };
        }
      } else {
        throw { name: "DataTidakDitemukan" };
      }
    })
    .catch((err) => next(err));
};

const authorizePegawai = (req, res, next) => {
  const id = req.params.id;
  console.log(req, "request");
  // console.log(req.userId)
  Pegawai.findAll()
    .then((data) => {
      // console.log(data)
      if (data) {
        // res.status(200).json({Sektor:data})
        if (req.level === "admin" || req.level === "super admin") {
          next();
        } else {
          // console.log(err);
          // res.status(403).json({
          //   msg: "not authorize",
          // });
          throw { name: "NotAuthorized" };
        }
      } else {
        throw { name: "DataTidakDitemukan" };
      }
    })
    .catch((err) => next(err));
};

module.exports = {
  authentication,
  authorizeSektor,
  authorizeStatusPengajuan,
  authorizeProgress,
  authorizePegawai,
  authorizeGetSektor,
  authorizeGroup,
};
