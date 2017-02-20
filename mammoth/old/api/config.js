// config/database.js
module.exports = {
    'connection': {
        'host': '139.224.225.32',//'10.47.3.98',
        'user': 'root',
        'password': 'wfn031641',
        'database': 'mammoth',
    },
    'users_table': 'user',
    "cookie" : {
        "maxAge" : 1800000
    },
    "sessionStore" : {
        "host" : "139.224.225.6",
        "port" : "6379",
        "pass" : "joyleader",
        // "db" : 1,
        "ttl" :  60 * 60 * 24 * 7,   //Session的有效期为7天
        "logErrors" : true
    }
};
