export const success = (res, data, code = 200) => {
  res.status(code).json({
    success: true,
    data: data,
  });
};

export const fail = (res, message, code = 500) => {
  res.status(code).json({
    success: false,
    message: message,
  });
};
