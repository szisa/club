const db = require('../db');
const prefix = require('../config').db.prefix;
let orm = {
    key: {
        type: db.STRING(20),
        comment: '字段名（中文）'
    },
    type: {
        type: db.STRING(20),
        comment: '表单类型'
    },
    content: {
        type: db.STRING(500),
        comment: '表单相关内容，比如下拉框可选项',
        defaultValue: ''
    },
    clubId: {
        type: db.ID,
        comment: '所属社团',
    }
};
let table_name = prefix + 'join_table';
module.exports = db.defineModel(table_name, orm, {
    comment: '社团报名表扩展字段表',
});
module.exports.db = db;
module.exports.tb = table_name;
module.exports.keys = function () {
    return Object.keys(orm);
};