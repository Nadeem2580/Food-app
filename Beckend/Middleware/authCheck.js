import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isVerify = jwt.verify(token, process.env.PRIVATE_KEY);
    if (isVerify?.id) {
      req.user = isVerify;
      next();
    } else {
      res.json({
        message: "unAuthorization user",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    });
  }
};

export default authMiddleware;
