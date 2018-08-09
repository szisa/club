const db = require('../db');
const prefix = require('../config').db.prefix;
let orm = {
    username: {
        type: db.STRING(20),
        comment: '登录帐号'
    },
    nickname: {
        type: db.STRING(20),
        comment: '昵称'
    },
    passwd: {
        type: db.STRING(64),
        comment: '密码',
    },
    clubId: {
        type: db.ID,
        comment: '关联社团',
    },
    type: {
        type: db.INTEGER,
        comment: '账号类型，0 = 未激活，1 = 管理员，2 = 社团号',
    },
    lastlogin: {
        type: db.INTEGER,
        comment: '最后登录时间'
    }
};
let table_name = prefix + 'account';
module.exports = db.defineModel(table_name, orm, {
    comment: '帐号表',
});
module.exports.db = db;
module.exports.tb = table_name;
module.exports.keys = function () {
    return Object.keys(orm);
};