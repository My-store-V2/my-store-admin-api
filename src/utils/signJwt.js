// var jwt = require('jsonwebtoken');

// const signJwt = (body) => {
  
//   return jwt.sign({
//     body
//   }, process.env.JWT_SECRET);
    
// }

// module.exports = signJwt;

// jwtUtils.js
const jwt = require('jsonwebtoken');

const secretKey = 'votre_clé_secrète_ici';

function signJwt(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Vous pouvez ajuster la durée de validité selon vos besoins
}

module.exports = {
  signJwt,
  // Autres exports si nécessaire
};
