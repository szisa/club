const crypto = require('crypto');
const model = require('../model');
const App = require('./app');
const Join = model.join;

const __salt = require('../config').salt;

let __error__ = Object.assign({}, App.error);
__error__.existed = App.error.existed('该社团你已报名', true, true);

class Module extends App {
    constructor(session) {
        super([
            { fun: App.ok, name: 'okjoin', msg: '报名成功' },
        ]);
        this.session = session;
        this.name = '报名';
        this.saftKey = ['id'].concat(Join.keys());
    }

    get error() {
        return __error__;
    }
    
    async create(data, onlyData = false) {
        const keys = ['name', 'number', 'phone', 'wechat', 'clubId'];

        if (!App.haskeys(data, keys)) {
            throw (this.error.param);
        }

        data.id = undefined;
        
        try {
            let club = await this.exist(data, true);

            if (club) {
                throw (this.error.existed);
            }

            let extend = Object.assign({}, data);
            keys.forEach(k => extend[k] = undefined);
            data.extend = extend;
            
            club = await super.new(data, Join);
            if (onlyData) return club;
            return this.okcreate(App.filter(club, this.saftKey));
        } catch (err) {
            if (err.isdefine) throw (err);
            throw (this.error.db(err));
        }
    }

    async update(data) {
        const keys = ['id'];

        if (!App.haskeys(data, keys)) {
            throw (this.error.param);
        }

        // data = App.filter(data, Join.keys());

        try {
            let club = await this.exist(data, true);
            if (club.id != data.id) {
                throw (this.error.existed);
            }

            let extend = Object.assign({}, data);
            Join.keys().forEach(k => extend[k] = undefined);
            extend.id = undefined;
            data.extend = {};
            Object.keys(club.extend).map(k => data.extend[k] = extend[k] ||  club.extend[k] )

            return this.okupdate(await super.set(data, Join, 'id'));
        } catch (err) {
            if (err.isdefine) throw (err);
            throw (this.error.db(err));
        }
    }

    async remove(data) {
        try {
            let club = await super.del({
                id: data.id
            }, Join);
            return this.okdelete(club.id);
        } catch (err) {
            if (err.isdefine) throw (err);
            throw (this.error.db(err));
        }
    }

    async query(data, fields=null, onlyData=false) {
        let ops = {
            id: App.ops.in,
            name: App.ops.like,
            number: App.ops.like,
            clubId: App.ops.equal
        };
        data.query = App.filter(data.query, Object.keys(ops));
        data.query.valid = true;
        try {
            data.fields = fields || this.saftKey;
            let queryData = await super.query(
                data, Join, ops
            );
            if (onlyData) return queryData;
            queryData.data = queryData.data.map(q => {
                let extend = Object.assign({}, q.extend);
                q.extend = undefined;
                q = Object.assign(q, extend);
                return q
            })
            return this.okquery(queryData);
        } catch (err) {
            throw (err);
        }
    }
 
    async exist(data, onlyData = false) {
        try {
            let join = await Join.findOne({
                where: {
                    number: data.number,
                    clubId: data.clubId
                }
            });
            if (onlyData) return join;
            return this.okget(!!join);
        } catch (err) {
            if (err.isdefine) throw (err);
            throw (this.error.db(err));
        }
    }
}

module.exports = Module;