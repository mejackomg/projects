import mysql from 'mysql'
import executeSql from './database.js'
import uuid from 'uuid';
import moment from 'moment';

//店铺销售记录表
//店铺销售记录表
export function loadGetFunnel(req) {
    let FunnelUserId = req.body.FunnelUserId;
    console.log('FunnelUserId',FunnelUserId);
    return new Promise((resolve, reject) => {
            let sqlStr =  'SELECT funnel_name from page_funnel where create_user_id = ? order by create_time DESC';
            executeSql(sqlStr,[FunnelUserId],(err, rows, field)=> {
                if (err) {
                    reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                } else {
                    resolve(rows);
                }
            });
    }).then((data) =>{
        return new Promise((resolve,reject) =>{
            let sqlStr =  'SELECT page_type,page_name from dict_page_type order by dict_page_type_id ASC';
            executeSql(sqlStr,(err, rows, field)=> {
                if (err) {
                    reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                } else {
                    // console.log('查询条件',rows);
                    resolve({
                        Funnel_name:data,
                        choose_name:rows
                    });
                }
            });
        })
    }).then((data)=>{
        return new Promise((resolve,reject) =>{
            let sqlStr =  'SELECT * FROM dict_page_title order by sn ASC';
            executeSql(sqlStr,(err, rows, field)=> {
                if (err) {
                    reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                } else {
                    let temp = [];
                    for(let i=0;i<rows.length;i++){
                        temp.push({
                            id: rows[i].id,
                            name: rows[i].page_name
                        });
                    }
                    console.log(temp);
                    resolve({
                        Funnel_name:data.Funnel_name,
                        choose_name:data.choose_name,
                        DictTitle:temp
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

export function loadFunnel(req,params) {
    return new Promise((resolve,reject)=>{
        let sqlStr ='SELECT * from  dict_page_title GROUP BY sn';
        executeSql(sqlStr,(err,rows,field)=>{
            if(err){
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            }else{
                let temp = [];
                for(let i=0;i<rows.length;i++){
                    temp.push(rows[i].page_name)
                }
                resolve(temp)
            }
        })
    })
        .then((data)=> {
            return new Promise((resolve, reject) => {
                    let sqlStr = 'select page_type from dict_page_type';
                    executeSql(sqlStr,(err, rows, field)=> {
                        if (err) {
                            reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                        } else {
                            let temp = [];
                            for(let i=0;i<rows.length;i++){
                                temp.push(rows[i].page_type)
                            }
                            resolve({
                                page_name:data,
                                page_type:temp
                            });
                        }
                    });
            })
        })
}

export function loadCreateFunnel(req) {
    let Funnel = req.body;
    let FunnelId = uuid.v4();
    let FunnelName = Funnel.FunnelName;
    let FunnelTime = moment().format('YYYY-MM-DD HH:mm:ss');
    let FunnelUserId = Funnel.FunnelUserId;
    let FunnelStep = Funnel.FunnelStep;
    return new Promise((resolve, reject) => {
        let sqlStr = 'INSERT INTO page_funnel (id,funnel_name,create_time,create_user_id) values (?,?,?,?)';
        executeSql(sqlStr, [FunnelId, FunnelName, FunnelTime, FunnelUserId], (err, rows, field)=> {
            if (err)
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            else {
                resolve();
            }
        });
    })
    .then(()=> {
        return new Promise((resolve, reject) => {
            let str = '';
            let strarr = [];
            for(let i=0;i<FunnelStep.length;i++){
                strarr.push('("'+(FunnelId+i)+'","'+FunnelId+'",'+i+',"'+(FunnelName+i)+'","'+FunnelStep[i]+'")');
            }
            str = strarr.join(' , ');
            let sqlStr = 'INSERT INTO page_funnel_content (id, funnel_id, sn,content,page_title_id) values ' + str;
            executeSql(sqlStr, [], (err, rows, field)=> {
                if (err)
                    reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                else
                    resolve({result:'success'});
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

export function loadFunnelDelete(req){
    let  FunnelName = req.body.FunnelName;
    let  FunnelUserId = req.body.FunnelUserId;
    // console.log(FunnelName,FunnelUserId);
    return new Promise((resolve,reject)=>{
        let sqlStr = 'select pfc.id as id from page_funnel_content pfc'+
            ' left join page_funnel pf on pfc.funnel_id=pf.id'+
            ' where pf.funnel_name=? and pf.create_user_id=?';
        executeSql(sqlStr,[FunnelName,FunnelUserId],(err,rows,field)=>{
            if(err){
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            }else{
                resolve(rows);
            }
        })
    })
        .then(( data )=> {
            return new Promise((resolve, reject) => {
                let flag=0;
                for(var i=0; i<data.length; i++) {
                    let sqlStr ='DELETE from page_content where funnel_content_id=?';
                    executeSql(sqlStr,[data[i].id],(err, rows, field)=> {
                        if (err) {
                            reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                        } else {
                            flag++;
                            if(flag === data.length) {
                                resolve();
                            }
                        }
                    });
                }
            })
        })
        .then(( )=> {
            return new Promise((resolve, reject) => {
                let sqlStr ='DELETE from page_funnel_content'+
                    ' where funnel_id in'+
                    ' (SELECT id from page_funnel where funnel_name = ?'+
                    ' and create_user_id=?)';
                executeSql(sqlStr,[FunnelName,FunnelUserId],(err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    } else {
                        resolve();
                    }
                });
            })
        })
        .then(( )=> {
            return new Promise((resolve, reject) => {
                let sqlStr ='DELETE from page_funnel where funnel_name=? and create_user_id=?';
                executeSql(sqlStr,[FunnelName,FunnelUserId],(err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    } else {
                        resolve({result:'success'});
                    }
                });
            })
        })
}

export function loadFunnelStep(req) {
    let FunnelName = req.body.FunnelName;
    let choose = req.body.choose;
    let fromDate = req.body.fromDate;
    let toDate = req.body.toDate;
    console.log(req.body.choose);
    return new Promise((resolve,reject) =>{
        let sqlStr = '';
        if(req.body.choose==''){
            sqlStr = 'select dpt.page_name as page_name, sum(pc.content) as content,pc.content_time as time' +
                ' from page_funnel_content pfc join page_funnel pf on pfc.funnel_id=pf.id'+
                ' left join dict_page_title dpt on pfc.page_title_id=dpt.id' +
                ' left join page_content pc on pc.funnel_content_id=pfc.id'+
                ' where pf.funnel_name=?  '+
                ' GROUP BY pfc.sn'+
                ' order by pfc.sn ASC';
        }else{
            let str = choose+' !="null" and '+choose+' !="" ';
            sqlStr = 'select dpt.page_name as page_name, sum(pc.content) as content,DATE_FORMAT(pc.content_time,"%Y-%m-%d %H.%i.%s") as time' +
                ' from page_funnel_content pfc join page_funnel pf on pfc.funnel_id=pf.id'+
                ' left join dict_page_title dpt on pfc.page_title_id=dpt.id' +
                ' left join page_content pc on pc.funnel_content_id=pfc.id'+
                ' where pf.funnel_name=? and pc.content_time >=? and pc.content_time <=? and '+ str +
                ' GROUP BY pfc.sn'+
                ' order by pfc.sn ASC';
        }
        executeSql(sqlStr,req.body.choose==''?[FunnelName]:[FunnelName,fromDate,toDate],(err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            } else {
                // console.log(rows);
                // for(let i=0;i<rows.length;i++){
                //     rows[i].time = rows[i].time
                // }
                resolve(rows);
            }
        });
    }).catch((reason) => {
        return Promise.reject({
            error: reason
        })
    })
}

export function loadDictTitle(req) {
    return new Promise((resolve,reject) =>{
        let sqlStr =  'SELECT * FROM dict_page_title order by sn ASC';
        executeSql(sqlStr,(err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            } else {
                let temp = [];
                for(let i=0;i<rows.length;i++){
                    temp.push({
                        "id": rows[i].id,
                        "name": rows[i].page_name,
                        "event":rows[i].event
                    });
                }
                // console.log('temp',temp);
                resolve(temp);
            }
        });
    });
}
export function loadCustomerEvent(req) {
    let startEvent = req.body.startEvent; //开始事件
    let endEvent = req.body.endEvent;   //结束事件
    let fromDate = req.body.fromDate;   //开始时间
    let toDate = req.body.toDate;       //结束时间
    let sqlarr = [];
    let mfromDate = moment(fromDate);
    let mtoDate = moment(toDate);
    let timeS = moment().format('YYYY-MM-DD');
    console.log(mfromDate,mtoDate);
    while(mfromDate <= mtoDate) {
        sqlarr.push(setsql(mfromDate.format('YYYY-MM-DD'), startEvent, endEvent));
        mfromDate = mfromDate.add('days', 1);
    }
    let sql = sqlarr.join(' union all ');
    // console.log(sql);   //sql很长，可以拿出来放到数据库中执行下
    return new Promise((resolve,reject) =>{
        let sqlStr =  sql;
        executeSql(sqlStr,(err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            } else {
                // console.log('rows',rows);
                let temp = [];
                for(let i=0;i<rows.length;i++){
                    console.log(moment(rows[i].date).add('days',7).format('YYYY-MM-DD')<=timeS);
                    // console.log(moment(rows[i].date).format('YYYY-MM-DD')-timeS);
                    console.log(getDay(rows[i].date,timeS));
                    if(moment(rows[i].date).add('days',7).format('YYYY-MM-DD')<=timeS){
                        temp.push(rows[i]);
                    } else {
                        temp.push(Trapezoid(rows[i],7-getDay(rows[i].date,timeS)));

                    }
                }
                console.log('temp',temp);
                resolve(rows);

            }
        });
    });
}

function getDay(startDate,endDate) {
    let oDateStart = startDate.split('-');
    let oDateEnd = endDate.split('-');
    let DateS = new Date(oDateStart[0],oDateStart[1]-1,oDateStart[2]);
    let DateE = new Date(oDateEnd[0],oDateEnd[1]-1,oDateEnd[2]);
    let days = parseInt(Math.abs(DateS-DateE)/1000/60/60/24);
    return days;
    console.log(days);
}
function Trapezoid(data,num) {
    console.log(data);
    for(let i=0;i<num;i++){
        data['date'+(8-i)] = '尚未有值';
    }
}
function setsql(date, event1, event2) {
    //拼接date这一天所对应的7天留存
    let day1 = moment(date).format('YYYY_MM_DD');
    let day2 = moment(date).add('days', 1).format('YYYY_MM_DD');
    let day3 = moment(date).add('days', 2).format('YYYY_MM_DD');
    let day4 = moment(date).add('days', 3).format('YYYY_MM_DD');
    let day5 = moment(date).add('days', 4).format('YYYY_MM_DD');
    let day6 = moment(date).add('days', 5).format('YYYY_MM_DD');
    let day7 = moment(date).add('days', 6).format('YYYY_MM_DD');
    let sql = 'select * from ('+
        ' select "'+date+'" as date, count(*) as total from customer_event_matrix where stat_'+day1+' is not null) t join (' +
        ' select count(*) as date1 from customer_event_matrix'+
        ' where stat_'+day1+' like "%'+event1+',%'+event2+'%") a join (' +
        ' select count(*) as date2 from' +
        ' (select distinct_id,  stat_'+day1+', stat_'+day2+', stat_'+day3+', stat_'+day4+
        ' , stat_'+day5+', stat_'+day6+', stat_'+day7+
        ' from customer_event_matrix where stat_'+day1+' like "%'+event1+',%'+event2+'%") as stat'+
        ' where stat_'+day2+' like "%'+event1+',%'+event2+'%") b join ('+

        ' select count(*) as date3 from'+
        ' (select distinct_id,  stat_'+day1+', stat_'+day2+', stat_'+day3+', stat_'+day4+
        ' , stat_'+day5+', stat_'+day6+', stat_'+day7+
        ' from customer_event_matrix where stat_'+day1+' like "%'+event1+',%'+event2+'%") as stat'+
        ' where stat_'+day3+' like "%'+event1+',%'+event2+'%") c join ('+

        ' select count(*) as date4 from'+
        ' (select distinct_id,  stat_'+day1+', stat_'+day2+', stat_'+day3+', stat_'+day4+
        ' , stat_'+day5+', stat_'+day6+', stat_'+day7+
        ' from customer_event_matrix where stat_'+day1+' like "%'+event1+',%'+event2+'%") as stat'+
        ' where stat_'+day4+' like "%'+event1+',%'+event2+'%") d join ('+

        ' select count(*) as date5 from'+
        ' (select distinct_id,  stat_'+day1+', stat_'+day2+', stat_'+day3+', stat_'+day4+
        ' , stat_'+day5+', stat_'+day6+', stat_'+day7+
        ' from customer_event_matrix where stat_'+day1+' like "%'+event1+',%'+event2+'%") as stat'+
        ' where stat_'+day5+' like "%'+event1+',%'+event2+'%") e join ('+

        ' select count(*) as date6 from'+
        ' (select distinct_id,  stat_'+day1+', stat_'+day2+', stat_'+day3+', stat_'+day4+
        ' , stat_'+day5+', stat_'+day6+', stat_'+day7+
        ' from customer_event_matrix where stat_'+day1+' like "%'+event1+',%'+event2+'%") as stat'+
        ' where stat_'+day6+' like "%'+event1+',%'+event2+'%") f join ('+

        ' select count(*) as date7 from'+
        ' (select distinct_id,  stat_'+day1+', stat_'+day2+', stat_'+day3+', stat_'+day4+
        ' , stat_'+day5+', stat_'+day6+', stat_'+day7+
        ' from customer_event_matrix where stat_'+day1+' like "%'+event1+',%'+event2+'%") as stat'+
        ' where stat_'+day7+' like "%'+event1+',%'+event2+'%") g on 1=1';
    return sql;
}

export function loadUserPath(req){
    let body = req.body;
    let EventChoice = body.EventChoice;
    let StartEnd = body.StartEnd;
    let EventC = body.EventC;
    let fromDate = body.fromDate;
    let toDate = body.toDate;
    console.log(EventChoice);
    for(let i=0;i<EventChoice.length;i++){

    }
    let str = '"'+EventChoice.join('","')+'"';
    let Start = StartEnd=='bgn_event'?'end_event':'bgn_event';
    let end = StartEnd!='bgn_event'?'end_event':'bgn_event';

    let historyStr = "";
    let historyThirdStr = "";
    let history_event = [];
    let history_event_third = [];

    return new Promise((resolve,reject) =>{
        let sqlStr = 'select bgn_event,end_event,'+
            'sum(person_num) as personNum,' +
            'avg(ratio) as ratio from customer_route ' +
            'where '+end+'  = ? ' +
            'and '+Start+' IN ('+str+
            ') and stat_date > ? ' +
            'and stat_date < ?  GROUP BY '+Start;
        executeSql(sqlStr,[EventC,fromDate,toDate],(err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            } else {
                let data=null;
                if(rows.length>0)
                    if(StartEnd=='bgn_event'){
                        data= {first:rows};
                    }
                    else{
                        data= {four:rows};
                    }
                resolve(data);
            }
        });
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            if (data) {
                let dataS = StartEnd=='bgn_event'?data.first:data.four ;
                let temp = [];
                for (let i = 0; i < dataS.length; i++) {
                    temp.push(end + '= "' + dataS[i][Start] + '" ');
                    history_event.push('history_event = "' + EventC + ',' + dataS[i][Start] + '"');
                }
                let tempStr = temp.join(' OR ');
                historyStr = history_event.join(' OR ');

                let sqlStr = 'select bgn_event,end_event,' +
                    'sum(person_num) as personNum,' +
                    'avg(ratio) as ratio from customer_route ' +
                    'where (' + tempStr +
                    ') and ' + Start + ' IN (' + str +
                    ') and stat_date > ? ' +
                    'and stat_date < ?  ' +
                    ' and father_id is not null ' +
                    'GROUP BY bgn_event,end_event';
                //console.log("second_level:" + sqlStr);
                executeSql(sqlStr, [fromDate, toDate], (err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    } else {
                        if(StartEnd=='bgn_event')
                            resolve({
                                first: data.first,
                                Second: rows
                            });
                        else
                            resolve({
                                Third: rows,
                                four: data.four
                            });
                    }
                });
            }
            else
                resolve(null);
        })
    }).then((data)=> {
        console.log('第3层',data);
        return new Promise((resolve, reject) => {
            if (data) {
                //console.log(data);
                let dataS = StartEnd=='bgn_event'?data.Second : data.Third;
                //console.log(dataS);
                let temp = [];
                for (let i = 0; i < dataS.length; i++) {
                    temp.push(end + '= "' + dataS[i][Start] + '" ');
                    history_event_third.push('history_event = "' + EventC + ',' + dataS[i][end] + ',' + dataS[i][Start] + '"');
                }
                historyThirdStr = history_event_third.join(' OR ');

                let tempStr = temp.join(' OR ');

                let sqlStr = 'select bgn_event,end_event,' +
                    'sum(person_num) as personNum,' +
                    'avg(ratio) as ratio from customer_route ' +
                    'where (' + tempStr +
                    ') and ' + Start + ' IN (' + str +
                    ') and stat_date > ? ' +
                    'and stat_date < ? ' +
                    ' and father_id is not null ' +
                    ' and (' + historyStr + ') ' +
                    ' GROUP BY bgn_event,end_event';
                executeSql(sqlStr, [fromDate, toDate], (err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    } else {
                        if(StartEnd=='bgn_event')
                            resolve({
                                first: data.first,
                                Second: data.Second,
                                Third: rows
                            });
                        else
                            resolve({
                                Second: rows,
                                Third: data.Third,
                                four: data.four
                            });
                    }
                });
            }
            else
                resolve(null);
        })
    }).then((data)=> {
        console.log('第4层',data);
        return new Promise((resolve, reject) => {
            if (data) {
                let dataS = StartEnd=='bgn_event'?data.Third :data.Second;
                let temp = [];
                for (let i = 0; i < dataS.length; i++) {
                    temp.push(end + '= "' + dataS[i][Start] + '" ');
                }
                let tempStr = temp.join(' OR ');
                let sqlStr = 'select bgn_event,end_event,' +
                    'sum(person_num) as personNum,' +
                    'avg(ratio) as ratio from customer_route ' +
                    'where (' + tempStr +
                    ') and ' + Start + ' IN (' + str +
                    ') and stat_date > ? ' +
                    'and stat_date < ? ' +
                    ' and father_id is not null ' +
                    ' and (' + historyThirdStr + ') ' +
                    ' GROUP BY bgn_event,end_event';
                executeSql(sqlStr, [fromDate, toDate], (err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    } else {
                        if(StartEnd=='bgn_event')
                            resolve({
                                "第一层": data.first,
                                "第二层": data.Second,
                                "第三层": data.Third,
                                "第四层": rows,
                                "StartEnd":StartEnd
                            });
                        else
                            resolve({
                                "第一层": rows,
                                "第二层": data.Second,
                                "第三层": data.Third,
                                "第四层": data.four,
                                "StartEnd":StartEnd
                            });

                    }
                });
            }
            else
                resolve(null);
        })
    })
}

/*export function loadUserPath(req){
    let body = req.body;
    let EventChoice = body.EventChoice;
    let StartEnd = body.StartEnd;
    let EventC = body.EventC;
    let fromDate = body.fromDate;
    let toDate = body.toDate;
    console.log(EventChoice);
    for(let i=0;i<EventChoice.length;i++){

    }
    let str = '"'+EventChoice.join('","')+'"';
    let Start = StartEnd=='bgn_event'?'end_event':'bgn_event';
    let end = StartEnd!='bgn_event'?'end_event':'bgn_event';

    let historyStr = "";
    let historyThirdStr = "";
    let history_event = [];
    let history_event_third = [];

    return new Promise((resolve,reject) =>{
        let sqlStr = 'select bgn_event,end_event,'+
            'sum(person_num) as personNum,' +
            'avg(ratio) as ratio from customer_route ' +
            'where '+end+'  = ? ' +
        'and '+Start+' IN ('+str+
        ') and stat_date > ? ' +
        'and stat_date < ?  GROUP BY '+Start;
        executeSql(sqlStr,[EventC,fromDate,toDate],(err, rows, field)=> {
            if (err) {
                reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
            } else {
                let data=null;
                if(rows.length>0)
                   data= {first:rows};
                resolve(data);
            }
        });
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            if (data) {
                let dataS = data.first;
                let temp = [];
                for (let i = 0; i < dataS.length; i++) {
                    temp.push(end + '= "' + dataS[i][Start] + '" ');
                    history_event.push('history_event = "' + EventC + ',' + dataS[i][Start] + '"');
                }
                let tempStr = temp.join(' OR ');
                historyStr = history_event.join(' OR ');

                let sqlStr = 'select bgn_event,end_event,' +
                    'sum(person_num) as personNum,' +
                    'avg(ratio) as ratio from customer_route ' +
                    'where (' + tempStr +
                    ') and ' + Start + ' IN (' + str +
                    ') and stat_date > ? ' +
                    'and stat_date < ?  ' +
                    ' and father_id is not null ' +
                    'GROUP BY bgn_event,end_event';
                //console.log("second_level:" + sqlStr);
                executeSql(sqlStr, [fromDate, toDate], (err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    } else {
                        resolve({
                            first: data.first,
                            Second: rows
                        });
                    }
                });
            }
            else
                resolve(null);
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            if (data) {
                //console.log(data);
                let dataS = data.Second;
                //console.log(dataS);
                let temp = [];
                for (let i = 0; i < dataS.length; i++) {
                    temp.push(end + '= "' + dataS[i][Start] + '" ');
                    history_event_third.push('history_event = "' + EventC + ',' + dataS[i][end] + ',' + dataS[i][Start] + '"');
                }
                historyThirdStr = history_event_third.join(' OR ');

                let tempStr = temp.join(' OR ');

                let sqlStr = 'select bgn_event,end_event,' +
                    'sum(person_num) as personNum,' +
                    'avg(ratio) as ratio from customer_route ' +
                    'where (' + tempStr +
                    ') and ' + Start + ' IN (' + str +
                    ') and stat_date > ? ' +
                    'and stat_date < ? ' +
                    ' and father_id is not null ' +
                    ' and (' + historyStr + ') ' +
                    ' GROUP BY bgn_event,end_event';
                executeSql(sqlStr, [fromDate, toDate], (err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    } else {
                        resolve({
                            first: data.first,
                            Second: data.Second,
                            Third: rows
                        });
                    }
                });
            }
            else
                resolve(null);
        })
    }).then((data)=> {
        return new Promise((resolve, reject) => {
            if (data) {
                let dataS = data.Third;
                let temp = [];
                for (let i = 0; i < dataS.length; i++) {
                    temp.push(end + '= "' + dataS[i][Start] + '" ');
                }
                let tempStr = temp.join(' OR ');
                let sqlStr = 'select bgn_event,end_event,' +
                    'sum(person_num) as personNum,' +
                    'avg(ratio) as ratio from customer_route ' +
                    'where (' + tempStr +
                    ') and ' + Start + ' IN (' + str +
                    ') and stat_date > ? ' +
                    'and stat_date < ? ' +
                    ' and father_id is not null ' +
                    ' and (' + historyThirdStr + ') ' +
                    ' GROUP BY bgn_event,end_event';
                executeSql(sqlStr, [fromDate, toDate], (err, rows, field)=> {
                    if (err) {
                        reject('ERROR IN QUERY:' + sqlStr+', err:'+err);
                    } else {
                        resolve({
                            "第一层": data.first,
                            "第二层": data.Second,
                            "第三层": data.Third,
                            "第四层": rows
                        });
                    }
                });
            }
            else
                resolve(null);
        })
    })
}*/













