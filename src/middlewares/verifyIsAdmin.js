function verifyIsAdmin(req, res, next) {
    if (!req.userToken.body.admin) {
        return res.status(401).json({
            success: false,
            message: `you must be Admin`,
        });
    }
    res.status(500).json({
        success: false,
        message: err.message,
    });
  }
  
  module.exports = verifyIsAdmin;