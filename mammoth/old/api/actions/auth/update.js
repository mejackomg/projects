import bcrypt from 'bcryptjs'
import executeSql from '../mysql/database.js'
import jwt from 'jwt-simple'
import jwtConfig from '../../../jwt.config.json';

export function updatePwd(req) {
    let data = req.body;
    const userName = data.userName;
    const oldPwd = data.currentPassword;
    const newPwd = data.newPassword;
    return new Promise((resolve, reject) => {
        //密码验证
        let sqlStr = 'SELECT user_platform_passwd FROM user WHERE user_platform_name = ?';

        executeSql(sqlStr, [userName], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            else if (rows.length == 0) {
                reject("用户不存在");
            }
            else {
                let password = rows[0].user_platform_passwd;
                bcrypt.compare(oldPwd, password, (err, isCorrect) => {
                    if (isCorrect) {
                        bcrypt.hash(data.newPassword, 8, (err, User_AccountPassword) => {
                            let sqlStr = 'UPDATE user SET user_platform_passwd = ? WHERE user_platform_name = ?';
                            executeSql(sqlStr, [User_AccountPassword, userName], (err, rows, field)=> {
                                if (err)
                                    reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                                else {
                                    resolve({
                                        success: true,
                                        userName: userName,
                                        error: null
                                    });
                                }
                            });
                        });
                    }
                    else
                        resolve({
                            success:false,
                            userName: userName,
                            error:'旧密码输入不正确'
                        })
                })
            }
        });
    })
    .catch((reason) => {
        return Promise.resolve({
            success:false,
            userName: null,
            error:reason
        })
    })
}
