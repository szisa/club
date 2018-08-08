const db = require('../db');
const prefix = require('../config').db.prefix;
let orm = {
    name: {
        type: db.STRING(100),
        comment: '姓名'
    },
    number: {
        type: db.STRING(20),
        comment: '学号'
    },
    phone: {
        type: db.STRING(20),
        comment: '联系方式',
        defaultValue: ''
    },
    wechat: {
        type: db.STRING(50),
        comment: '微信号',
        defaultValue: ''
    },
    clubId: {
        type: db.ID,
        comment: '报名社团',
    },
    extend: {
        type: db.TEXT,
        comment: '扩展字段信息（JSON）',
        allowNull: true,
        get() {
            const val = this.getDataValue('extend');
            return JSON.parse(val);
        },
        set(val) {
            this.setDataValue('extend', JSON.stringify(val));
        }
    }
};
let table_name = prefix + 'join';
module.exports = db.defineModel(table_name, orm, {
    comment: '社团报名表',
});
module.exports.db = db;
module.exports.tb = table_name;
module.exports.keys = function () {
    return Object.keys(orm);
};