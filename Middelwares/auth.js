import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import multer from "multer";

dotenv.config();
//Admin Auth

const verifyUser = (req, res, next) => {
  let token;

  // Get the token from either the cookie or the header
  token = req.cookies["access-token"] || req.headers["access-token"];

  // If there's no token, return a 403 Forbidden response
  if (!token) {
    return res.status(403).send("Log in Please!");
  }

  try {
    // Verify the token and decode the user object
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Save the decoded user object to the request object for later use
  } catch (err) {
    // If the token is invalid, return a 401 Unauthorized response
    return res.status(401).send("Invalid Token");
  }

  // If the token is valid, call the next middleware function or route handler
  next();
};

export function admin(req, res, next) {
  if (req.user.role === "admin") return next();
  else return res.status(401).send("Not Authorized");
}
export default verifyUser;
