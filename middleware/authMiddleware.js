import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (!token) {
    return next(
      res.status(401).json({
        message: "tidak dapat mengakses halaman",
      })
    );
  }

  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(
      res.status(401).json({
        message: "token not found",
      })
    );
  }

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      res.status(401).json({
        message: "user tidak ada",
      })
    );
  }

  req.user = currentUser;

  next();
};

export const permisionUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        res.status(403).json({
          message: "role anda tidak dapat akses halaman ini",
        })
      );
    }

    next();
  };
};
