const config = require("config");
const jwt = require("jsonwebtoken");
const DateFns = require("date-fns");

const authMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];

    let token;
    let authInfo;
    if (authorization) {
      token = authorization.replace(/^bearer /gi, "");
    }

    if (!token) {
      return res.json({
        success: false,
        data: {
          message: "Unauthorized request"
        }
      });
    }

    jwt.verify(token, config.get("jwt").secret);

    authInfo = jwt.decode(token);

    if (Date.now() > authInfo.exp) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        message: "Unauthorized request",
        path: ctx.path
      };
    }

    req.auth = authInfo;

    next();
  } catch (err) {
    res.status(401);
    return res.json({
      success: false,
      data: {
        message: err.message
      }
    });
  }
};

module.exports = authMiddleware;
