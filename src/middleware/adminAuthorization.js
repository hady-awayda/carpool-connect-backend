import authentication from "./authentication.js";

// Middleware for admin authorization
const adminAuthorization = (req, res, next) => {
  authentication(req, res, () => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Admin authorization required" });
    }
  });
};

export default adminAuthorization;
