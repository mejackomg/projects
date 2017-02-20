import mysql from 'mysql'
import dbconfig from '../../config.js'

var pool = mysql.createPool(dbconfig.connection);

export default function executeSql(sql,params, callback) {
  pool.getConnection(function (err, connection) {
    if (err)
      console.log("POOL ==> " + err);
    else {
      connection.query(sql, params, function (err,rows,field) {
        callback.apply(connection, arguments);
        connection.release();
      });
    }
  })
}

//
// var connection;
// function handleError () {
//   connection = mysql.createConnection(dbconfig.connection);
//
//   //连接错误，2秒重试
//   connection.connect(function (err) {
//     if (err) {
//       console.log('error when connecting to db:', err);
//       setTimeout(handleError , 2000);
//     }
//   });
//
//   connection.on('error', function (err) {
//     console.log('db error', err);
//     // 如果是连接断开，自动重新连接
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//       handleError();
//     } else {
//       throw err;
//     }
//   });
// }
//
// handleError();
//
// export default function executeSql(sql,params, callback) {
//     connection.query(sql, params, function (err,rows,field) {
//       callback.apply(connection, arguments);
//     });
// }
