import mysql from 'mysql'
import executeSql from './database.js'
/*用户数据概览*/
export function UserOverview(req) {
    const params = req.body;
    const toDate = params.toDate;
    const fromDate = params.fromDate;
    const period = params.period;
    let valueList = {};
    let t={};
    let dateStr = '';
    let Str='';
    if(period == 'day'){
        dateStr = 'DATE_FORMAT(stat_customer.stat_date,"%Y-%m-%d") AS date';
    }else if(period == 'week'){
        dateStr = 'DATE_FORMAT(stat_customer.stat_date,"%x-%v") AS date';
    }else if(period == 'month'){
        dateStr = 'DATE_FORMAT(stat_customer.stat_date,"%x-%m") AS date';
    }

    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT ' +
            'SUM(stat_customer.total_customer_num) AS "用户总数",' +
            'ROUND(stat_customer.active_customer_ratio*100,2) AS "活跃用户率",' +
            'FLOOR(SUM(stat_customer.customer_dicount_money_by_day)) AS "用户补贴总额", '+
            'FLOOR(SUM(stat_customer.customer_consume_money_by_day)) AS "用户消费总额",' +
            'ROUND(stat_customer.avg_credit,2) AS "用户平均信用值",' +
            'ROUND(stat_customer.repeat_consume_ratio*100,2) AS "用户复购率",' +
            dateStr+
            ' FROM ' +
            ' stat_customer ' +
            ' WHERE ' +
            ' stat_customer.stat_date>=? AND stat_customer.stat_date<=?' +
            ' GROUP BY date' +
            ' ORDER BY date'
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                for(var i=0;i<rows.length;i++) {
                    let temp = [];
                    for (var key in rows[i]) {
                        if(key!== 'date')
                            switch (key){
                                case '用户补贴总额':
                                case '用户消费总额':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'元').value,
                                        "unit": dx(rows[i][key],'元').unit
                                    });
                                    break;
                                case '用户总数':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'人').value,
                                        "unit": dx(rows[i][key],'人').unit
                                    });
                                    break;
                                case '活跃用户率':
                                case '用户复购率':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'%').value,
                                        "unit": dx(rows[i][key],'%').unit
                                    });
                                    break;
                                case '用户平均信用值':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'').value,
                                        "unit": dx(rows[i][key],'').unit
                                    });
                                    break;
                            }
                    }
                    function dx(a,unit) {
                        if(a>10000 && a<10000000){
                            return {
                                "value":Math.round(a/10000*100)/100,
                                "unit":'万'+unit
                            }
                        }else if(a>=10000000){
                            return {
                                "value":Math.round(a/10000000*1000)/1000,
                                "unit":'千万'
                            }
                        }else{
                            return {
                                "value":a,
                                "unit":''+unit
                            }
                        }
                    }
                    valueList[rows[i]['date']]=temp;
                }

                resolve({
                    "valueList":valueList
                });

            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//用户消费额
export function UserConsumption(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_customer.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_customer.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_customer.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT ROUND(SUM(stat_customer.customer_consume_money_by_day))  AS "用户消费额",'+
            Str+
            ' FROM ' +
            'stat_customer' +
            ' WHERE ' +
            ' stat_customer.stat_date>=? AND stat_customer.stat_date<=?' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"用户消费额":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["用户消费额"][i] = (rows[i]["用户消费额"]/10000).toFixed(2);
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//用户信用值
export function UserCreditValue(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_customer.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_customer.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_customer.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT ROUND(stat_customer.avg_credit,3)  AS "用户信用值",'+
            Str+
            ' FROM ' +
            'stat_customer' +
            ' WHERE ' +
            ' stat_customer.stat_date>=? AND stat_customer.stat_date<=?' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"用户信用值":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["用户信用值"][i] = rows[i]["用户信用值"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//用户平均消费金额
export function averageConsumerSpending(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT ROUND(SUM(stat_sale.total_money)/SUM(stat_sale.buy_customer_num),3)  AS "平均消费金额",'+
            Str+
            ' FROM ' +
            'stat_sale' +
            ' WHERE ' +
            ' stat_sale.stat_date>=? AND stat_sale.stat_date<=?' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"用户平均消费额":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["用户平均消费额"][i] = rows[i]["平均消费金额"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

//单用户的消费曲线
export function UserConsumptionCurve(req,params) {
    const user_id = params[0];
    // console.log(params[0])
    return new Promise((resolve, reject)=>{
        let sqlStr = 'SELECT ROUND(SUM(money),2) AS money,' +
            'DATE_FORMAT(pay_time,"%Y-%m-%d") AS date ' +
            'FROM record_order WHERE customer_id = ? GROUP BY date ';
        executeSql(sqlStr,[user_id],(err,rows,field)=>{
            if(err){
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                resolve(rows)
            }
        })
    })
}
//补贴总额
export function loadAllowance(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT SUM(dis_total)FROM(' +
            'SELECT SUM(discount_actual_total) AS dis_total FROM order_pay_bak ' +
            ' WHERE state=2 AND FROM_UNIXTIME(overtime,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d")' +
            ' UNION ALL ' +
            'SELECT SUM(discount_actual_total) AS dis_total FROM `order` ' +
            ' WHERE state=3 AND FROM_UNIXTIME(overtime,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d"))AS oa'
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    userAllowance: rows //用户补贴金额
                });
            }
        });
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT SUM(rew_price)FROM(' +
                'SELECT SUM(reward_price) AS rew_price FROM order_pay_bak ' +
                ' WHERE state=2 AND FROM_UNIXTIME(overtime,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d")' +
                ' UNION ALL ' +
                'SELECT SUM(reward_price)AS rew_price FROM `order` ' +
                ' WHERE state=3 AND FROM_UNIXTIME(overtime,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d"))AS rp'
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        shopAllowance: rows, //商户补贴金额
                        userAllowance: data.userAllowance //用户补贴金额
                    });
                }
            });
        })
    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
export function SingleUser(req) {
    return new Promise((resolve, reject)=>{
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        const userId = params.userId;
        console.log(params);
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(pay_time,"%Y-%m-%d") as pay_time,';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(pay_time,"%x-%v") as pay_time,';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(pay_time,"%x-%m") as pay_time,'
        }
        let sqlStr = 'SELECT FLOOR(SUM(money)) AS money,' +
            'pay_time ' +
            'FROM (select ' +
             Str +
            'money from record_order where customer_id = ? AND pay_time>=? AND pay_time<=?) a' +
            ' GROUP BY pay_time order by pay_time ';
        executeSql(sqlStr,[userId,fromDate,toDate],(err,rows,field)=>{
            if(err){
                reject('ERROR IN QUERY:' + sqlStr);
                console.log(sqlStr);
            } else {
                console.log('rows',rows)
                let xData = []; 
                let yData = {"单用户销售分析":[]}; 
                for(var i=0; i<rows.length; i++) { 
                    xData[i] = rows[i]["pay_time"]; 
                    yData["单用户销售分析"][i] = rows[i]["money"]; 
                }
                //console.log(xData,yData); 
                resolve({ 
                    "xData":xData, 
                    "yData":yData 
                });
            }
        })
    }).catch((reason) => { 
        return Promise.reject({ 
            error: reason 
        }) 
    });
}

/*销售数据详情概览20161118*/
//销售情况总览
export function salesOverview(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;

        let dateStr = '';
        if(period == 'day'){
            dateStr = 'DATE_FORMAT(stat_sale.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            dateStr = 'DATE_FORMAT(stat_sale.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            dateStr = 'DATE_FORMAT(stat_sale.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT ' +
            'FLOOR(SUM(stat_sale.arrive_money_by_day)) AS "到店支付总额",' +
            'FLOOR(SUM(stat_sale.take_out_money_by_day)) AS "外卖支付总额", '+
            'FLOOR(SUM(stat_sale.arrive_pay_num)) AS "到店支付数",' +
            'SUM(stat_sale.take_out_num) AS "外卖支付数",' +
            'SUM(stat_sale.arrive_customer_num) AS "订单用户数",' +
            dateStr+
            ' FROM ' +
            ' stat_sale ' +
            ' WHERE ' +
            ' stat_sale.stat_date>=? AND stat_sale.stat_date<=?' +
            ' GROUP BY date' +
            ' ORDER BY date'
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {

                let valueList = {};
                for(var i=0;i<rows.length;i++) {
                    let temp = [];
                    for (var key in rows[i]) {
                        // console.log('key',key)
                        if(key!== 'date')
                            switch (key){
                                case '外卖支付总额':
                                case '到店支付总额':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'元').value,
                                        "unit": dx(rows[i][key],'元').unit
                                    });
                                    break;
                                case '到店支付数':
                                case '外卖支付数':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'单').value,
                                        "unit": dx(rows[i][key],'单').unit
                                    });
                                    break;
                                case '订单用户数':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'人').value,
                                        "unit": dx(rows[i][key],'人').unit
                                    });
                                    break;
                            }
                    }
                    function dx(a,unit) {
                        if(a>10000 && a<10000000){
                            return {
                                "value":Math.round(a/10000*100)/100,
                                "unit":'万'+unit
                            }
                        }else if(a>=10000000){
                            return {
                                "value":Math.round(a/10000000*1000)/1000,
                                "unit":'千万'
                            }
                        }else{
                            return {
                                "value":a,
                                "unit":''+unit
                            }
                        }
                    }
                    valueList[rows[i]['date']]=temp;
                }
                resolve({
                    "valueList":valueList
                });



            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

// 购买用户数
export function buyUserCount(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;


        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT SUM(stat_sale.buy_customer_num) AS sumNum,'+
            Str+
            ' FROM ' +
            'stat_sale' +
            ' WHERE ' +
            ' stat_sale.stat_date>=? AND stat_sale.stat_date<=?' +
            ' GROUP BY date ' +
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"购买用户数":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["购买用户数"][i] = rows[i]['sumNum'];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//每日订单量
export function DailyOrder(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT ' +
            'SUM(stat_sale.arrive_pay_num) AS "到店支付数",' +
            'SUM(stat_sale.take_out_num) AS "外卖支付数",' +
            Str+
            ' FROM ' +
            ' stat_sale ' +
            ' WHERE ' +
            ' stat_sale.stat_date>=? AND stat_sale.stat_date<=?' +
            ' GROUP BY date' +
            ' ORDER BY date'
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"外卖":[],"到店":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["外卖"][i] = rows[i]['外卖支付数'];
                    yData["到店"][i] = rows[i]['到店支付数'];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
// 总销量
export function TotalSalesVolume(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%Y-%m-%d") AS date';

        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%x-%v") AS date';

        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT' +
            ' FLOOR(SUM(stat_sale.take_out_money_by_day)) AS "外卖金额",' +
            ' FLOOR(SUM(stat_sale.arrive_money_by_day)) AS "到店金额",' +
            ' FLOOR(SUM(stat_sale.total_money)) AS "销售总额",' +
            Str+
            ' FROM ' +
            ' stat_sale ' +
            ' WHERE ' +
            ' stat_sale.stat_date>=? AND stat_sale.stat_date<=?' +
            ' GROUP BY date ' +
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"外卖金额":[],"到店金额":[],"总金额":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["外卖金额"][i] = (rows[i]['外卖金额']/10000).toFixed(2);
                    yData["到店金额"][i] = (rows[i]['到店金额']/10000).toFixed(2);
                    yData["总金额"][i] = (rows[i]['销售总额']/10000).toFixed(2);
                }

                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//日订单均价
export function Dayprice(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_sale.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT' +
            ' FLOOR(SUM(stat_sale.take_out_money_by_day)/SUM(stat_sale.take_out_num_by_day)) AS "外卖均价",' +
            ' FLOOR(SUM(stat_sale.arrive_money_by_day)/SUM(stat_sale.arrive_num_by_day)) AS "到店均价",' +
            Str+
            ' FROM ' +
            ' stat_sale ' +
            ' WHERE ' +
            ' stat_sale.stat_date>=? AND stat_sale.stat_date<=?' +
            ' GROUP BY date ' +
            ' ORDER BY date'
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"外卖":[],"到店":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["外卖"][i] = rows[i]["外卖均价"] == null?0:rows[i]['外卖均价'];
                    yData["到店"][i] = rows[i]["到店均价"] == null?0:rows[i]['到店均价'];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//贴补总额
export function totalIncome(req) {
    const params = req.body;
    const toDate = params.toDate;
    const fromDate = params.fromDate;
    const period = params.period;
    return new Promise((resolve, reject) => {
        let Str1 = '';
        if(period == 'day'){
            Str1 = 'DATE_FORMAT(stat_sale.stat_date,"%Y-%m-%d") AS dayDate';
        }else if(period == 'week'){
            Str1 = 'DATE_FORMAT(stat_sale.stat_date,"%x-%v") AS dayDate';
        }else if(period == 'month'){
            Str1 = 'DATE_FORMAT(stat_sale.stat_date,"%x-%m") AS dayDate';
        }
        let sqlStr = 'SELECT FLOOR(SUM(stat_sale.discount_total)) AS "补贴金额",'+
            Str1+
            ' FROM ' +
            'stat_sale' +
            ' WHERE ' +
            ' stat_sale.stat_date>=? AND stat_sale.stat_date<=?' +
            ' GROUP BY dayDate' +
            ' ORDER BY dayDate'
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"贴补总额":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].dayDate;
                    yData["贴补总额"][i] = rows[i]["补贴金额"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

/*商户数据概览*/
//商户数据概览
export function ShopsOverview(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let dateStr = '',dateSql = '';
        if(period == 'day'){
            dateStr = 'DATE_FORMAT(stat_commercial.stat_date,"%Y-%m-%d") AS date';
            dateSql = 'SUM(stat_commercial.commercial_num) AS "日商户增长数",' +
                'FLOOR(SUM(stat_commercial.commercial_money_by_day)) AS "日销售额",' +
                'SUM(stat_commercial.commercial_customer_by_day) AS "每日消费用户数",' +
                'ROUND(SUM(stat_commercial.avg_credit),2) AS "平均信用值",'
        }else if(period == 'week'){
            dateStr = 'DATE_FORMAT(stat_commercial.stat_date,"%x-%v") AS date';
            dateSql = 'SUM(stat_commercial.commercial_num) AS "周商户增长数",' +
                'FLOOR(SUM(stat_commercial.commercial_money_by_day)) AS "周销售额",' +
                'SUM(stat_commercial.commercial_customer_by_day) AS "每周消费用户数",' +
                'ROUND(SUM(stat_commercial.avg_credit)/7,2) AS "平均信用值",'
        }else if(period == 'month'){
            dateStr = 'DATE_FORMAT(stat_commercial.stat_date,"%x-%m") AS date';
            dateSql = 'SUM(stat_commercial.commercial_num) AS "月商户增长数",' +
                'FLOOR(SUM(stat_commercial.commercial_money_by_day)) AS "月销售额",' +
                'SUM(stat_commercial.commercial_customer_by_day) AS "每月消费用户数",' +
                'ROUND(SUM(stat_commercial.avg_credit)/30,2) AS "平均信用值",'
        }
        let sqlStr = 'SELECT ' +
            // 'SUM(stat_commercial.commercial_num) AS "商户总数",' +
            'FLOOR(SUM(stat_commercial.commercial_money)) AS "商户总销售额",' +
            dateSql +
            // 'SUM(stat_commercial.commercial_customer_num) AS "用户总数", '+
            // 'SUM(stat_commercial.commercial_customer_by_day) AS "每日消费用户数",' +
            // 'ROUND(SUM(stat_commercial.avg_credit),2) AS "平均信用值",' +
            'SUM(stat_commercial.finish_orders) AS "已完成订单数",' +
            'SUM(stat_commercial.pay_orders) AS "未完成订单",' +
            'SUM(stat_commercial.finish_orders)+SUM(stat_commercial.pay_orders) AS "总订单数",' +
            'FLOOR(SUM(stat_commercial.discount_money)) AS "折扣金额",' +

            dateStr+
            ' FROM ' +
            ' stat_commercial ' +
            ' WHERE ' +
            ' stat_commercial.stat_date>=? AND stat_commercial.stat_date<=?' +
            ' GROUP BY date' +
            ' ORDER BY date'
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let valueList = {};
                for(var i=0;i<rows.length;i++) {
                    let temp = [];
                    for (var key in rows[i]) {
                        // console.log('key',key)
                        if(key!== 'date')
                            switch (key){
                                case '商户总销售额':
                                case '折扣金额':
                                case '日销售额':
                                case '周销售额':
                                case '月销售额':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'元').value,
                                        "unit": dx(rows[i][key],'元').unit
                                    });
                                    break;
                                case '已完成订单数':
                                case '未完成订单':
                                case '总订单数':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'单').value,
                                        "unit": dx(rows[i][key],'单').unit
                                    });
                                    break;
                                case '平均信用值':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'').value,
                                        "unit": dx(rows[i][key],'').unit
                                    });
                                    break;
                                case '日商户增长数':
                                case '周商户增长数':
                                case '月商户增长数':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'个').value,
                                        "unit": dx(rows[i][key],'个').unit
                                    });
                                    break;
                                case '每日消费用户数':
                                case '每周消费用户数':
                                case '每月消费用户数':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'人').value,
                                        "unit": dx(rows[i][key],'人').unit
                                    });
                                    break;
                            }
                    }
                    function dx(a,unit) {
                        if(a>10000 && a<10000000){
                            return {
                                "value":Math.round(a/10000*100)/100,
                                "unit":'万'+unit
                            }
                        }else if(a>=10000000){
                            return {
                                "value":Math.round(a/10000000*1000)/1000,
                                "unit":'千万'
                            }
                        }else{
                            return {
                                "value":a,
                                "unit":''+unit
                            }
                        }
                    }
                    valueList[rows[i]['date']]=temp;
                }
                resolve({
                    "valueList":valueList
                });
            }
        });
    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//消费额
export function ShopsConsumption(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_commercial.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_commercial.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_commercial.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT FLOOR(SUM(stat_commercial.commercial_money_by_day))  AS " 消费额",'+
            Str+
            ' FROM ' +
            'stat_commercial' +
            ' WHERE ' +
            ' stat_commercial.stat_date>=? AND stat_commercial.stat_date<=?' +
            ' GROUP BY date'+
            ' ORDER BY date'
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"销售额":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["销售额"][i] = (rows[i]["消费额"]/10000).toFixed(2);
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//信用值
export function ShopsCreditValue(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'SELECT ROUND(SUM(stat_commercial.avg_credit),3)  AS "信用值",' +
                'DATE_FORMAT(stat_commercial.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'SELECT ROUND(SUM(stat_commercial.avg_credit)/7,3)  AS "信用值",' +
                'DATE_FORMAT(stat_commercial.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'SELECT ROUND(SUM(stat_commercial.avg_credit)/30,3)  AS "信用值",' +
                'DATE_FORMAT(stat_commercial.stat_date,"%x-%m") AS date';
        }
        let sqlStr = Str+
            ' FROM ' +
            'stat_commercial' +
            ' WHERE ' +
            ' stat_commercial.stat_date>=? AND stat_commercial.stat_date<=?' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"商户信用值":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["商户信用值"][i] = rows[i]["信用值"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}


//用户数
export function NumbeOfUsers(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_commercial.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_commercial.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_commercial.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT FLOOR(SUM(stat_commercial.commercial_customer_num))  AS "用户数",'+
            Str+
            ' FROM ' +
            'stat_commercial' +
            ' WHERE ' +
            ' stat_commercial.stat_date>=? AND stat_commercial.stat_date<=?' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"用户数":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["用户数"][i] = rows[i]["用户数"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//订单数
export function OrderNumber(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_commercial.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_commercial.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_commercial.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT '+
            'SUM(stat_commercial.finish_orders) AS "已完成订单数",' +
            'SUM(stat_commercial.pay_orders) AS "待付款订单",' +
            Str+
            ' FROM ' +
            'stat_commercial' +
            ' WHERE ' +
            ' stat_commercial.stat_date>=? AND stat_commercial.stat_date<=?' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                let xData = [];
                let yData = {"已付款":[],"未付款":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["已付款"][i] = rows[i]["已完成订单数"];
                    yData["未付款"][i] = rows[i]["待付款订单"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}



/*商品数据概览*/ //有问题
export function CommodityOverview(req) {
    const params = req.body;
    const toDate = params.toDate;
    const fromDate = params.fromDate;
    const period = params.period;
    return new Promise((resolve, reject) => {
        let dateStr = '';
        if(period == 'day'){
            dateStr = 'DATE_FORMAT(stat_goods_sale.stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            dateStr = 'DATE_FORMAT(stat_goods_sale.stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            dateStr = 'DATE_FORMAT(stat_goods_sale.stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT count(stat_goods_sale.goods_type_id) AS "新增商品类型",' +
            dateStr +
            ' FROM ' +
            ' stat_goods_sale ' +
            ' WHERE ' +
            ' stat_goods_sale.type =0 AND ' +
            ' stat_goods_sale.stat_date>=? AND stat_goods_sale.stat_date<=? ' +
            ' GROUP BY date ' +
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve(rows);
            }
        })
    })
    .then((data)=> {
        return new Promise((resolve, reject) => {
            let dateStr = '';
            if(period == 'day'){
                dateStr = 'DATE_FORMAT(stat_goods.stat_date,"%Y-%m-%d") AS date';
            }else if(period == 'week'){
                dateStr = 'DATE_FORMAT(stat_goods.stat_date,"%x-%v") AS date';
            }else if(period == 'month'){
                dateStr = 'DATE_FORMAT(stat_goods.stat_date,"%x-%m") AS date';
            }
            let sqlStr = 'SELECT SUM(stat_goods.sku_num) AS 新增sku,' +
                dateStr +
                ' FROM stat_goods ' +
                ' WHERE  stat_goods.stat_date>=? AND stat_goods.stat_date<=?'+
                ' GROUP BY date ' +
                ' ORDER BY date'
            executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    let list = {};
                    for(var i=0;i<rows.length;i++){
                        let temp = [];
                        temp.push({
                            "valueName":'新增商品类型',
                            "value": 0,
                            "unit": '种'
                        },{
                            "valueName":'新增sku',
                            "value": rows[i]['新增sku'],
                            "unit": '个'
                        });
                        list[rows[i]['date']] = temp;
                    }
                    for(var i=0;i<data.length;i++) {
                        let temp = [];
                        if (list[data[i]['date']]) {
                            list[data[i]['date']][0] =  {
                                "valueName": '新增商品类型',
                                "value": data[i]['新增商品类型'],
                                "unit": '种'
                            };
                        } else {
                            temp.push({
                                "valueName": '新增商品类型',
                                "value": data[i]['新增商品类型'],
                                "unit": '种'
                            }, {
                                "valueName": '新增sku',
                                "value": 0,
                                "unit": '个'
                            })
                            list[data[i]['date']] = temp;
                        }
                    }
                    resolve({
                        "valueList":list
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

export function TotalSalesTop10(req) {
    return new Promise((resolve, reject) => {
        let sqlStr ='SELECT ' +
            ' dict_goods_type.goods_type_name AS "商品类型",' +
            'ROUND(stat_goods_sale.weights,3) AS "weights",' +
            'DATE_FORMAT(stat_goods_sale.stat_date,"%Y-%m-%d") AS date'+
            ' FROM ' +
            ' stat_goods_sale' +
            ' LEFT OUTER JOIN dict_goods_type ON dict_goods_type.goods_type_id = stat_goods_sale.goods_type_id '+
            ' WHERE ' +
            ' stat_goods_sale.type =0  '+
            ' GROUP BY weights DESC LIMIT 10'
        executeSql(sqlStr, (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                if(rows.length>0){
                    let valueColumn = {};
                    let date = {};
                    let temp = [];
                    let tempSame = rows[0]['date'];
                    for(var i=0;i<rows.length;i++) {
                        if(!date[rows[i]['date']]) {
                            tempSame = rows[i]['date'];
                            temp.push({
                                "xData": rows[i]["商品类型"],
                                "value": rows[i]["weights"]
                            });
                        }
                    }
                    valueColumn[tempSame] = temp;
                    resolve({
                        "valueColumn":valueColumn
                    });
                }

            }
        });
    })
        .catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//商品类型昨日销量Top10
export function SalesYesterdayTop10(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr ='SELECT ' +
            ' dict_goods_type.goods_type_name  AS "商品类型",' +
            'ROUND(stat_goods_sale.weights,3) AS "weights",' +
            'DATE_FORMAT(stat_goods_sale.stat_date,"%Y-%m-%d") AS date'+
            ' FROM ' +
            ' stat_goods_sale' +
            ' LEFT OUTER JOIN dict_goods_type ON dict_goods_type.goods_type_id = stat_goods_sale.goods_type_id '+
            ' WHERE ' +
            ' stat_goods_sale.type =1'+
            ' GROUP BY weights DESC LIMIT 10'
        executeSql(sqlStr, (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                console.log('data',rows)
                if(rows.length>0){
                    let valueColumn = {};
                    let date = {};
                    let temp = [];
                    let tempSame = rows[0]['date'];
                    for(var i=0;i<rows.length;i++) {
                        if(!date[rows[i]['date']]) {
                            tempSame = rows[i]['date'];
                            temp.push({
                                "xData": rows[i]["商品类型"],
                                "value": rows[i]["weights"]
                            });

                        }
                    }
                    valueColumn[tempSame] = temp;
                    resolve({
                        "valueColumn":valueColumn
                    });
                }

            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}
//用户信用值(....)
export function loadUserCredit(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT estimate,customer_id FROM `customer_estimate` WHERE `date`=(SELECT MAX(DATE) FROM customer_estimate)'
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    userCredit: rows //用户信用值
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
//用户平均消费额
export function loadUserAvgSale(req, params) {
    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT AVG(dtotal) AS tid,uid FROM (' +
            'SELECT SUM(total) AS dtotal,uid FROM order_pay_bak' +
            ' WHERE state=2 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY uid' +
            ' UNION ALL ' +
            'SELECT SUM(total) AS dtotal,uid FROM `order` ' +
            ' WHERE state=3 AND FROM_UNIXTIME(`overtime`,"%Y%m%d")<=DATE_FORMAT(ADDDATE(NOW(),-1), "%Y%m%d") GROUP BY uid)' +
            'AS a GROUP BY uid ORDER BY tid DESC'
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    userAvgSale: rows //用户平均消费额
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

//API调用记录
export function loadAPIRecord(req) {
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
    const dateFrom = params.dateFrom;
    const dateTo = params.dateTo;

    if (searchText != '') {
        advancedFilterStr += ' where api_func LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR content LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR ip LIKE "%' + searchText + '%"';
    }
    if (dateFrom != '') {
        if (advancedFilterStr == '')
            advancedFilterStr = ' where ';
        else
            advancedFilterStr += ' AND ';
        advancedFilterStr += ' Date(record_time) >= "' + dateFrom + '" AND Date(record_time) <="' + dateTo + '"';

    }

    return new Promise((resolve, reject) => {

        let sqlStr = 'select api_func as "接口名称", DATE_FORMAT(record_time, "%Y-%m-%d") as "时间",content as "内容" ,ip as "IP" from log_api '
            + advancedFilterStr + ' order by record_time DESC limit ?,?';
        executeSql(sqlStr, [parseInt((page - 1) * pageLineCount), parseInt(pageLineCount)], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    apiRecordData: rows
                });
            }
        });
    }).then((data)=> {
            return new Promise((resolve, reject) => {
                let sqlStr = 'select count(id) from log_api ' + advancedFilterStr;

                executeSql(sqlStr, [], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        resolve({
                            apiCount: rows[0]['count(id)'],
                            apiRecordData: data.apiRecordData
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

//系统日志
export function loadSystemLog(req) {
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
    const dateFrom = params.dateFrom;
    const dateTo = params.dateTo;
    if (searchText != '') {
        advancedFilterStr += ' AND ( user.user_real_name LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR user.user_platform_name LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR log_sys.content LIKE "%' + searchText + '%"';
        advancedFilterStr += ' OR log_sys.log_time LIKE "%' + searchText + '%" ) ';
    }
    if (dateFrom != '') {
        advancedFilterStr += ' AND ';
        advancedFilterStr += ' Date(log_sys.log_time) >= "' + dateFrom + '" AND Date(log_sys.log_time)<="' + dateTo + '"';
    }
    var APIRecordColumnList = ['用户名', '用户平台名', '内容', '日志时间'];

    return new Promise((resolve, reject) => {

        let sqlStr = 'select user.user_real_name as "用户名",user.user_platform_name as "用户平台名",log_sys.content as "内容",DATE_FORMAT(log_sys.log_time, "%Y-%m-%d") as "日志时间" from log_sys,user' +
            ' WHERE log_sys.user_id=user.user_id ' + advancedFilterStr + ' order by log_sys.log_time DESC limit ?,?';
        executeSql(sqlStr, [parseInt((page - 1) * pageLineCount), parseInt(pageLineCount)], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    systemLogData: rows
                });
            }
        });
    }).then((data)=> {
            return new Promise((resolve, reject) => {
                let sqlStr = 'select count(id) from log_sys,user ' +
                    ' WHERE log_sys.user_id=user.user_id ' + advancedFilterStr;
                executeSql(sqlStr, [], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        resolve({
                            systemLogCount: rows[0]['count(id)'],
                            systemLogData: data.systemLogData
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
//用户管理
export function QueryUserManageTable(req) {
    const params = req.body;
    const searchText_Platform = params.searchText_Platform ? params.searchText_Platform.trim() : '';
    const searchText_Src = params.searchText_Src ? params.searchText_Src.trim() : '';
    const searchText_Dst = params.searchText_Dst ? params.searchText_Dst.trim() : '';
    let advancedFilterStr = '';

    if (searchText_Platform != '' || searchText_Src != '' || searchText_Dst != '' ) {
            advancedFilterStr = ' where (user.user_real_name LIKE "%' + searchText_Platform + '%"'+
                                ' OR user.user_platform_name LIKE "%' + searchText_Platform + '%"' +
                                ' OR user.user_activity  LIKE "%' + searchText_Platform + '%")' +
                                ' AND dict_user_type.user_type_name LIKE "%' + searchText_Src + '%" ' +
                                ' AND  platform.platform_name LIKE "%' + searchText_Dst + '%" ' ;
    }

    return new Promise((resolve, reject) => {
        let sqlStr = 'SELECT' +
            ' `user`.user_platform_name as 用户名, `user`.user_real_name as 真实姓名,`user`.user_phone as 电话,`user`.user_activity 状态,' +
            ' dict_user_type.user_type_name as 用户类型,platform.platform_name as 平台类型,`user`.user_id'+
            ' FROM `user`' +
            ' LEFT JOIN platform ON platform.platform_type_id = `user`.platform_id' +
            ' LEFT JOIN dict_user_type ON dict_user_type.user_type_id = `user`.user_type_id'+advancedFilterStr;

        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    mappingUserData: rows
                });
            }
        });
    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

export function loadColumnList(req) {
    return new Promise((resolve, reject) => {
        let sqlStr ='select user_type_name from dict_user_type ';
        executeSql(sqlStr, [], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve({
                    userTypeData: rows
                });
            }
        });

    })
        .then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr ='select platform_name from platform';

            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr);
                else {
                    resolve({
                        platformTypeData:rows,
                        userTypeData: data.userTypeData
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

//单商户销售分析
export function SingleShopSales(req,params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        const shopsId = params.shopsId;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(pay_time,"%Y-%m-%d") as pay_time,';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(pay_time,"%x-%v") as pay_time,';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(pay_time,"%x-%m") as pay_time,'
        }
        let sqlStr = 'select FLOOR(sum(money)) as money, ' +
            'pay_time ' +
            'from (select ' +
            Str +
            'money from record_order where commercial_id = ? AND pay_time>=? AND pay_time<=?) a ' +
            'group by pay_time ORDER BY pay_time'
        executeSql(sqlStr, [shopsId,fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                console.log('rows',rows);
                let xData = [];
                let yData = {"单商户销售分析":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i]["pay_time"];
                    yData["单商户销售分析"][i] = rows[i]["money"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });

}
//单商户订单分析
export function SingleShopOrder (req) {
    const params = req.body;
    const toDate = params.toDate;
    const fromDate = params.fromDate;
    const period = params.period;
    const shopsId = params.shopsId;
    let Str = '';
    if(period == 'day'){
        Str = 'DATE_FORMAT(pay_time,"%Y-%m-%d") as pay_time,';
    }else if(period == 'week'){
        Str = 'DATE_FORMAT(pay_time,"%x-%v") as pay_time,';
    }else if(period == 'month'){
        Str = 'DATE_FORMAT(pay_time,"%x-%m") as pay_time,'
    }
    return new Promise((resolve, reject) => {
        let sqlStr = 'select count(*) as "成功订单数", ' +
            'pay_time from (select ' +
            Str +
            ' money from record_order where commercial_id = ?' +
            ' AND pay_time >=? AND pay_time <=? ) a group by pay_time';
        executeSql(sqlStr, [shopsId,fromDate,toDate], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr);
            else {
                resolve(rows);
            }
        });

    })
        .then((data)=> {
            return new Promise((resolve, reject) => {
                let sqlStr ='select count(*) as "退单数", ' +
                    'pay_time from (select ' +
                    Str +
                    'money from record_order_revoke where commercial_id = ?' +
                    ' AND pay_time >=? AND pay_time <=?) a group by pay_time';
                executeSql(sqlStr, [shopsId,fromDate,toDate], (err, rows, field)=> {
                    if (err)
                        reject('ERROR IN QUERY:' + sqlStr);
                    else {
                        let time = {};
                        for(let i=0;i<data.length;i++){
                            time[data[i]['pay_time']] = i+1;
                            data[i]['退单数'] = 0;
                        }
                        for(let i=0;i<rows.length;i++){
                            rows[i]['成功订单数'] = 0;
                        }
                        for(let i=0;i<rows.length;i++){
                            if(time[rows[i]['pay_time']]){
                                data[time[rows[i]['pay_time']]-1]['退单数'] = rows[i]['退单数'];
                            }else{
                                data.push(rows[i]);
                            }
                        }
                        let xData = [];
                        let yData = {"成功":[],"退单":[]};
                        for(let i=0;i<data.length;i++){
                            xData[i] = data[i]['pay_time'];
                            yData["成功"][i] = data[i]["成功订单数"];
                            yData["退单"][i] = data[i]["退单数"];
                        }
                        resolve({
                            "xData":xData,
                            "yData":yData
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

export function loadShopLoan(req, params) {
    return new Promise((resolve, reject) => {
        const shopsId = params[0];
        let sqlStr = 'SELECT scheme,loan_profit,loan_money,loan_rate,loan_last,loan_term,loan_profit,credit,first_risk,'+
            ' DATE_FORMAT(loan_bgn_time,"%Y-%m-%d") as "贷款开始时间",DATE_FORMAT(loan_end_time,"%Y-%m-%d") as "贷款结束时间"' +
            ' from loan_commercial where commercial_id=? order by scheme asc'
        executeSql(sqlStr, [shopsId], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                resolve({
                    loanData: rows
                });
            }
        });
    })
        .then((data)=> {
            return new Promise((resolve, reject) => {
                if(data.loanData.length > 0){
                    if(data.loanData[0]['scheme']==0){
                        const shopsId = params[0];
                        let sqlStr = 'select DATE_FORMAT(pay_time,"%Y-%m-%d") as "还款时间", loan_commercial_pay.pay_money as "还款金额",loan_commercial_pay.pay_risk as "风险评估" from loan_commercial_pay'+
                            ' where loan_id=(select id from loan_commercial where commercial_id=?) order by pay_time desc ';
                        executeSql(sqlStr, [shopsId], (err, rows, field)=> {
                            if (err){
                                reject('ERROR IN QUERY:' + sqlStr);
                            }
                            else {
                                resolve({
                                    repayRecord: rows,
                                    loanData: data.loanData
                                });
                            }
                        });
                    }else {
                        resolve({
                            repayRecord: [],
                            loanData: data.loanData
                        });
                    }
                }else {
                    resolve({
                        repayRecord: [],
                        loanData: data.loanData
                    });
                }
            })
        })
        .then((data)=> {
            return new Promise((resolve, reject) => {
                if(data.loanData.length>0){
                    if(data.loanData[0]['scheme']==0){
                        const shopsId = params[0];
                        let sqlStr = 'select sum(pay_money) as "已还款金额" from loan_commercial_pay where loan_id=(select id from loan_commercial where commercial_id=?)';
                        executeSql(sqlStr, [shopsId], (err, rows, field)=> {
                            if (err)
                                reject('ERROR IN QUERY:' + sqlStr);
                            else {
                                resolve({
                                    sumMoney: rows,
                                    repayRecord: data.repayRecord,
                                    loanData: data.loanData
                                });
                            }
                        });
                    }else {
                        resolve({
                            sumMoney: [],
                            repayRecord: data.repayRecord,
                            loanData: data.loanData
                        });
                    }
                }else {
                    resolve({
                        sumMoney: [],
                        repayRecord: data.repayRecord,
                        loanData: data.loanData
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

export function loadShopLoanRisk(req, params) {
    const shopsId = params[0];
    return new Promise((resolve, reject) => {
        let sqlStr = 'select DATE_FORMAT(pay_date,"%Y-%m-%d") as "时间",day_risk as "风险值"' +
            ' from stat_commercial_risk_vector' +
            ' where commercial_id= ? and day_risk is not NULL order by pay_date asc '
        executeSql(sqlStr, [shopsId], (err, rows, field)=> {
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


//事件分析列表
export function loadEventColumn(req, params) {
    return new Promise((resolve, reject) => {
        const shopsId = params[0];
        let sqlStr = 'SELECT page_name as "事件名",event from dict_page_title '
        executeSql(sqlStr, (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                resolve({
                    eventCoulumn: rows
                });
            }
        });
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            let sqlStr = 'SELECT page_type as "事件筛选" from dict_page_type '
            executeSql(sqlStr,(err, rows, field)=> {
                if (err) {
                    reject('ERROR IN QUERY:' + sqlStr);
                } else {
                    resolve({
                        eventType: rows,
                        eventCoulumn:data.eventCoulumn
                    });
                }
            });

        })

    }).catch((reason) => {
            return Promise.reject({
                error: reason
            })
        });
}

//事件触发次数
export function loadEventTriggerTimes(req) {
    const params = req.body;
    const events = params.events;
    const sort = params.sort;
    const fromDate = params.fromDate;
    const toDate = params.toDate;
    const period = params.period;

    function addDate(dateStr,dadd){
        var a = new Date(dateStr);
        a = a.valueOf();
        a = a + dadd * 24 * 60 * 60 * 1000;
        a = new Date(a)
        let dayStr ='';
        if(a.getMonth() + 1 < 10 && a.getDate() <10){
            dayStr = a.getFullYear() + "-"+"0" + (a.getMonth() + 1) + "-"+"0" + a.getDate();
        }else if(a.getMonth() + 1 < 10){
            dayStr = a.getFullYear() + "-"+"0" + (a.getMonth() + 1) + "-" + a.getDate();

        }else if(a.getDate() <10){
            dayStr = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" +"0"+a.getDate();

        }else{
            dayStr = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" +a.getDate();
        }

        return dayStr;
    }

    Date.prototype.diff = function(date){
        return (this.getTime() - date.getTime())/(24 * 60 * 60 * 1000);
    }

    function getWeekNum(dateStr) {
        var date1 = new Date(dateStr);//"2008/03/01")
        var date2 = new Date(date1.getFullYear(), 0, 1);
        var day1 = date1.getDay();
        if (day1 == 0) day1 = 7;
        var day2 = date2.getDay();
        if (day2 == 0) day2 = 7;
        var weekNum = Math.floor(((date1.getTime() - date2.getTime()) / (24 * 60 * 60 * 1000) + day2 - day1) / 7);
        var startDay = addDate(dateStr, 1 - day1);
        var endDay = addDate(dateStr, 7 - day1);
        return {
            weekNum: weekNum,
            startDay: startDay,//.getFullYear()+"-"+(startDay.getMonth()+1)+"-"+startDay.getDate(),
            endDay: endDay//.getFullYear()+"-"+(endDay.getMonth()+1)+"-"+endDay.getDate()
        };
    }

    function year_mounth(start_year,end_year,start_mounth,end_mounth) {
        var result=[];
        var datetime=''
        var end=end_mounth+1;
        for(var i=start_year;i<=end_year;i++){
            while(true){
                datetime=i+'-'+start_mounth;
                if(datetime==end_year+'-'+end)
                    break;
                else if(start_mounth !=13){
                    var mm='';
                    var newM='';
                    var test=datetime.split('-');
                    if(test[1]<10){
                        mm='0'+test[1];
                        newM=test[0]+'-'+mm;
                    }else {
                        newM=datetime;
                    }
                    result.push(newM)
                    start_mounth+=1
                }else{
                    start_mounth=1;
                    break;
                }
            }
        }
        return result;
    }

    var now = new Date(toDate);
    var date = new Date(fromDate);
    var diff = now.diff(date);
    let periodNum=0;
    let periodList=[];

    if(period=="按天"){
        periodNum=diff+1;
        for(var i=0;i < periodNum ;i++){
            const everyday=addDate(fromDate,i);
            periodList.push(everyday);
        }
    }else if(period=='按周'){
        periodNum=Math.ceil((diff+1)/7);
        for(var i=0;i < periodNum ;i++){
            const day=addDate(fromDate,i*7);
            const week=getWeekNum(day);
            if(week.weekNum<10){
                periodList.push(new Date(week.startDay).getFullYear()+'-'+'0'+week.weekNum);
            }else{
                periodList.push(new Date(week.startDay).getFullYear()+'-'+week.weekNum);
            }

        }

    }else if(period=='按月') {
        const   fromYear=new Date(fromDate).getFullYear();
        const  toYear=new Date(toDate).getFullYear();
        const   fromMonth=new Date(fromDate).getMonth()+1;
        const  toMonth=new Date(toDate).getMonth()+1;
        periodList=year_mounth(fromYear,toYear,fromMonth,toMonth);
    }

    let Str = '';
    if (period == '按天') {
        Str = 'DATE_FORMAT(b.stat_date,"%Y-%m-%d") as date ';
    } else if (period == '按周') {
        Str = 'DATE_FORMAT(b.stat_date,"%x-%v") as date ';
    } else if (period == '按月') {
        Str = 'DATE_FORMAT(b.stat_date,"%x-%m") as date '
    }

    return new Promise((resolve, reject) => {
        let Str1 = '';
        if (sort != "总体")
            Str1 = ',' + sort;
        let sqlStr = 'SELECT sum(count_num) as 总触发次数 , sum(person_num) as 触发用户数 , date as 触发时间 ,' +
            ' os_type as 操作系统,' +
            'model_type as 设备型号  FROM' +
            ' ( SELECT a.*, ' +
            Str +
            ' FROM stat_page_detail AS a , stat_page_date AS b ' +
            ' WHERE a.stat_page_id = b.id AND a.event_name = ? ' +
            ' AND stat_date > ? AND stat_date < ?) AS fuck ' +
            ' GROUP BY date ' +
            Str1;

        executeSql(sqlStr, [events, fromDate, toDate], (err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                let eventData = {};
                let eventTriggerData = {};
                let dd=[];
                let tempKey='';

                rows.forEach(row=> {
                    const 总触发次数 = row['总触发次数'];
                    const 触发用户数 = row['触发用户数'];
                    const 触发时间 = row['触发时间'];
                    dd.push(row['触发时间'])
                    row['操作系统'] = row['操作系统'] == '1' ? 'iOS' : 'android';

                    tempKey = sort == '总体' ? sort : row[sort];
                    if (!eventData[tempKey])
                        eventData[tempKey] = {};
                    eventData[tempKey][触发时间]={
                        '总触发次数': 总触发次数,
                        '触发用户数': 触发用户数,
                    };

                    if (!eventTriggerData[tempKey])
                        eventTriggerData[tempKey] = {};
                    eventTriggerData[tempKey][触发时间]={
                        '总触发次数': 总触发次数,
                        '触发用户数': 触发用户数,
                    };
                })

                Object.keys(eventData).forEach(eventType=> {
                    let tempList = {};
                    periodList.forEach(datetime=> {
                        tempList[datetime] = eventData[eventType][datetime]?
                            eventData[eventType][datetime]: {'总触发次数': 0, '触发用户数': 0};
                    })
                    eventData[eventType] = tempList;
                })

                Object.keys(eventTriggerData).forEach(eventType=> {
                    let tempList = {};
                    dd.forEach(datetime=> {
                        tempList[datetime] = eventTriggerData[eventType][datetime]?
                            eventTriggerData[eventType][datetime]: {'总触发次数': 0, '触发用户数': 0};
                    })
                    eventTriggerData[eventType] = tempList;
                })
                resolve({eventData:eventData,eventTriggerData:eventTriggerData});
            }
        });
    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

//贷款商户
export function loadLoanShops(req) {
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
        let sqlStr = 'SELECT round(loan.money, 0) as 平均贷款金额,' +
            ' case when loan.scheme= 6 then "未贷款" ELSE "已贷款" END  as 贷款类型,'+
            ' a.id AS 店铺id,' +
            'a.longitude AS 经度,' +
            'a.latitude AS 纬度,' +
            't.name AS 类型,' +
            'c.path_name AS 商圈,' +
            'a.phone AS 电话,' +
            'a.shopsname AS 商铺名称,' +
            'a.name AS 店主,' +
            'a.address AS 地址,' +
            'a.recode AS 推荐码,' +
            ' CASE WHEN a.state=1 THEN "启用" ' +
            '  WHEN a.state=2 THEN "禁用" ' +
            '  WHEN a.state=3 THEN "审核中" ' +
            '  WHEN a.state=4 THEN "审核不通过" ' +
            '  WHEN a.state=5 THEN "已删除" ' +
            ' ELSE "审核中(未完成)"  END AS 当前状态,' +
            'd.audit_state AS 审核状态,' +
            ' CASE WHEN a.exist=1 THEN "否" ' +
            ' ELSE "是"  END AS 是否注销,' +

            'a.rid AS 推广人推荐码,' +
            'a.bank_rid AS 银行推荐码,' +
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
            ' RIGHT  JOIN  (select avg(loan_money) as money, sum(scheme) as scheme,  commercial_id from loan_commercial group by commercial_id)  as loan on a.id = loan.commercial_id'+
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
                    ' RIGHT  JOIN  (select avg(loan_money) as money, sum(scheme) as scheme,' +
                    ' commercial_id from loan_commercial group by commercial_id) as loan on a.id = loan.commercial_id' +
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



//PV访问次数
export function PVAccess(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'select total_num as PV,'+
            Str+
            ' FROM ' +
            'stat_page_date where stat_date >= ? and stat_date <= ?  ' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err){
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                let xData = [];
                let yData = {"PV":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["PV"][i] = rows[i]["PV"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

//UV访问次数
export function UVAccess(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'select total_person_num AS UV,'+
            Str+
            ' FROM ' +
            'stat_page_date where stat_date >= ? and stat_date <= ?' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err){
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                let xData = [];
                let yData = {"UV":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["UV"][i] = rows[i]["UV"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

//人均页面访问次数
export function AvgPVAccess(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'select avg_pv as "人均页面访问数",'+
            Str+
            ' FROM ' +
            'stat_page_date where stat_date >= ? and stat_date <= ? and avg_pv is not null  ' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err){
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                let xData = [];
                let yData = {"人均页面访问数": []};
                for (var i = 0; i < rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["人均页面访问数"][i] = rows[i]["人均页面访问数"];
                }
                resolve({
                    "xData": xData,
                    "yData": yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

//下单转化率
export function OrderChange(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'select order_ratio as "下单转化率",'+
            Str+
            ' FROM ' +
            'stat_page_date where stat_date >= ? and stat_date <= ?' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err){
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                let xData = [];
                let yData = {"下单转化率":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["下单转化率"][i] = rows[i]["下单转化率"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

//客单价
export function AvgPrice(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'select ROUND(avg_price,2) as "客单价",'+
            Str+
            ' FROM ' +
            'stat_page_date where stat_date >= ? and stat_date <= ?  ' +
            ' GROUP BY date '+
            ' ORDER BY date '
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err){
                console.log(sqlStr)
                reject('ERROR IN QUERY:' + sqlStr);
            } else {
                let xData = [];
                let yData = {"客单价":[]};
                for(var i=0; i<rows.length; i++) {
                    xData[i] = rows[i].date;
                    yData["客单价"][i] = rows[i]["客单价"];
                }
                resolve({
                    "xData":xData,
                    "yData":yData
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}

//流量数据总览
export function TrafficData(req, params) {
    return new Promise((resolve, reject) => {
        const params = req.body;
        const toDate = params.toDate;
        const fromDate = params.fromDate;
        const period = params.period;
        let Str = '';
        if(period == 'day'){
            Str = 'DATE_FORMAT(stat_date,"%Y-%m-%d") AS date';
        }else if(period == 'week'){
            Str = 'DATE_FORMAT(stat_date,"%x-%v") AS date';
        }else if(period == 'month'){
            Str = 'DATE_FORMAT(stat_date,"%x-%m") AS date';
        }
        let sqlStr = 'SELECT ' +
            'SUM(total_num) AS "PV",' +
            'SUM(total_person_num) AS "UV",' +
            'avg_pv as "人均页面访问数", '+
            'order_ratio as "下单转化率",ROUND(avg_price,2) as "客单价",' +
            Str+
            ' FROM ' +
            ' stat_page_date ' +
            ' where stat_date >= ? and stat_date <= ? and avg_pv is not null ' +
            ' GROUP BY date' +
            ' ORDER BY date'
        executeSql(sqlStr, [fromDate,toDate], (err, rows, field)=> {
            if (err){
                reject('ERROR IN QUERY:' + sqlStr);
            }
            else {
                let valueList = {};
                for(var i=0;i<rows.length;i++) {
                    let temp = [];
                    for (var key in rows[i]) {
                        if(key!== 'date')
                            switch (key){
                                case 'PV':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'次').value,
                                        "unit": dx(rows[i][key],'次').unit
                                    });
                                    break;
                                case 'UV':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'次').value,
                                        "unit": dx(rows[i][key],'次').unit
                                    });
                                    break;
                                case '人均页面访问数':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'次').value,
                                        "unit": dx(rows[i][key],'次').unit
                                    });
                                    break;
                                case '下单转化率':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key]*100,'%').value,
                                        "unit": dx(rows[i][key],'%').unit
                                    });
                                    break;
                                case '客单价':
                                    temp.push({
                                        "valueName": key,
                                        "value": dx(rows[i][key],'元').value,
                                        "unit": dx(rows[i][key],'元').unit
                                    });
                                    break;
                            }
                    }
                    function dx(a,unit) {
                        if(a>10000 && a<10000000){
                            return {
                                "value":Math.round(a/10000*100)/100,
                                "unit":'万'+unit
                            }
                        }else if(a>=10000000){
                            return {
                                "value":Math.round(a/10000000*1000)/1000,
                                "unit":'千万'
                            }
                        }else{
                            return {
                                "value":a,
                                "unit":''+unit
                            }
                        }
                    }
                    valueList[rows[i]['date']]=temp;
                }
                resolve({
                    "valueList":valueList
                });
            }
        });

    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    });
}