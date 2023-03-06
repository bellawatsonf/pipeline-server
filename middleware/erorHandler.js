function errorHandler(err, req, res, next) {
  let status = 500;
  let errMessage = "Internal Server Error";
  console.log(err);

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      status = 400;
      errMessage = err.errors.map((el) => el.message);
      break;
    case "SequelizeValidationError":
      status = 400;
      errMessage = err.errors.map((el) => el.message);
      break;
    case "DataTidakValid":
      status = 401;
      errMessage = "invalid email or password ";
      break;
    case "DataTidakDitemukan":
      status = 404;
      errMessage = `data with id ${err.id} not found`;
      break;
    case "DataKosong":
      status = 404;
      errMessage = `Belum Ada Data Tersimpan`;
      break;
    case "InvalidAuthenticated":
      status = 404;
      errMessage = `Not Authenticated`;
      break;
    case "SizeImageError":
      status = 404;
      errMessage = `gambar terlalu besar`;
      break;
    case "NotAuthorized":
      status = 403;
      errMessage = `Not Authorized`;
      break;
    case "InvalidInput":
      status = 401;
      errMessage = `Id tidak tersedia`;
      break;
    default:
      break;
  }

  res.status(status).json({
    success: false,
    message: errMessage,
  });
}

module.exports = errorHandler;
