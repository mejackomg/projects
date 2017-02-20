import mysql from 'mysql'
import uuid from 'uuid';
import executeSql from './database.js'
import delayPromise from '../../utils/delayPromise'

export function updateMappingTable(req) {
    let srcTableName = req.body.searchText_SrcTable;
    let dstTableName = req.body.searchText_DstTable;
    let platformId = req.body.platformId;
    let updateRuleId = req.body.updateRuleId;
    let srcTableId = req.body.srcTableId;
    let dstTableId = req.body.dstTableId;
    let srcColumnName = req.body.searchText_SrcColumn;
    let dstColumnName = req.body.searchText_DstColumn;
    let srcColumnId = req.body.srcColumnId;
    let dstColumnId = req.body.dstColumnId;
    let srcColumnTypeId = req.body.srcColumnTypeId;
    let dstColumnTypeId = req.body.dstColumnTypeId;
    //let configTableId = req.body.configTableId;
    //let configId = req.body.configId;
    let configTableId = uuid.v4();
    let configId = uuid.v4();

    return clearExistRow(srcColumnId, dstColumnId)
        .then(()=> {
            return new Promise((resolve, reject) => {

                let sqlStr = 'INSERT INTO config_trans_table ( config_table_id, platform_id, src_table_name,dst_table_name,' +
                    'update_rule_id,src_table_id,dst_table_id) values (?,?,?,?,?,?,?)';

                executeSql(sqlStr, [configTableId, platformId, srcTableName, dstTableName, updateRuleId, srcTableId, dstTableId], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    else {
                        resolve();
                    }
                });
            })
        })
        .then(()=> {
            return new Promise((resolve, reject) => {
                let sqlStr = 'INSERT INTO config_trans_column ( config_table_id, config_id, src_col_name,dst_col_name,' +
                    'src_col_type_id,dst_col_type_id,src_col_id,dst_col_id) values (?,?,?,?,?,?,?,?)';

                executeSql(sqlStr, [configTableId, configId, srcColumnName, dstColumnName,
                    srcColumnTypeId, dstColumnTypeId, srcColumnId, dstColumnId], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    else
                        resolve({
                            success: true,
                            data:{
                                platformId: req.body.platformId,
                                srcTableId: req.body.srcTableId,
                                srcColumnId: req.body.srcColumnId,
                                dstTableId: req.body.dstTableId,
                                dstColumnId: req.body.dstColumnId,
                                configId: req.body.configId,
                            },
                            error:null
                        });
                });
            })
        })
        .catch((reason) => {
            return Promise.reject({
                success:false,
                data:null,
                error:reason
            })
        });
}

export function clearExistRow(srcColumnId,dstColumnId) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT config_table_id,config_id from config_trans_column where (src_col_id=? or dst_col_id=?)';

        executeSql(sqlStr, [srcColumnId, dstColumnId], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            else {
                if (rows.length > 0) {
                    resolve(rows[0]);
                }
                else
                    resolve(null);
            }
        });
    })
        .then((row)=> {
            if (row) {
                return deleteConfigTableRow(row.config_table_id, row.config_id)
            }
            else
                return Promise.resolve();
        }
    )
}

export function deleteMappingTable(req) {
    let configId = req.body.configId;
    let configTableId = req.body.configTableId;

    return deleteConfigTableRow(configTableId,configId)
}

export function deleteConfigTableRow(configTableId,configId) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'delete from config_trans_column where config_id=?';

        executeSql(sqlStr, [configId], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            else
                resolve();
        });
    })
        .then(()=> {
            return new Promise((resolve, reject) => {
                let sqlStr = 'SELECT * from config_trans_column where config_table_id=?';

                executeSql(sqlStr, [configTableId], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    else {
                        if (rows.length == 0) {
                            sqlStr = 'delete from config_trans_table where config_table_id=?';

                            executeSql(sqlStr, [configTableId], (err, rows, field)=> {
                                if (err)
                                    reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                                else {
                                    resolve({
                                        success: true,
                                        error: null
                                    });
                                }
                            });
                        }
                        else
                            resolve({
                                success: true,
                                error: null
                            });
                    }
                });
            })
        })
        .catch((reason) => {
            return Promise.reject({
                success: false,
                error: reason
            })
        });
}

export function deleteUserManageTable(req) {
    let userId = req.body.userId;
    let platformtypeId = req.body.platformtypeId;
    return deleteUserManageTableRow(userId, platformtypeId)
}

export function deleteUserManageTableRow(userId, platformtypeId) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'delete from user where user_id=?'
        executeSql(sqlStr, [userId], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            else {
                resolve({
                    success: true,
                    error: null
                });
            }
        });
    }).catch((reason) => {
        return Promise.reject({
            success: false,
            error: reason
        })
    });

}


export function addNewUser(req) {
    const userId = uuid.v4();
    const user_type_id = uuid.v4();
    const platform_type_id = uuid.v4();
    const params = req.body;
    const userPlatformName = params.userPlatformName;
    const userType = params.userType;
    const platformName = params.platformName;
    const userRealName = params.userRealName;
    const userPhone = params.userPhone;
    const userActivated = params.userActivated;
    const userPassword = params.userPassword;

    return new Promise((resolve, reject) => {
        let sqlStr = 'select user_id from user where user_platform_name = ? ';
        executeSql(sqlStr, [userPlatformName], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            else {
                if (rows.length == 0) {
                    resolve();
                }
                else
                {
                        reject('该用户名已存在，请重新输入您的用户名');
                }
            }
        });
    }).then(()=>{
        return new Promise((resolve, reject) => {
            let sqlStr = 'INSERT INTO user(user_id,user_real_name,user_platform_name,user_phone,user_activity,user_platform_passwd,user_type_id,platform_id )' +
                ' VALUES(?,?,?,?,?,?,' +
                ' (select user_type_id from dict_user_type where user_type_name=?) ,' +
                ' (select platform_type_id from platform where platform_name=? ))';
            executeSql(sqlStr, [userId, userRealName, userPlatformName, userPhone,
                userActivated, userPassword, userType, platformName], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                else {
                    // console.log("update success");
                    resolve({
                        success: true,
                        error: null
                    });
                }
            });
        })
    })
        .catch((reason) => {
        return Promise.reject({
            success: false,
            data: null,
            error: reason
        })
    });
}


export function updateUser(req) {
    const params = req.body;
    const userId = params.userId;
    const userPlatformName = params.userPlatformName;
    const userType = params.userType;
    const platformName = params.platformName;
    const userRealName = params.userRealName;
    const userPhone = params.userPhone;
    const userActivated = params.userActivated;

    return new Promise((resolve, reject) => {
        let sqlStr = 'select * from user where user_id=?';
        executeSql(sqlStr, [userId], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            else {
                if (rows.length > 0) {
                    resolve();
                } else {
                    reject('该用户不存在');

                }
            }
        });
    })
        .then(()=> {
            return new Promise((resolve, reject) => {
                let sqlStr = 'select user_id from user where user_platform_name = ? ';
                executeSql(sqlStr, [userPlatformName], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    else {
                        if (rows.length == 0) {
                            resolve();
                        }
                        else
                        {
                            if(rows[0].user_id==userId)
                                resolve();
                            else
                                reject('该用户名已存在，请重新输入您的用户名');
                        }
                    }
                });
            })
        })
        .then(()=> {
            return new Promise((resolve, reject) => {
                let sqlStr = 'update user set user_real_name=?,user_platform_name=?,user_phone=?,user_activity=?,' +
                    ' user_type_id=(select user_type_id from dict_user_type where user_type_name=?)' +
                    // ' platform_id=(select platform_type_id from platform where platform_name=?)' +
                    ' where user_id=?'
                // executeSql(sqlStr, [userRealName, userPlatformName, userPhone,
                //     userActivated, userType, platformName, userId], (err, rows, field)=> {
                executeSql(sqlStr, [userRealName, userPlatformName, userPhone,
                    userActivated, userType, userId], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    else {
                        resolve({
                            success: true,
                            error: null
                        });
                    }
                });
            })
        })
        .catch((reason) => {
            return Promise.reject({
                success: false,
                data: null,
                error: reason
            })
        });
}
