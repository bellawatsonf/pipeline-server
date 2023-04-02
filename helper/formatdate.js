const FormatDate = (data) => {
  date = new Date("2013-08-03T02:00:00Z");
  year = date.getFullYear();
  month = date.getMonth() + 1;
  dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  console.log(year + "-" + month + "-" + dt);
  return year + "-" + month + "-" + dt;
};

module.exports = FormatDate;
