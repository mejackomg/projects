import mysql from 'mysql'
import executeSql from './database.js'
// 用户
export function loadUsers(req) {
    const params = req.body;
    if (!params.page || !params.pageLineCount) {
        return Promise.reject({
            error: "no params！！"
        })
    }
    let advancedFilterStr = '';
    const page = params.page;
    const pageLineCount = params.pageLineCount;
    const searchText = params.searchText;
    if (searchText != '') {
        advancedFilterStr += ' and (a.id LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR NAME LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR email LIKE "%' + searchText + '%")';
    }
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT' +
            ' a.id AS "用户ID",' +
            'a.NAME AS "真实姓名",' +
            'a.sex AS "性别",' +
            'FROM_UNIXTIME(a.birth, "%Y-%m-%d") AS "出生年月",' +
            'a.phone AS "电话",' +
            //'CASE WHEN c.estimate IS NULL THEN 0.05 ELSE ROUND(c.estimate,4) END AS  "信用值",' +
            ' ROUND(c.estimate,4)AS  "信用值",' +
            'a.email AS "Email",' +
            'a.points AS "会员积分",' +
            'a.recode AS "推荐码",' +
            'a.state AS "状态",' +
            'case when a.role_type = 1 then "普通用户"' +
            ' else "马甲用户" end as "用户的等级",' +
            'FROM_UNIXTIME(a.addtime, "%Y-%m-%d") AS "注册时间",' +
            'a.address AS "地址",' +
            'case when a.user_type = 1 then "注册用户"' +
            ' else "游客" end as "是否注册用户",' +
            ' case when a.client_type = 1 then "APP"' +
            ' else "H5" end as "客户端"' +
            ' FROM ' +
            ' users a LEFT JOIN customer_estimate c ON c.customer_id=a.id ' +
            ' where c.date=(SELECT MAX(date) FROM customer_estimate) '+
            advancedFilterStr+
            ' ORDER BY a.id ASC LIMIT ?,?';
        executeSql(sqlStr, [parseInt((page - 1) * pageLineCount), parseInt(pageLineCount)], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                sqlStr='SELECT COUNT(*) AS count FROM users a LEFT JOIN customer_estimate c ON c.customer_id = a.id' +
                    ' where c.date= (SELECT MAX(date) FROM customer_estimate)'+
                    advancedFilterStr;
                executeSql(sqlStr, [], (err, rows1, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr);
                    } else {
                        // console.log('用户',rows);
                        for(let i = 0;i<rows.length;i++){
                            rows[i]['性别'] = rows[i]['性别']==1?'男':'女';
                            rows[i]['状态'] = rows[i]['状态'] ==1?'激活':'未激活';
                        }
                        resolve({
                            count:rows1[0]['count'],
                            Userlist:rows
                        });
                    }
                })
            }
        })
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
export function loadSingleUsersSearch(req) {
    const params = req.body;
    if (!params.page || !params.pageLineCount) {
        return Promise.reject({
            error: "no params！！"
        })
    }
    const page = params.page;
    const pageLineCount = params.pageLineCount;
    const searchText = params.searchText;
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT' +
            ' id AS "用户ID",' +
            'NAME AS "真实姓名",' +
            'sex AS "性别",' +
            'FROM_UNIXTIME(birth, "%Y-%m-%d") AS "出生年月",' +
            'phone AS "电话",' +
            'email AS "Email",' +
            'points AS "会员积分",' +
            'recode AS "推荐码",' +
            'state AS "状态",' +
            'case when role_type = 1 then "普通用户"' +
            ' else "马甲用户" end as "用户的等级",' +
            'FROM_UNIXTIME(addtime, "%Y-%m-%d") AS "注册时间",' +
            'address AS "地址",' +
            'case when user_type = 1 then "注册用户"' +
            ' else "游客" end as "是否注册用户",' +
            ' case when client_type = 1 then "APP"' +
            ' else "H5" end as "客户端"' +
            ' FROM ' +
            ' users' +
            ' WHERE id = ?  ';
        executeSql(sqlStr, [searchText], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                resolve(rows);
            }
        })
    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
export function loadTransTable(req) {
    return new Promise((resolve, reject) => {
//platform_table_column
        let sqlStr = 'SELECT platform.platform_name,' +
            'dict_platform_type.platform_type_name,' +
            'platform_table.table_name,' +
            'platform_table_column.column_name,' +
            'dict_column_type.column_type_name,' +
            'platform_table.comment_name,' +
            'platform_table.table_id,' +
            'platform.platform_id,' +
            'platform_table_column.table_column_id,' +
            'dict_column_type.column_type_id' +
            ' FROM platform_table_column LEFT OUTER JOIN platform ON platform_table_column.platform_id = platform.platform_id' +
            ' LEFT OUTER JOIN platform_table ON platform_table_column.table_id = platform_table.table_id' +
            ' LEFT OUTER JOIN dict_column_type ON platform_table_column.column_type_id = dict_column_type.column_type_id' +
            ' LEFT OUTER JOIN dict_platform_type ON platform.platform_type_id = dict_platform_type.platform_type_id' +
            ' ORDER BY platform.platform_name ASC, platform_table.table_name ASC';
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else
                resolve(rows);
        });
    })
        .then((platformColumns)=> {
            return new Promise((resolve, reject) => {
//mammoth_table_column
                    let sqlStr = 'SELECT mammoth_table.mammoth_table_name,' +
                        'mammoth_table.`comment` as table_comment,' +
                        'dict_column_type.column_type_name,' +
                        'mammoth_table_column.column_name,' +
                        'mammoth_table_column.table_id,' +
                        'mammoth_table_column.column_type_id,' +
                        'mammoth_table_column.mammoth_table_column_id' +
                        ' FROM mammoth_table_column' +
                        ' LEFT OUTER JOIN mammoth_table ON mammoth_table_column.table_id = mammoth_table.mammoth_table_id' +
                        ' LEFT OUTER JOIN dict_column_type ON mammoth_table_column.column_type_id = dict_column_type.column_type_id' +
                        ' ORDER BY mammoth_table.mammoth_table_name ASC';
                    executeSql(sqlStr, [], (err, rows, field)=> {
                        if (err)
                            reject('ERROR IN QUERY:' + sqlStr);
                        else {
                            resolve({
                                mammothColumns: rows,
                                platformColumns: platformColumns
                            });
                        }
                    });
                }
            )
        })
        .then((data)=> {
            return new Promise((resolve, reject) => {
//dict_update_rule
                let sqlStr = 'SELECT dict_update_rule.rule_name,' +
                    'dict_update_rule.dict_rule_id' +
                    ' FROM dict_update_rule';
                executeSql(sqlStr, [], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        resolve({
                            mammothColumns: data.mammothColumns,
                            platformColumns: data.platformColumns,
                            updateRules: rows
                        });
                    }
                });
            })
        })
        .then((data)=> {
            return new Promise((resolve, reject) => {
//config_trans_column
                let sqlStr = 'SELECT platform.platform_name AS 源平台名,' +
                    'dict_platform_type.platform_type_name AS 源平台类型,' +
                    'config_trans_table.src_table_name AS 源表名,' +
                    'config_trans_column.src_col_name AS 源列名,' +
                    'type1.column_type_name AS 源列类型,' +
                    'config_trans_table.dst_table_name AS 目的表名,' +
                    'config_trans_column.dst_col_name AS 目的列名,' +
                    'type2.column_type_name AS 目的列类型,' +
                    'config_trans_column.config_id,' +
                    'config_trans_table.config_table_id,' +
                    'dict_update_rule.rule_name AS 更新策略,' +
                    'config_trans_table.last_update_time AS 更新时间' +
                    ' FROM config_trans_column' +
                    ' LEFT JOIN config_trans_table ON config_trans_column.config_table_id = config_trans_table.config_table_id' +
                    ' LEFT JOIN platform ON config_trans_table.platform_id = platform.platform_id' +
                    ' LEFT JOIN dict_platform_type ON platform.platform_type_id = dict_platform_type.platform_type_id' +
                    ' LEFT JOIN dict_update_rule ON config_trans_table.update_rule_id = dict_update_rule.dict_rule_id' +
                    ' LEFT JOIN dict_column_type type1 ON config_trans_column.src_col_type_id = type1.column_type_id' +
                    ' LEFT JOIN dict_column_type type2 ON config_trans_column.dst_col_type_id = type2.column_type_id' +
                    ' ORDER BY 源平台名 ASC, 源表名 ASC';
                executeSql(sqlStr, [], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        resolve({
                            mammothColumns: data.mammothColumns,
                            platformColumns: data.platformColumns,
                            updateRules: data.updateRules,
                            mappingData: rows
                        });
                    }
                });
            })
        })
        .then((data)=> {
            let mammothColumns = data.mammothColumns;
            let platformColumns = data.platformColumns;
            let updateRules = data.updateRules;
            let mappingData = data.mappingData;

            let tableData = {srcPlatforms: {}, dstTables: {}, updateRules: {}, mappingData: mappingData};
            platformColumns.forEach((row, index) => {
                let platformName = row.platform_name;
                let platformType = row.platform_type_name;
                let tableName = row.table_name;
                let tableComment = row.comment_name;
                let columnName = row.column_name;
                let columnTypeName = row.column_type_name;
                let tableId = row.table_id;
                let platformId = row.platform_id;
                let columnId = row.table_column_id;
                let columnTypeId = row.column_type_id;
                if (platformName && tableName && columnName) {
                    if (!tableData.srcPlatforms[platformName]) {
                        tableData.srcPlatforms[platformName] = {
                            platformId: platformId,
                            type: platformType,
                            tables: {}
                        }
                    }

                    let tables = tableData.srcPlatforms[platformName].tables;
                    if (!tables[tableName]) {
                        tables[tableName] = {
                            tableId: tableId,
                            comment: tableComment,
                            columns: {}
                        }
                    }

                    let columns = tableData.srcPlatforms[platformName].tables[tableName].columns;
                    if (!columns[columnName]) {
                        columns[columnName] = {
                            columnId: columnId,
                            configId: '',
                            columnTypeName: columnTypeName,
                            columnTypeId: columnTypeId
                        }
                    }
                }

                //srcColumns结构示例
                //srcPlatforms:
                //{
                //    platformName:
                //    {
                //        platformId:'',
                //        type: '',
                //        tables:
                //        {
                //            tableName:
                //            {
                //                tableId:'',
                //                comment: '',
                //                columns:
                //                {
                //                    columnName:{
                //                        columnId:'',
                //                        configId:'',//数据转换关联
                //                        columnTypeName:'',
                //                        columnTypeId:''
                //                    },
                //                }
                //            },
                //        }
                //    },
                //}
            });

            mammothColumns.forEach((row, index) => {
                let tableName = row.mammoth_table_name;
                let tableComment = row.table_comment;
                let tableId = row.table_id;
                let columnTypeId = row.column_type_id;
                let columnId = row.mammoth_table_column_id;
                let columnName = row.column_name;
                let columnTypeName = row.column_type_name;
                if (tableName && columnName) {
                    if (!tableData.dstTables[tableName]) {
                        tableData.dstTables[tableName] = {
                            tableId: tableId,
                            comment: tableComment,
                            columns: {}
                        }
                    }

                    let columns = tableData.dstTables[tableName].columns;
                    if (!columns[columnName]) {
                        columns[columnName] = {
                            columnId: columnId,
                            configId: '',
                            columnTypeName: columnTypeName,
                            columnTypeId: columnTypeId
                        }
                    }
                }

                //dstTables结构示例
                //        dstTables:
                //        {
                //            tableName:
                //            {
                //                tableId:'',
                //                comment: '',
                //                columns:
                //                {
                //                    columnName:{
                //                        columnId:'',
                //                        configId:'',//数据转换关联
                //                        columnTypeName:'',
                //                        columnTypeId:''
                //                    },
                //                }
                //            },
                //        }

            });

            updateRules.forEach((row, index) => {
                let ruleName = row.rule_name;
                let ruleId = row.dict_rule_id;
                if (ruleName && ruleId) {
                    if (!tableData.updateRules[ruleName]) {
                        tableData.updateRules[ruleName] = {
                            ruleId: ruleId
                        }
                    }
                }
            });

            mappingData.forEach((row, index)=> {
                let platformName = row.源平台名;
                let platformTypeName = row.源平台类型;
                let srcTableName = row.源表名;
                let srcColName = row.源列名;
                let dstTableName = row.目的表名;
                let dstColName = row.目的列名;
                let configId = row.config_id;

                if (platformName && platformTypeName && srcTableName
                    && srcColName && dstTableName && dstColName && configId) {
                    tableData.srcPlatforms[platformName].tables[srcTableName].columns[srcColName].configId = configId;
                    tableData.dstTables[dstTableName].columns[dstColName].configId = configId;
                }
            })

            return Promise.resolve(tableData);
        })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
//用户信用历史曲线
export function usersCreditHistroy(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'select avg_credit,DATE_FORMAT(stat_date,"%Y-%m-%d") from stat_customer' +
            ' where ' +
            ' avg_credit > 0 ' +
            'and stat_date > ADDDATE(NOW(), -180) order by stat_date';//一个历史信用曲线图：所有商户平均信用的平均值的 历史曲线图:
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                var date = [], dateValue = [], AvgCredit = 0;
                // rows[0]['avg(estimate)'] = 1;
                for (var i = 0; i < rows.length; i++) {
                    date.push(rows[i]['DATE_FORMAT(stat_date,"%Y-%m-%d")']);
                    rows[i]['avg_credit'] = rows[i]['avg_credit'] === null ? 0 : rows[i]['avg_credit'] * 100;
                    dateValue.push(rows[i]['avg_credit']);
                }
                if (rows.length > 0) {
                    AvgCredit = rows[rows.length - 1]['avg_credit'];
                }

                resolve({
                    // shopHistoryData:rows
                    UserHistoryData: {
                        dateList: date,
                        valueList: dateValue
                    },
                    AvgCredit: AvgCredit
                });
            }

        })

    })
        .then((data)=> {
            return new Promise((resolve, reject) => {
                // 一个饼状图：显示信用的分级占比:
                let sqlStr = ' SELECT avg(third_ratio) AS "0~0.2",' +
                    'avg(second_ratio) AS "0.3~0.6",' +
                    'avg(first_ratio) AS "0.7~1" ' +
                    'FROM stat_customer'
                executeSql(sqlStr, [], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        resolve({
                            UserGrade: rows,
                            UserHistoryData: data.UserHistoryData,
                            AvgCredit: data.AvgCredit
                        });
                    }
                });
            })
        })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
//单用户的信用历史曲线
export function SingleusersCreditHistroy(req,params) {
    // console.log('单用户的历史',params)
    const user_id = params[0];
    // console.log(user_id);
    return new Promise((resolve, reject) => {
        let sqlStr = 'select estimate,DATE_FORMAT(date,"%Y-%m-%d") AS date  from customer_estimate WHERE customer_id =? ORDER BY date'
        executeSql(sqlStr, [user_id], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                const date1 = [];
                const dateValue1 = [];
                let SingleUserAvgCredit = 0;
                for (var i = 0; i < rows.length; i++) {
                    date1.push(rows[i].date);
                    rows[i]['estimate'] = rows[i]['estimate'] === null ? 0 : rows[i]['estimate'] * 100;
                    dateValue1.push(rows[i]['estimate']);
                }
                if (rows.length > 0) {
                    SingleUserAvgCredit = rows[rows.length - 1]['estimate'];
                }
                resolve({
                    SingleUserHistoryData: {
                        dateList: date1,
                        valueList: dateValue1
                    },
                    SingleUserAvgCredit: SingleUserAvgCredit
                });
            }

        })

    })
        .then((data)=>{
            return new Promise((resolve,reject)=>{
                let sqlStr = 'SELECT weights AS value,customer_label_name AS name FROM rel_customer_labels ' +
                    ' WHERE customer_id = ? ORDER BY weights ';
                executeSql(sqlStr, [user_id], (err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr);
                    } else {
                        resolve({
                            SingleUserHistoryData:data.SingleUserHistoryData ,
                            SingleUserAvgCredit: data.SingleUserAvgCredit,
                            SinglePortrait:rows
                        });
                    }

                })

            })
        })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}


//商户
export function loadShops(req) {
    // console.log(req)
    const params = req.body;
    if (!params.page || !params.pageLineCount) {
        return Promise.reject({
            error: "no params！！"
        })
    }

    let advancedFilterStr = '';

    const page = params.page;
    const pageLineCount = params.pageLineCount;
    const searchText = params.searchText ? params.searchText.trim() : '';
    const estimateFrom = params.creditFrom;
    const estimateTo = params.creditTo;

    if (searchText != '') {
        advancedFilterStr += ' AND (a.shopsname LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR a.id LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR t.name LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR c.path_name LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR a.phone LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR a.address LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR a.recode LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR a.name LIKE "%' + searchText + '%")';
    }

    var shopsColumnList = ['类型', '经度', '纬度', '商圈', '电话', '商铺名称', '店主', '地址', '推荐码', '当前状态', '审核状态', '是否注销', '推广人推荐码', '银行推荐码', '注册时间', '审核时间'];

    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT a.id AS 店铺id,' +
            'a.longitude AS 经度,' +
            'a.latitude AS 纬度,' +
            't.name AS 类型,' +
            'c.path_name AS 商圈,' +
            'a.phone AS 电话,' +
            'a.shopsname AS 商铺名称,' +
            'a.name AS 店主,' +
            'a.address AS 地址,' +
            'a.recode AS 推荐码,' +
            //'a.state AS 当前状态,' +
            ' CASE WHEN a.state=1 THEN "启用" ' +
            '  WHEN a.state=2 THEN "禁用" ' +
            '  WHEN a.state=3 THEN "审核中" ' +
            '  WHEN a.state=4 THEN "审核不通过" ' +
            '  WHEN a.state=5 THEN "已删除" ' +
            ' ELSE "审核中(未完成)"  END AS 当前状态,' +
            'd.audit_state AS 审核状态,' +
            //'a.exist AS 是否注销,' +
            ' CASE WHEN a.exist=1 THEN "否" ' +
            ' ELSE "是"  END AS 是否注销,' +

            'a.rid AS 推广人推荐码,' +
            'a.bank_rid AS 银行推荐码,' +
            // 's.estimate AS 信用值,'+
            'CASE WHEN s.estimate IS NULL THEN 0.05' +
            ' ELSE s.estimate END AS estimate,' +
            ' FROM_UNIXTIME(a.addtime,"%Y-%m-%d") AS 注册时间,' +
            'FROM_UNIXTIME(d.audit_time,"%Y-%m-%d") AS 审核时间' +
            ' FROM shops a' +
            ' LEFT JOIN shops_expand d ON a.id=d.shopsid' +
            ' LEFT JOIN comshop cm ON cm.shopsid = a.id ' +
            ' LEFT JOIN community c ON c.id = cm.communityid' +
            ' LEFT JOIN shopstype t ON t.id = a.typeid' +
            ' LEFT JOIN commercial_estimate AS s ON a.id = s.shopid' +
            ' WHERE FROM_UNIXTIME(a.addtime,"%Y-%m-%d") <= DATE_FORMAT(ADDDATE(NOW(),-1),"%Y-%m-%d")' +
            ' AND s.date=(SELECT MAX(date) FROM commercial_estimate) ' +
            ' AND estimate >= ? AND estimate <=?' +
            advancedFilterStr +
            ' ORDER BY estimate ASC LIMIT ?,?';
        executeSql(sqlStr, [estimateFrom, estimateTo, parseInt((page - 1) * pageLineCount), parseInt(pageLineCount)], (err, rows, field)=> {
            if (err) {
                // console.log(params);
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                // 1启用 2、禁用 3、审核中 4、审核不通过 5、已删除 6、审核中（未完成）
                for (var i in rows) {
                    rows[i]['信用值'] = rows[i].estimate.toFixed(4);
                    if (rows[i]['审核状态'] === 1)
                        rows[i]['审核状态'] = '启用';
                    else if (rows[i]['审核状态'] === 2)
                        rows[i]['审核状态'] = '禁用';
                    else if (rows[i]['审核状态'] === 3)
                        rows[i]['审核状态'] = '审核中';
                    else if (rows[i]['审核状态'] === 4)
                        rows[i]['审核状态'] = '审核不通过';
                    else if (rows[i]['审核状态'] === 5)
                        rows[i]['审核状态'] = '已删除';
                    else if (rows[i]['审核状态'] === 6)
                        rows[i]['审核状态'] = '审核中';
                }
                resolve({
                    shops: rows
                });
            }
        })
    })
        .then((data)=> {
            return new Promise((resolve, reject) => {
                let sqlStr = 'SELECT count(*) FROM shops a' +
                    ' LEFT JOIN shops_expand d ON a.id=d.shopsid' +
                    ' LEFT JOIN comshop cm ON cm.shopsid = a.id ' +
                    ' LEFT JOIN community c ON c.id = cm.communityid' +
                    ' LEFT JOIN shopstype t ON t.id = a.typeid' +
                    ' LEFT JOIN commercial_estimate AS s ON a.id = s.shopid' +
                    ' WHERE FROM_UNIXTIME(a.addtime,"%Y-%m-%d") <= DATE_FORMAT(ADDDATE(NOW(),-1),"%Y-%m-%d")' +
                    ' AND s.date=(SELECT MAX(date) FROM commercial_estimate) ' +
                    ' AND estimate > ? AND estimate <?' + advancedFilterStr
                executeSql(sqlStr, [estimateFrom, estimateTo], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        // console.log(rows);
                        resolve({
                            shops: data.shops,
                            dataTotal: rows[0]['count(*)']
                        });
                    }
                });
            })
        })

        .then((data)=> {
            if(data.shops.length > 1 || data.shops.length==0){
                return new Promise((resolve, reject) => {
                    let sqlStr = 'select count(*) from loan_commercial '
                    executeSql(sqlStr, (err, rows, field)=> {
                        if (err) {
                            reject('ERROR IN QUERY:' + sqlStr);
                        } else {
                            resolve({
                                loandata: [],
                                shops: data.shops,
                                dataTotal:data.dataTotal

                            });
                        }
                    });
                })

            }else {
                let shopsId=data.shops[0]['店铺id'];
                return new Promise((resolve, reject) => {
                    let sqlStr = 'SELECT scheme,loan_profit,loan_money,loan_rate,loan_last,loan_term,loan_profit,credit,first_risk,'+
                        ' DATE_FORMAT(loan_bgn_time,"%Y-%m-%d") as "贷款开始时间",DATE_FORMAT(loan_end_time,"%Y-%m-%d") as "贷款结束时间"' +
                        ' from loan_commercial where commercial_id=?'
                    executeSql(sqlStr, [shopsId], (err, rows, field)=> {
                        if (err) {
                            reject('ERROR IN QUERY:' + sqlStr);
                        } else {
                            resolve({
                                loandata: rows,
                                shops: data.shops,
                                dataTotal:data.dataTotal

                            });
                        }
                    });
                })
            }

        }).then((data)=> {
            return new Promise((resolve, reject) => {
                if(data.loandata.length > 0){
                    let shopsId=data.shops[0]['店铺id'];
                    if(data.loandata[0]['scheme']==0){
                        //const shopsId = params[0];
                        let sqlStr = 'select DATE_FORMAT(pay_time,"%Y-%m-%d") as "还款时间", loan_commercial_pay.pay_money as "还款金额",loan_commercial_pay.pay_risk as "风险评估" from loan_commercial_pay'+
                            ' where loan_id=(select id from loan_commercial where commercial_id=?) order by pay_time desc ';
                        executeSql(sqlStr, [shopsId], (err, rows, field)=> {
                            if (err){
                                reject('ERROR IN QUERY:' + sqlStr);
                            }
                            else {
                                resolve({
                                    repayrecord: rows,
                                    loandata: data.loandata,
                                    shops: data.shops,
                                    dataTotal:data.dataTotal
                                });
                            }
                        });
                    }else {
                        resolve({
                            repayrecord: [],
                            loandata: data.loandata,
                            shops: data.shops,
                            dataTotal:data.dataTotal
                        });
                    }
                }else {
                    resolve({
                        repayrecord: [],
                        loandata: data.loandata,
                        shops: data.shops,
                        dataTotal:data.dataTotal
                    });
                }

            })

        })
        .then((data)=> {
            return new Promise((resolve, reject) => {
                if(data.loandata.length>0){
                    let shopsId=data.shops[0]['店铺id'];
                    if(data.loandata[0]['scheme']==0){
                        //const shopsId = params[0];
                        let sqlStr = 'select sum(pay_money) as "已还款金额" from loan_commercial_pay where loan_id=(select id from loan_commercial where commercial_id=?)';
                        executeSql(sqlStr, [shopsId], (err, rows, field)=> {
                            if (err)
                                reject('ERROR IN QUERY:' + sqlStr);
                            else {
                                resolve({
                                    summoney: rows,
                                    repayrecord: data.repayrecord,
                                    loandata: data.loandata,
                                    shops: data.shops,
                                    dataTotal:data.dataTotal
                                });
                            }
                        });
                    }else {
                        resolve({
                            summoney: [],
                            repayrecord: data.repayrecord,
                            loandata: data.loandata,
                            shops: data.shops,
                            dataTotal:data.dataTotal
                        });
                    }
                }else {
                    resolve({
                        summoney: [],
                        repayrecord: data.repayrecord,
                        loandata: data.loandata,
                        shops: data.shops,
                        dataTotal:data.dataTotal
                    });
                }
            })
        })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
export function loadShopsSearch(req) {
    const params = req.body;
    let shopsId = params.shopsId;
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT a.id AS 店铺id,' +
            'a.longitude AS 经度,' +
            'a.latitude AS 纬度,' +
            't.name AS 类型,' +
            'c.path_name AS 商圈,' +
            'a.phone AS 电话,' +
            'a.shopsname AS 商铺名称,' +
            'a.name AS 店主,' +
            'a.address AS 地址,' +
            'a.recode AS 推荐码,' +
            //'a.state AS 当前状态,' +
            ' CASE WHEN a.state=1 THEN "启用" ' +
            '  WHEN a.state=2 THEN "禁用" ' +
            '  WHEN a.state=3 THEN "审核中" ' +
            '  WHEN a.state=4 THEN "审核不通过" ' +
            '  WHEN a.state=5 THEN "已删除" ' +
            ' ELSE "审核中(未完成)"  END AS 当前状态,' +
            'd.audit_state AS 审核状态,' +
            ' CASE WHEN a.exist=1 THEN "是" ' +
            ' ELSE "否"  END AS 是否注销,' +

            'a.rid AS 推广人推荐码,' +
            'a.bank_rid AS 银行推荐码,' +
            // 's.estimate AS 信用值,'+
            'CASE WHEN s.estimate IS NULL THEN 0.05' +
            ' ELSE s.estimate END AS estimate,' +
            ' FROM_UNIXTIME(a.addtime,"%Y-%m-%d") AS 注册时间,' +
            'FROM_UNIXTIME(d.audit_time,"%Y-%m-%d") AS 审核时间' +
            ' FROM shops a' +
            ' LEFT JOIN shops_expand d ON a.id=d.shopsid' +
            ' LEFT JOIN comshop cm ON cm.shopsid = a.id ' +
            ' LEFT JOIN community c ON c.id = cm.communityid' +
            ' LEFT JOIN shopstype t ON t.id = a.typeid' +
            ' LEFT JOIN commercial_estimate AS s ON a.id = s.shopid' +
            ' WHERE FROM_UNIXTIME(a.addtime,"%Y-%m-%d") <= DATE_FORMAT(ADDDATE(NOW(),-1),"%Y-%m-%d")' +
            ' AND s.date=(SELECT MAX(date) FROM commercial_estimate) ' +
            ' AND a.id = ?' ;
        executeSql(sqlStr, [shopsId], (err, rows, field)=> {
            if (err) {
                // console.log(params);
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                // 1启用 2、禁用 3、审核中 4、审核不通过 5、已删除 6、审核中（未完成）
                for (var i in rows) {
                    rows[i]['信用值'] = rows[i].estimate.toFixed(4);
                    if (rows[i]['审核状态'] === 1)
                        rows[i]['审核状态'] = '启用';
                    else if (rows[i]['审核状态'] === 2)
                        rows[i]['审核状态'] = '禁用';
                    else if (rows[i]['审核状态'] === 3)
                        rows[i]['审核状态'] = '审核中';
                    else if (rows[i]['审核状态'] === 4)
                        rows[i]['审核状态'] = '审核不通过';
                    else if (rows[i]['审核状态'] === 5)
                        rows[i]['审核状态'] = '已删除';
                    else if (rows[i]['审核状态'] === 6)
                        rows[i]['审核状态'] = '审核中';
                }
                resolve(rows);
            }
        })
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
//店铺销售记录表
export function loadSaleTable(req, params) {
    return new Promise((resolve, reject) => {
        if (params.length < 3) {
            const shopsId = params[0];
            const period = params[1];
            let sqlStr = 'select cast(sum(money) as decimal(10,2)) AS "销售额" ,pay_time as "日期" ,count(pay_time) as "到店次数" from( select money, DATE_FORMAT(pay_time, "%Y-%m-%d") as pay_time' +
                ' from record_order where commercial_id = ? and type="0" and pay_time>ADDDATE(NOW(),-?)) as tmpt GROUP BY pay_time'
            executeSql(sqlStr, [shopsId, period], (err, rows, field)=> {
                if (err) {
                    reject('ERROR IN QUERY:' + sqlStr);
                } else {
                    resolve(rows);//外卖总数
                }
            });
        }
        else {
            const shopsId = params[0];
            const startDate = params[1];
            const endDate = params[2];
            let sqlStr = 'SELECT cast(sum(money) as decimal(10,2)) AS "销售额",' +
                ' pay_time AS "日期" ,count(*) AS "到店次数" FROM' +
                ' (SELECT money,DATE_FORMAT(pay_time , "%Y-%m-%d") AS pay_time FROM record_order' +
                ' WHERE commercial_id = ? AND type = "0"' +
                ' AND pay_time >= ? AND pay_time <= ?) AS tmpt' +
                ' GROUP BY pay_time';
            executeSql(sqlStr, [shopsId, startDate, endDate], (err, rows, field)=> {
                if (err) {
                    reject('ERROR IN QUERY:' + sqlStr);
                } else {
                    resolve(rows);
                }

            });
        }
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            if (params.length < 3) {
                const shopsId = params[0];
                const period = params[1];
                let sqlStr = 'select cast(sum(money) as decimal(10,2)) AS "销售额" ,pay_time as "日期" ,count(pay_time) as "外卖次数" from( select money, DATE_FORMAT(pay_time, "%Y-%m-%d") as pay_time' +
                    ' from record_order where commercial_id = ? and type="1" and pay_time>ADDDATE(NOW(),-?)) as tmpt GROUP BY pay_time'
                executeSql(sqlStr, [shopsId, period], (err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr);
                    } else {
                        let temp = [];
                        for (var i = 0; i < data.length; i++) {
                            if (rows.length == 0) {
                                temp.push({
                                    "销售额": data[i]["销售额"],
                                    "日期": data[i]["日期"],
                                    "到店次数": data[i]["到店次数"],
                                    "外卖次数": 0,
                                })
                            } else {
                                for (var i = 0; i < rows.length; i++) {
                                    if (rows[i]['日期'] == data[i]['日期']) {
                                        temp.push({
                                            "销售额": data[i]["销售额"],
                                            "日期": data[i]["日期"],
                                            "到店次数": data[i]["到店次数"],
                                            "外卖次数": rows[i]["外卖次数"],
                                        })
                                    } else {
                                        temp.push({
                                            "销售额": data[i]["销售额"],
                                            "日期": data[i]["日期"],
                                            "到店次数": data[i]["到店次数"],
                                            "外卖次数": 0,
                                        })
                                    }
                                }
                            }
                        }

                        for (var i = 0; i < rows.length; i++) {
                            if (data.length == 0) {
                                temp.push({
                                    "销售额": rows[i]["销售额"],
                                    "日期": rows[i]["日期"],
                                    "到店次数": 0,
                                    "外卖次数": rows[i]["外卖次数"],
                                })
                            } else {
                                for (var i = 0; i < data.length; i++) {
                                    if (rows[i]['日期'] != data[i]['日期']) {
                                        temp.push({
                                            "销售额": rows[i]["销售额"],
                                            "日期": rows[i]["日期"],
                                            "到店次数": 0,
                                            "外卖次数": rows[i]["外卖次数"],
                                        })
                                    }
                                }
                            }
                        }
                        resolve(temp);
                    }
                });
            } else {
                const shopsId = params[0];
                const startDate = params[1];
                const endDate = params[2];
                let sqlStr = 'SELECT cast(sum(money) as decimal(10,2)) AS "销售额",' +
                    ' pay_time AS "日期" ,count(*) AS "外卖次数" FROM' +
                    ' (SELECT money,DATE_FORMAT(pay_time , "%Y-%m-%d") AS pay_time FROM record_order' +
                    ' WHERE commercial_id = ? AND type = "1"' +
                    ' AND pay_time >= ? AND pay_time <= ?) AS tmpt' +
                    ' GROUP BY pay_time';

                executeSql(sqlStr, [shopsId, startDate, endDate], (err, rows, field)=> {
                    if (err) {
                        // console.log(sqlStr)
                        reject('ERROR IN QUERY:' + sqlStr);
                    } else {
                        let temp = [];
                        for (var i = 0; i < data.length; i++) {
                            if (rows.length == 0) {
                                temp.push({
                                    "销售额": data[i]["销售额"],
                                    "日期": data[i]["日期"],
                                    "到店次数": data[i]["到店次数"],
                                    "外卖次数": 0,
                                })
                            } else {
                                for (var i = 0; i < rows.length; i++) {
                                    if (rows[i]['日期'] == data[i]['日期']) {
                                        temp.push({
                                            "销售额": data[i]["销售额"],
                                            "日期": data[i]["日期"],
                                            "到店次数": data[i]["到店次数"],
                                            "外卖次数": rows[i]["外卖次数"],
                                        })
                                    } else {
                                        temp.push({
                                            "销售额": data[i]["销售额"],
                                            "日期": data[i]["日期"],
                                            "到店次数": data[i]["到店次数"],
                                            "外卖次数": 0,
                                        })
                                    }
                                }
                            }
                        }

                        for (var i = 0; i < rows.length; i++) {
                            if (data.length == 0) {
                                temp.push({
                                    "销售额": rows[i]["销售额"],
                                    "日期": rows[i]["日期"],
                                    "到店次数": 0,
                                    "外卖次数": rows[i]["外卖次数"],
                                })
                            } else {
                                for (var i = 0; i < data.length; i++) {
                                    if (rows[i]['日期'] != data[i]['日期']) {
                                        temp.push({
                                            "销售额": rows[i]["销售额"],
                                            "日期": rows[i]["日期"],
                                            "到店次数": 0,
                                            "外卖次数": rows[i]["外卖次数"],
                                        })
                                    }
                                }
                            }
                        }
                        resolve(temp);
                    }
                });
            }
        })
    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//店铺销售记录2
export function loadSaleTable1(req, params) {
    return new Promise((resolve, reject) => {
        const shopsId = params[0];
        const startDate = params[1];
        const endDate = params[2];
        // console.log(params);
        let sqlStr = 'SELECT shopsname,SUM(order_count) AS 订单量 ,SUM(total_count) AS 订单金额 ,dt AS 日期,shopsid AS 店铺ID,longitude AS 经度,latitude AS 纬度' +
            ' FROM (' +
            ' SELECT s.shopsname AS shopsname,COUNT(o.id) AS order_count,SUM(o.total) AS total_count,FROM_UNIXTIME(o.overtime,"%Y%m%d")  AS dt,o.shopsid,o.longitude,o.latitude' +
            ' FROM `order` o LEFT JOIN shops s ON o.`shopsid` = s.`id` WHERE o.state=3' +
            ' AND FROM_UNIXTIME(o.overtime,"%Y%m%d")>=?' +
            ' AND FROM_UNIXTIME(o.overtime,"%Y%m%d")<=?' +
            ' AND o.shopsid=?' +
            ' UNION ALL' +
            ' SELECT s.shopsname AS shopsname,COUNT(p.id) AS order_count,SUM(p.total) AS total_count,FROM_UNIXTIME(p.overtime,"%Y%m%d")  AS dt,p.shopsid,p.longitude,p.latitude' +
            ' FROM order_pay_bak AS p LEFT JOIN shops s ON p.shopsid = s.id WHERE p.state=2' +
            ' AND FROM_UNIXTIME(p.overtime,"%Y%m%d")>=?' +
            ' AND FROM_UNIXTIME(p.overtime,"%Y%m%d")<=?' +
            ' AND p.shopsid=?' +
            ' ) a' +
            ' GROUP BY shopsid';
        executeSql(sqlStr, [startDate, endDate, shopsId, startDate, endDate, shopsId], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                resolve({
                    saleData: rows
                });

            }

        });
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
//店铺详情电话归属
export function loadShopTelephone(req, params) {
    return new Promise((resolve, reject) => {
        const shopsId = params[0];
        let sqlStr = 'SELECT consumer_sources.shop,' +
            'consumer_sources.ratio AS value,' +
            'dict_area.home_province,' +
            'dict_area.city_belonging,' +
            'ROUND(SQRT((dict_area.latitude-shops.latitude)*(dict_area.latitude-shops.latitude)' +
            '+(dict_area.longitude-shops.longitude)*(dict_area.longitude-shops.longitude)),2) AS distance,' +
            'DATE_FORMAT(consumer_sources.datev,"%Y-%m-%d") AS date,' +
            'dict_area.longitude,' +
            'dict_area.latitude' +
            ' FROM consumer_sources' +
            ' JOIN dict_area ON consumer_sources.location = dict_area.area_code' +
            ' JOIN shops ON consumer_sources.shop = shops.id' +
            ' WHERE dict_area.latitude != ""' +
            ' AND consumer_sources.shop=?' +
            ' ORDER BY date,value DESC'
        executeSql(sqlStr, shopsId, (err, rows, field) => {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else
            // console.log(rows);
                resolve({
                    data:rows
                });


        })
    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    })
}
//店铺 销售记录 及 实时信用值图表
export function loadShopData(req, params) {
    return new Promise((resolve, reject) => {
        const shopsId = params[0];
        let sqlStr = 'SELECT DATE_FORMAT(`date`,"%Y/%m/%d") as date,estimate FROM commercial_estimate WHERE shopid=? ORDER BY DATE ASC'
        executeSql(sqlStr, [shopsId], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                resolve(rows);
            }
        });
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            const shopsId = params[0];
            let sqlStr = 'SELECT words,rank FROM `rel_commercial_labels` WHERE words IS NOT NULL AND `commercial_id`=?';
            executeSql(sqlStr, [shopsId], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        shopLabelData: rows,
                        creditData: data
                    });
                }
            });
        })
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
export function loadShopAnalysis(req) {
    const params = req.body;
    let advancedFilterStr = '';

    const page = params.page;
    const pageLineCount = params.pageLineCount;
    const searchText = params.searchText ? params.searchText.trim() : '';
    const estimateFrom = params.creditFrom;
    const estimateTo = params.creditTo;

    if (searchText != '') {
        advancedFilterStr += ' AND (a.shopsname LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR a.id LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR t.name LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR c.path_name LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR a.phone LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR a.address LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR a.recode LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR a.name LIKE "%' + searchText + '%")';
    }
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT a.id AS 店铺id,' +
            't.name AS 类型,' +
            'c.path_name AS 商圈,' +
            'a.phone AS 电话,' +
            'a.shopsname AS 商铺名称,' +
            'a.name AS 店主,' +
            ' FROM shops a' +
            ' LEFT JOIN shops_expand d ON a.id=d.shopsid' +
            ' LEFT JOIN comshop cm ON cm.shopsid = a.id ' +
            ' LEFT JOIN community c ON c.id = cm.communityid' +
            ' LEFT JOIN shopstype t ON t.id = a.typeid' +
            ' LEFT JOIN commercial_estimate AS s ON a.id = s.shopid' +
            ' WHERE FROM_UNIXTIME(a.addtime,"%Y-%m-%d") <= DATE_FORMAT(ADDDATE(NOW(),-1),"%Y-%m-%d")' +
            ' AND s.date=(SELECT MAX(date) FROM commercial_estimate) ' +

            advancedFilterStr
        executeSql(sqlStr, [ parseInt((page - 1) * pageLineCount), parseInt(pageLineCount)], (err, rows, field)=> {
            if (err) {
                // console.log(params);
                reject('ERROR IN QUERY:' + sqlStr);
            } else {

                // 1启用 2、禁用 3、审核中 4、审核不通过 5、已删除 6、审核中(未完成
                for (var i in rows) {
                    rows[i]['信用值'] = rows[i].estimate.toFixed(4);
                    if (rows[i]['审核状态'] === 1)
                        rows[i]['审核状态'] = '启用';
                    else if (rows[i]['审核状态'] === 2)
                        rows[i]['审核状态'] = '禁用';
                    else if (rows[i]['审核状态'] === 3)
                        rows[i]['审核状态'] = '审核中';
                    else if (rows[i]['审核状态'] === 4)
                        rows[i]['审核状态'] = '审核不通过';
                    else if (rows[i]['审核状态'] === 5)
                        rows[i]['审核状态'] = '已删除';
                    else if (rows[i]['审核状态'] === 6)
                        rows[i]['审核状态'] = '审核中';
                    // console.log(rows[i]['信用值']);
                }
                resolve({
                    shops: rows
                });
            }
        })
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
export function loadSaleTableDetail(req, params) {
    return new Promise((resolve, reject) => {
        const shopsId = params[0];
        const date = params[1];
        // console.log(shopsId,date);
        let sqlStr = 'SELECT  customer_id ,money,type,substring(pay_time,12,8) as "pay_time" FROM record_order'+
            ' WHERE commercial_id = ?'+
            ' AND DATE_FORMAT(pay_time , "%Y-%m-%d") = ? '
        executeSql(sqlStr, [shopsId, date], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                resolve(rows);
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//店铺信用概览
export function loadShopOverview(req, params) {
    return new Promise((resolve, reject) => {
        //一个历史信用曲线图：所有商户平均信用的平均值的 历史曲线图
        let sqlStr = 'select avg(estimate),DATE_FORMAT(date,"%Y-%m-%d") from commercial_estimate group by date';//一个历史信用曲线图：所有商户平均信用的平均值的 历史曲线图:
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                var date = [], dateValue = [], shopAvgCredit = 0;
                rows[0]['avg(estimate)'] = 1;
                for (var i = 1; i < rows.length; i++) {
                    date.push(rows[i]['DATE_FORMAT(date,"%Y-%m-%d")']);
                    rows[i]['avg(estimate)'] = rows[i]['avg(estimate)'] === null ? 0 : rows[i]['avg(estimate)'] * 100;
                    dateValue.push(rows[i]['avg(estimate)']);
                }
                if (rows.length > 0) {
                    shopAvgCredit = rows[rows.length - 1]['avg(estimate)'];
                }

                resolve({
                    // shopHistoryData:rows
                    shopHistoryData: {
                        dateList: date,
                        valueList: dateValue
                    },
                    shopAvgCredit: shopAvgCredit
                });
            }
        })
    })
        .then((data)=> {
            return new Promise((resolve, reject) => {
                //月
                let sqlStr = 'SELECT AVG(`estimate`),DATE_FORMAT(`date`,"%Y/%m") months FROM `commercial_estimate`  GROUP BY months'
                executeSql(sqlStr, [], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        var date = [], dateValue = [];
                        rows[0]['AVG(`estimate`)'] = 1;
                        for (var i = 1; i < rows.length; i++) {
                            date.push(rows[i].months);
                            rows[i]['AVG(`estimate`)'] = rows[i]['AVG(`estimate`)'] === null ? 0 : rows[i]['AVG(`estimate`)'] * 100;
                            dateValue.push(rows[i]['AVG(`estimate`)']);
                        }
                        resolve({
                            shopAvgCreditM: {
                                dateList: date,
                                valueList: dateValue
                            },
                            shopHistoryData: data.shopHistoryData,
                            shopAvgCredit: data.shopAvgCredit

                        });
                    }
                });
            })
        })
        .then((data)=> {
            return new Promise((resolve, reject) => {
                // 周
                let sqlStr = 'SELECT AVG(`estimate`),DATE_FORMAT(`date`,"%Y/%u") weeks FROM `commercial_estimate` GROUP BY weeks'
                executeSql(sqlStr, [], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        var date = [], dateValue = [];
                        rows[0]['AVG(`estimate`)'] = 1;
                        for (var i = 1; i < rows.length; i++) {
                            date.push(rows[i].weeks);
                            rows[i]['AVG(`estimate`)'] = rows[i]['AVG(`estimate`)'] === null ? 0 : rows[i]['AVG(`estimate`)'] * 100;
                            dateValue.push(rows[i]['AVG(`estimate`)']);
                        }
                        resolve({
                            shopAvgCreditW: {
                                dateList: date,
                                valueList: dateValue
                            },
                            shopAvgCreditM: data.shopAvgCreditM,
                            shopHistoryData: data.shopHistoryData,
                            shopAvgCredit: data.shopAvgCredit
                        });
                    }
                });
            })
        })
        .then((data)=> {
            return new Promise((resolve, reject) => {
                // 一个饼状图：显示信用的分级占比:

                let sqlStr = 'SELECT' +
                    ' SUM(CASE WHEN estimate<0.3 THEN 1 ELSE 0 END)/COUNT(id) AS "0~0.2",' +
                    ' SUM(CASE WHEN estimate>=0.3 AND estimate<0.7 THEN 1 ELSE 0 END)/COUNT(id) AS "0.3~0.6",' +
                    ' SUM(CASE WHEN estimate>=0.7 AND estimate<=1 THEN 1 ELSE 0 END)/COUNT(id) AS "0.7~1"' +
                    ' FROM commercial_estimate'
                executeSql(sqlStr, [], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        resolve({
                            shopGrade: rows,
                            shopHistoryData: data.shopHistoryData,
                            shopAvgCredit: data.shopAvgCredit,
                            shopAvgCreditW: data.shopAvgCreditW,
                            shopAvgCreditM: data.shopAvgCreditM

                        });
                    }
                });
            })
        })
}
//商铺排名前6 雷达图
export function loadShopTop(req, params) {
    return new Promise((resolve, reject) => {
        // 一个商户雷达图，显示排名前6个店铺类型及销售额（条形）
        let sqlStr = 'select b.*, a.type_name from commercial_type a, ' +
            '(select sum(money) as total_money, ' +
            'commercial_type_id ' +
            'from ' +
            'record_order ' +
            'group by commercial_type_id) b ' +
            'where a.id = b.commercial_type_id ' +
            'order by total_money desc LIMIT 6';
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                resolve(rows);
            }
        })
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
//商户销量地图数据
export function loadShopMap(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'select count(*) as times, ' +
            'sum(sum_money) as sum_money,' +
            'commercial_id as shopsid,' +
            'AVG(longitude) as longitude,' +
            'AVG(latitude) as latitude ' +
            'from map_commercial a ' +
            'where   longitude > 0 GROUP BY shopsid ORDER BY  sum_money DESC';
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve(rows);
            }
        });
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}

//店铺销售记录表
export function loadOrderRevoke(req, params) {
    return new Promise((resolve, reject) => {
        if (params.length < 3) {
            const shopsId = params[0];
            const period = params[1];
            let sqlStr = 'select cast(sum(money) as decimal(10,2)) AS "销售额" ,pay_time as "日期" ,count(pay_time) as "到店次数" from( select money, DATE_FORMAT(pay_time, "%Y-%m-%d") as pay_time' +
                ' from record_order_revoke where commercial_id = ? and type="0" and pay_time>ADDDATE(NOW(),-?)) as tmpt GROUP BY pay_time'
            executeSql(sqlStr, [shopsId, period], (err, rows, field)=> {
                if (err) {
                    reject('ERROR IN QUERY:' + sqlStr);
                } else {
                    resolve(rows);//外卖总数
                }
            });
        }
        else {
            const shopsId = params[0];
            const startDate = params[1];
            const endDate = params[2];
            let sqlStr = 'SELECT cast(sum(money) as decimal(10,2)) AS "销售额",' +
                ' pay_time AS "日期" ,count(*) AS "到店次数" FROM' +
                ' (SELECT money,DATE_FORMAT(pay_time , "%Y-%m-%d") AS pay_time FROM record_order_revoke' +
                ' WHERE commercial_id = ? AND type = "0"' +
                ' AND pay_time >= ? AND pay_time <= ?) AS tmpt' +
                ' GROUP BY pay_time';
            executeSql(sqlStr, [shopsId, startDate, endDate], (err, rows, field)=> {
                if (err) {
                    reject('ERROR IN QUERY:' + sqlStr);
                } else {
                    resolve(rows);
                }

            });
        }
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            if (params.length < 3) {
                const shopsId = params[0];
                const period = params[1];
                let sqlStr = 'select cast(sum(money) as decimal(10,2)) AS "销售额" ,pay_time as "日期" ,count(pay_time) as "外卖次数" from( select money, DATE_FORMAT(pay_time, "%Y-%m-%d") as pay_time' +
                    ' from record_order_revoke where commercial_id = ? and type="1" and pay_time>ADDDATE(NOW(),-?)) as tmpt GROUP BY pay_time'
                executeSql(sqlStr, [shopsId, period], (err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr);
                    } else {
                        let temp = [];
                        for (var i = 0; i < data.length; i++) {
                            if (rows.length == 0) {
                                temp.push({
                                    "销售额": data[i]["销售额"],
                                    "日期": data[i]["日期"],
                                    "到店次数": data[i]["到店次数"],
                                    "外卖次数": 0,
                                })
                            } else {
                                for (var i = 0; i < rows.length; i++) {
                                    if (rows[i]['日期'] == data[i]['日期']) {
                                        temp.push({
                                            "销售额": data[i]["销售额"],
                                            "日期": data[i]["日期"],
                                            "到店次数": data[i]["到店次数"],
                                            "外卖次数": rows[i]["外卖次数"],
                                        })
                                    } else {
                                        temp.push({
                                            "销售额": data[i]["销售额"],
                                            "日期": data[i]["日期"],
                                            "到店次数": data[i]["到店次数"],
                                            "外卖次数": 0,
                                        })
                                    }
                                }
                            }
                        }

                        for (var i = 0; i < rows.length; i++) {
                            if (data.length == 0) {
                                temp.push({
                                    "销售额": rows[i]["销售额"],
                                    "日期": rows[i]["日期"],
                                    "到店次数": 0,
                                    "外卖次数": rows[i]["外卖次数"],
                                })
                            } else {
                                for (var i = 0; i < data.length; i++) {
                                    if (rows[i]['日期'] != data[i]['日期']) {
                                        temp.push({
                                            "销售额": rows[i]["销售额"],
                                            "日期": rows[i]["日期"],
                                            "到店次数": 0,
                                            "外卖次数": rows[i]["外卖次数"],
                                        })
                                    }
                                }
                            }
                        }
                        resolve(temp);
                    }
                });
            } else {
                const shopsId = params[0];
                const startDate = params[1];
                const endDate = params[2];
                let sqlStr = 'SELECT cast(sum(money) as decimal(10,2)) AS "销售额",' +
                    ' pay_time AS "日期" ,count(*) AS "外卖次数" FROM' +
                    ' (SELECT money,DATE_FORMAT(pay_time , "%Y-%m-%d") AS pay_time FROM record_order_revoke' +
                    ' WHERE commercial_id = ? AND type = "1"' +
                    ' AND pay_time >= ? AND pay_time <= ?) AS tmpt' +
                    ' GROUP BY pay_time';

                executeSql(sqlStr, [shopsId, startDate, endDate], (err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr);
                    } else {
                        let temp = [];
                        //let saleData={};
                        for (var i = 0; i < data.length; i++) {
                            if (rows.length == 0) {
                                temp.push({
                                    "销售额": data[i]["销售额"],
                                    "日期": data[i]["日期"],
                                    "到店次数": data[i]["到店次数"],
                                    "外卖次数": 0,
                                })
                            } else {
                                for (var i = 0; i < rows.length; i++) {
                                    if (rows[i]['日期'] == data[i]['日期']) {
                                        temp.push({
                                            "销售额": data[i]["销售额"],
                                            "日期": data[i]["日期"],
                                            "到店次数": data[i]["到店次数"],
                                            "外卖次数": rows[i]["外卖次数"],
                                        })
                                    } else {
                                        temp.push({
                                            "销售额": data[i]["销售额"],
                                            "日期": data[i]["日期"],
                                            "到店次数": data[i]["到店次数"],
                                            "外卖次数": 0,
                                        })
                                    }
                                }
                            }
                        }

                        for (var i = 0; i < rows.length; i++) {
                            if (data.length == 0) {
                                temp.push({
                                    "销售额": rows[i]["销售额"],
                                    "日期": rows[i]["日期"],
                                    "到店次数": 0,
                                    "外卖次数": rows[i]["外卖次数"],
                                })
                            } else {
                                for (var i = 0; i < data.length; i++) {
                                    if (rows[i]['日期'] != data[i]['日期']) {
                                        temp.push({
                                            "销售额": rows[i]["销售额"],
                                            "日期": rows[i]["日期"],
                                            "到店次数": 0,
                                            "外卖次数": rows[i]["外卖次数"],
                                        })
                                    }
                                }
                            }
                        }
                        // console.log(temp);
                        resolve(temp);
                    }
                });
            }

        })

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

export function loadOrderRevokeDetail(req, params) {
    return new Promise((resolve, reject) => {
        const shopsId = params[0];
        const date = params[1];
        // console.log(shopsId,date);
        let sqlStr = 'SELECT  customer_id ,money,type,substring(pay_time,12,8) as "pay_time" FROM record_order_revoke'+
            ' WHERE commercial_id = ?'+
            ' AND DATE_FORMAT(pay_time , "%Y-%m-%d") = ? '
        executeSql(sqlStr, [shopsId, date], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                // console.log(rows);
                resolve(rows);
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//单个商户消费者分布图
export function loadSingleShopMap(req,params) {
    const shopsId = params[0];
    return new Promise((resolve,reject) =>{
        let sqlStr = 'select ' +
            'money,' +
            'customer_id,' +
            'AVG(longitude) as longitude,' +
            'AVG(latitude) as latitude' +
            ' from' +
            ' record_order' +
            ' where' +
            ' commercial_id = ?' +
            ' GROUP BY customer_id ';
        executeSql(sqlStr,[shopsId],(err,rows,field)=>{
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve(rows);
            }
        })
    })
        .catch((reason) =>{
            return Promise.reject({
                error: reason
            })
        })
}
export function loadShopWords(req,params) {
    return new Promise((resolve,reject) =>{
        let sqlStr = 'select sum(commercial_num) as "正常商户总数",' +
            ' sum(commercial_money_by_day) as "商户总销售额",' +
            ' sum(finish_orders) as "商户已完成订单数",' +
            ' sum(discount_money) as "商户优惠总额" ' +
            'from ' +
            'stat_commercial ' +
            'where ' +
            'stat_date <= DATE_FORMAT(ADDDATE(NOW(),-1), "%Y-%m-%d")';
        executeSql(sqlStr,(err,rows,field)=>{
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let temp = [];
                for (let key in rows[0]){
                    temp.push({
                        "name":key,
                        "value":rows[0][key]
                    })
                }
                resolve(temp);
            }
        })
    })
        .then((data)=>{
            return new Promise((resolve,reject)=>{
                let sqlStr = 'SELECT a.commercial_money_by_day as "商户日销售额",' +
                    'b.max_date, ' +
                    'a.commercial_num as "商户日增加数"' +
                    ' from stat_commercial a ,' +
                    '(select DATE_FORMAT( max(stat_date),"%Y-%m-%d") as max_date' +
                    ' from ' +
                    'stat_commercial) ' +
                    'b ' +
                    'where a.stat_date = b.max_date';
                executeSql(sqlStr,(err,rows,field)=>{
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        let temp = [];
                        for(let key in rows[0]){
                            if(key!=='max_date')
                                temp.push({
                                    "name":key,
                                    "value":rows[0][key]
                                })
                        }
                        for(let i = 0;i<data.length;i++){
                            temp.push(data[i]);
                        }
                        resolve(temp);
                    }
                })
            })
        })
}
//单个商铺的销售
export function loadSaleAnalysis(req, params) {
    const shopsId = params[0];
    return new Promise((resolve,reject) =>{
        let sqlStr = 'select count(*) as "店铺下单用户",' +
            ' sum(num) as "成交订单数",' +
            ' ROUND(sum(total_money),2) as "总销售额" ' +
            ' from (select customer_id, count(*) as num, sum(money) as total_money from record_order' +
            '  where commercial_id = ? ' +
            ' group by customer_id) as tmpt ';
        executeSql(sqlStr,[shopsId],(err,rows,field)=>{
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {

                resolve(rows);
            }
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = ' select count(*) as "退货数据" from record_order_revoke where commercial_id = ?' ;
            executeSql(sqlStr,shopsId, (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    let temp = [];
                    for(let key in data[0]){
                        temp.push({
                            "name":key,
                            "value":data[0][key]
                        })
                    }
                    temp.push({
                        "name":"退货数据",
                        "value":rows[0]["退货数据"]
                    })
                    resolve(temp);
                }
            });
        })
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        })
}
//单个商铺的消费者信用曲线
export function loadSingleShopUser(req, params){
    const shopsId = params[0];
    return new Promise((resolve,reject) =>{
        let sqlStr = 'select customer_avg_estimate, ' +
            'DATE_FORMAT(date,"%Y-%m-%d") as date ' +
            'from commercial_estimate ' +
            'where shopid = ? ' +
            'and ' +
            'customer_avg_estimate is not null ' +
            'order by date ';
        executeSql(sqlStr,[shopsId],(err,rows,field)=>{
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {

                resolve(rows);
            }
        })
    })
        .catch((reason)=>{
            return Promise.reject({
                error:reason
            })
        })
}
//销售情况数据概况
export function loadSaleData(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT COUNT(id) as id FROM order_pay_bak where state=2'
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    storeCount: rows,//到店用户数
                });
            }
        });
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT COUNT(id) as id FROM `order` where state=3'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        orderCount: rows,//订单数
                        storeCount: data.storeCount,//到店用户数
                    });
                }
            });


        }).then((data)=> {
            return new Promise((resolve, reject) => {
                let sqlStr = 'select sum(uid) from(' +
                    'SELECT distinct(COUNT(uid)) as uid FROM order_pay_bak' +
                    ' UNION ALL ' +
                    'SELECT distinct(COUNT(uid)) as uid FROM `order`)as tmp_t'
                executeSql(sqlStr, [], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        resolve({
                            orderUserCount: rows,//订单用户数
                            orderCount: data.orderCount,//订单数
                            storeCount: data.storeCount,//到店用户数
                        });
                    }
                });

            })

        }).then((data)=> {
            return new Promise((resolve, reject) => {
                let sqlStr = 'SELECT sum(total) FROM order_pay_bak where state=2'
                executeSql(sqlStr, [], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        resolve({
                            storeSumTotal: rows,//到店支付总额
                            orderUserCount: data.orderUserCount,//订单用户数
                            orderCount: data.orderCount,//订单数
                            storeCount: data.storeCount,//到店用户数
                        });
                    }
                });
            }).then((data)=> {
                return new Promise((resolve, reject) => {
                    let sqlStr = 'SELECT sum(total) FROM `order` where state=3'
                    executeSql(sqlStr, [], (err, rows, field)=> {
                        if (err)
                            reject('ERROR IN QUERY:' + sqlStr);
                        else {
                            resolve({
                                orderSumTotal: rows,//外卖支付总额
                                storeSumTotal: data.storeSumTotal,//到店支付总额
                                orderUserCount: data.orderUserCount,//订单用户数
                                orderCount: data.orderCount,//订单数
                                storeCount: data.storeCount,//到店用户数
                            });
                        }
                    });
                })
            })
        })

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    })
}
//每日订单量(查询的是每一天的订单量)
export function dayOrderCount(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'select from_unixtime(overtime,"%Y-%m-%d") as days,count(id) as count' +
            ' from order_pay_bak group by days order by days desc'

        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    orderCount: rows //外卖订单量
                });
            }
        });

    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'select from_unixtime(overtime,"%Y-%m-%d") as days,count(id) as count' +
                ' from `order` group by days order by days desc'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        storeCount: rows, //到店订单量
                        orderCount: data.orderCount //外卖订单量
                    });
                }
            });
        })
    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    })
}
//总销售()
export function loadSumSale(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'select from_unixtime(overtime,"%Y%m%d") as days,avg(total) as total' +
            ' from order_pay_bak group by days order by days desc'
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    dayStoreSale: rows //日到店
                });
            }
        });

    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'select from_unixtime(overtime,"%Y%m%d") as days,avg(total) as total' +
                ' from `order` group by days order by days desc'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        dayOrderSale: rows, //日外卖
                        dayStoreSale: data.dayStoreSale //日到店
                    });
                }
            });
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'select from_unixtime(overtime,"%Y%m%d") as days,avg(total) as total' +
                ' from `order` group by days order by days desc'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        monthStoreSale: rows,
                        dayOrderSale: data.dayOrderSale, //日外卖
                        dayStoreSale: data.dayStoreSale //日到店
                    });
                }
            });
        })

    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'select from_unixtime(overtime,"%Y%m") as months,avg(total) as total' +
                ' from `order` group by months order by months desc'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        monthOrederSale: rows, //月外卖
                        monthStoreSale: data.monthStoreSale, //月到店
                        dayOrderSale: data.dayOrderSale, //日外卖
                        dayStoreSale: data.dayStoreSale //日到店
                    });
                }
            });

        })
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })

        })

}

//商户数据概览详情20161119(....)
export function loadShopsData(req, params) {//商户数据概览Title
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT COUNT(id) FROM shops ' +
            ' WHERE state=1 AND FROM_UNIXTIME(`addtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d")'
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    shopsCountTotal: rows //商户总数
                });
            }
        });
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT SUM(total),shopsid FROM (' +
                'SELECT SUM(total) AS total,shopsid FROM order_pay_bak ' +
                ' WHERE state=2 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d")' +
                ' GROUP BY shopsid ' +
                ' UNION ALL ' +
                'SELECT SUM(total) AS total,shopsid FROM `order` ' +
                ' WHERE state=3 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") ' +
                ' GROUP BY shopsid) ' +
                'AS a GROUP BY shopsid'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        shopsSaleTotal: rows, //商户总销售额
                        shopsCountTotal: data.shopsCountTotal //商户总数
                    });
                }
            });
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT SUM(total),days,shopsid FROM (' +
                'SELECT SUM(total) AS total,FROM_UNIXTIME(overtime,"%Y-%m-%d") AS days,shopsid FROM order_pay_bak ' +
                ' WHERE state=2 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY days' +
                ' UNION ALL ' +
                'SELECT SUM(total) AS total,FROM_UNIXTIME(overtime,"%Y-%m-%d") AS days,shopsid FROM `order` ' +
                ' WHERE state=3 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY days)' +
                'AS a GROUP BY days ORDER BY days DESC'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        daySaleTotal: rows,//日销售额
                        shopsSaleTotal: data.shopsSaleTotal, //商户总销售额
                        shopsCountTotal: data.shopsCountTotal //商户总数
                    });
                }
            });

        })

    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT SUM(total),shopsid FROM (' +
                'SELECT DISTINCT(COUNT(uid)) AS total,shopsid FROM order_pay_bak ' +
                ' WHERE state=2 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY shopsid' +
                ' UNION ALL ' +
                'SELECT DISTINCT(COUNT(uid)) AS total,shopsid FROM `order` ' +
                ' WHERE state=3 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY shopsid)' +
                'AS a GROUP BY shopsid'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        allUsersCount: rows,//用户总数
                        daySaleTotal: data.daySaleTotal,//日销售额
                        shopsSaleTotal: data.shopsSaleTotal, //商户总销售额
                        shopsCountTotal: data.shopsCountTotal //商户总数
                    });
                }
            });
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT SUM(uid),days,shopsid FROM (' +
                'SELECT DISTINCT(COUNT(uid)) AS uid,FROM_UNIXTIME(overtime,"%Y-%m-%d") AS days,shopsid FROM order_pay_bak' +
                ' WHERE state=2 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY days,shopsid' +
                ' UNION ALL ' +
                'SELECT DISTINCT(COUNT(uid)) AS uid,FROM_UNIXTIME(overtime,"%Y-%m-%d") AS days,shopsid FROM `order`' +
                ' WHERE state=3 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY days,shopsid)' +
                'AS a GROUP BY shopsid,days ORDER BY days DESC'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        dayUsersCount: rows,//日用户总数
                        allUsersCount: data.allUsersCount,//用户总数
                        daySaleTotal: data.daySaleTotal,//日销售额
                        shopsSaleTotal: data.shopsSaleTotal, //商户总销售额
                        shopsCountTotal: data.shopsCountTotal //商户总数
                    });
                }
            });
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT AVG(`estimate`),shopid FROM `commercial_estimate` GROUP BY shopid'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        averageCreditValue: rows,//平均信用值
                        dayUsersCount: data.dayUsersCount,//日用户总数
                        allUsersCount: data.allUsersCount,//用户总数
                        daySaleTotal: data.daySaleTotal,//日销售额
                        shopsSaleTotal: data.shopsSaleTotal, //商户总销售额
                        shopsCountTotal: data.shopsCountTotal //商户总数
                    });
                }
            });
        })
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
//商户订单+商户优惠实际金额
export function loadShopsOrders(req, params) {//商户订单+商户优惠实际金额
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT SUM(tid) AS tid,shopsid FROM (' +
            'SELECT COUNT(id) AS tid,shopsid FROM order_pay_bak' +
            ' WHERE state=2 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY shopsid' +
            ' UNION ALL ' +
            'SELECT COUNT(id) AS tid,shopsid FROM `order`' +
            ' WHERE state=3 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY shopsid)' +
            'AS a GROUP BY shopsid ORDER BY tid DESC'

        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    paidOrders: rows //已完成订单数
                });
            }
        });
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT SUM(tid) AS tid,shopsid FROM (' +
                'SELECT COUNT(id) AS tid,shopsid FROM order_pay_bak ' +
                ' WHERE state=1 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY shopsid' +
                ' UNION ALL ' +
                'SELECT COUNT(id) AS tid,shopsid FROM `order` ' +
                ' WHERE paystate=1 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY shopsid)' +
                'AS a GROUP BY shopsid ORDER BY tid DESC'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        topayOrders: rows, //待付款订单
                        paidOrders: data.paidOrders //已完成订单数
                    });
                }
            });
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT SUM(dtotal) AS tid,shopsid FROM (' +
                'SELECT SUM(discount_actual_total) AS dtotal,shopsid FROM order_pay_bak' +
                ' WHERE state=2 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY shopsid' +
                ' UNION ALL ' +
                'SELECT SUM(discount_actual_total) AS dtotal,shopsid FROM `order`' +
                ' WHERE state=3 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY shopsid)' +
                'AS a GROUP BY shopsid ORDER BY tid DESC'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        discountedPrice: rows,//商户实际优惠金额
                        topayOrders: data.topayOrders, //待付款订单
                        paidOrders: data.paidOrders //已完成订单数
                    });
                }
            });

        })

    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
//销售额信用值
export function loadShopsCredit(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT estimate,shopid FROM `commercial_estimate`' +
            ' WHERE `date` >= "2016-08-01" AND `date` < "2016-08-10"'
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    timeCredit: rows //信用值(按时间日期)
                });
            }
        });
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT DATE_FORMAT(`date`,"%Y%u") weeks,estimate COUNT FROM commercial_estimate GROUP BY weeks'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        weekCredit: rows,//信用值(按周)
                        timeCredit: data //信用值(按时间日期)
                    });
                }
            });

        })

    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT DATE_FORMAT(`date`,"%Y%m%d") days,estimate COUNT FROM commercial_estimate GROUP BY days'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        dayCredit: rows,//信用值(按天)
                        weekCredit: data.weekCredit,//信用值(按周)
                        timeCredit: data //信用值(按时间日期)
                    });
                }
            });
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT DATE_FORMAT(`date`,"%Y%m") months,estimate COUNT FROM commercial_estimate GROUP BY months'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        mounthCredit: rows,//信用值(按月)
                        dayCredit: data.dayCredit,//信用值(按天)
                        weekCredit: data.weekCredit,//信用值(按周)
                        timeCredit: data //信用值(按时间日期)
                    });
                }
            });

        })

    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
//用户数据概览详情20161119(....)
export function loadUsersData(req, params) {//补贴总额
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT COUNT(id) FROM users WHERE user_type=1' +
            ' AND state=1 AND FROM_UNIXTIME(ADDTIME,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d")'
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    userCountTotal: rows //用户总数
                });
            }
        });
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT SUM(dtotal) AS total FROM (' +
                'SELECT SUM(discount_actual_total) AS dtotal,shopsid FROM order_pay_bak' +
                ' WHERE state=2 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d")' +
                ' UNION ALL ' +
                'SELECT SUM(discount_actual_total) AS dtotal,shopsid FROM `order`' +
                ' WHERE state=3 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d"))' +
                'AS a ORDER BY total DESC'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        userAllowance: rows, //用户补贴金额
                        userCountTotal: data.userCountTotal //用户总数
                    });
                }
            });
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT SUM(dtotal) AS tid,uid FROM (' +
                'SELECT SUM(total) AS dtotal,uid FROM order_pay_bak' +
                ' WHERE state=2 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY uid' +
                ' UNION ALL ' +
                'SELECT SUM(total) AS dtotal,uid FROM `order`' +
                ' WHERE state=3 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY uid)' +
                'AS a GROUP BY uid ORDER BY tid DESC'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        userSaleTotal: rows,//用户消费总额
                        userAllowance: data.userAllowance, //用户补贴金额
                        userCountTotal: data.userCountTotal //用户总数
                    });
                }
            });

        })

    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT AVG(estimate),customer_id FROM `customer_estimate` GROUP BY customer_id'

            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        userAverageCredit: rows,//用户平均信用值
                        userSaleTotal: data.userSaleTotal,//用户消费总额
                        userAllowance: data.userAllowance, //用户补贴金额
                        userCountTotal: data.userCountTotal //用户总数

                    });
                }
            });
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT ROUND(SUM(ttotal)/SUM(uid)*100,2) FROM(' +
                'SELECT COUNT(uid)-COUNT(DISTINCT uid) AS ttotal,COUNT(uid) AS uid FROM `order`' +
                ' WHERE FROM_UNIXTIME(overtime,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d")' +
                ' UNION ALL ' +
                'SELECT COUNT(uid)-COUNT(DISTINCT uid) AS ttotal,COUNT(uid) AS uid FROM `order_pay_bak`' +
                ' WHERE FROM_UNIXTIME(overtime,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d"))AS tep'

            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        userRebuyRate: rows,//用户复购率
                        userAverageCredit: data.userAverageCredit,//用户平均信用值
                        userSaleTotal: data.userSaleTotal,//用户消费总额
                        userAllowance: data.userAllowance, //用户补贴金额
                        userCountTotal: data.userCountTotal //用户总数

                    });
                }
            });

        })
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}
//用户消费金额(....)
export function loadUserSales(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT SUM(dtotal) AS tid,uid FROM (' +
            'SELECT SUM(total) AS dtotal,uid FROM order_pay_bak' +
            ' WHERE state=2 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY uid' +
            ' UNION ALL ' +
            'SELECT SUM(total) AS dtotal,uid FROM `order`' +
            ' WHERE state=3 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY uid)' +
            'AS a GROUP BY uid ORDER BY tid DESC'
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    userSale: rows //用户消费额
                });
            }
        });
    })
        .catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}