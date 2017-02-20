import jwt from 'jwt-simple'
import jwtConfig from '../../../jwt.config.json';

export function loadAuth(req) {
  return new Promise((resolve) => {
    if (req.session.UserToken && req.session.UserToken.length > 10) {
      let user = jwt.decode(req.session.UserToken, jwtConfig.secret);
      resolve(user);
    } else
      resolve(null)
  });
}
