const router = require('express').Router();
const path = require('path');

/**
 * 
 * @param {string} root 
 */

const portalServe = async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    next();
    return;
  }
  res.sendFile(path.join(__dirname, '../../../portal/build/index.html'));
}


module.exports = portalServe;