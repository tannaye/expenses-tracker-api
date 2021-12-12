import jwt from "jsonwebtoken";
import mongodb from "mongodb";

/// Make sure you cross check this and set it up to your style and how you use JWT
const isAuth = async (req, res, next) => {
  const { ObjectID } = mongodb;
  const authHeader = req.headers.authorization;

  if (
    (authHeader && authHeader.split(" ")[0] === "Token") ||
    (authHeader && authHeader.split(" ")[0] === "Bearer")
  ) {
    const token = authHeader.split(" ")[1];
    try {
      let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (!decodedToken._doc._id) {
        return res.status(401).json({
          error: "true",
          message: "token expired",
        });
      }

      req.currentUser = decodedToken._doc;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        error: "true",
        message: "Invalid authorization header",
      });
    }
  } else {
    return res.status(401).json({
      error: "true",
      message: "Access denied! No token provided",
    });
  }
};

export default isAuth;
