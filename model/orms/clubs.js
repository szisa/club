const db = require('../db');
const prefix = require('../config').db.prefix;
let orm = {
    name: {
        type: db.STRING(100),
        comment: '社团名称'
    },
    ename: {
        type: db.STRING(100),
        comment: '英文代号，路由地址用'
    },
    logo: {
        type: db.STRING(500),
        comment: 'logo图片地址',
        defaultValue: ''
    },
    icon: {
        type: db.STRING(500),
        comment: '徽标图片地址',
        defaultValue: ''
    },
    page: {
        type: db.STRING(500),
        comment: '官网',
        defaultValue: ''
    },
    type: {
        type: db.INTEGER,
        comment: '社团类型',
    },
    mp: {
        type: db.STRING(500),
        comment: '微信公众号',
        defaultValue: ''
    },
    phone: {
        type: db.STRING(20),
        comment: '联系方式',
        defaultValue: ''
    },
    webchat: {
        type: db.STRING(50),
        comment: '微信号',
        defaultValue: ''
    },
    wGroup: {
        type: db.STRING(500),
        comment: '微信群',
        defaultValue: ''
    },
    qGroup: {
        type: db.STRING(500),
        comment: 'Q群',
        defaultValue: ''
    },
    desc: {
        type: db.TEXT,
        comment: '社团介绍',
        allowNull: true
    },
    valid: {
        type: db.BOOLEAN,
        comment: '是否有效',
        defaultValue: true
    }
};
let table_name = prefix + 'info';
module.exports = db.defineModel(table_name, orm, {
    comment: '社团信息表',
});
module.exports.db = db;
module.exports.tb = table_name;
module.exports.keys = function () {
    return Object.keys(orm);
};