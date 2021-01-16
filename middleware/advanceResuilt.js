const advanceResuilt = (model, populate) => async (req, res, next) => {
  let query;

  //Copy request.query
  let queryStr = { ...req.query };
  const removeField = ["select", "sort", "page", "limit"];
  removeField.forEach((item) => delete queryStr[item]);
  // console.log(queryStr);
  //Create Operator
  queryStr = JSON.stringify(queryStr).replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //Find JSON with sort
  query = model.find(JSON.parse(queryStr));

  if (populate) {
    query.populate(populate);
  }
  // query select
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  // query sort
  if (req.query.sort) {
    const fields = req.query.sort.split(",").join(" ");
    query = query.sort(fields);
  } else {
    query = query.sort("-createdAt");
  }
  //page
  let page = parseInt(req.query.page, 10) || 1;

  //limit
  let limit = parseInt(req.query.limit, 10) || 25;

  let startIndex = (page - 1) * limit;

  let endIndex = page * limit;

  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);
  //pagination resuilt
  const pagination = {};

  if (endIndex < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.pre = { page: page - 1, limit };
  }

  const resuilt = await query;
  res.advanceResuilt = {
    success: true,
    count: resuilt.length,
    pagination,
    data: resuilt,
  };
  next();
};

module.exports = advanceResuilt;
