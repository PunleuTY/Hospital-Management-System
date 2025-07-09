export const notFound = (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "Not Found",
  });
};
export const catchErrors = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
  next(err);
};
