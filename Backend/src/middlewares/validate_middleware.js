export const userLoginValidate = (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    res.status(400).json({ error: "Bad Request" });
  }

  next();
};
