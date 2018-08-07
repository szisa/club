const crypto = require('crypto');
const model = require('../model');
const App = require('./app');
const Clubs = model.clubs;

const __salt = require('../config').salt;

let __error__ = Object.assign({}, App.error);
__error__.clubexisted = App.error.existed('社团');
__error__.engexisted = App.error.existed('英文代号');

class Module extends App {
    constructor(session) {
        super([
        ]);
        this.session = session;
        this.name = '社团';
        this.saftKey = ['id'].concat(Clubs.keys());
    }

    get error() {
        return __error__;
    }
    
    async create(data, onlyData = false) {
        const keys = ['name', 'ename', 'type'];

        if (!App.haskeys(data, keys)) {
            throw (this.error.param);
        }

        data = App.filter(data, Clubs.keys());
        
        try {
            let club = await this.exist(data.name, true);

            if (await this.ename(data.name, true)) {
                throw (this.error.engexisted);
            }
            
            club = await super.new(data, Clubs, 'ename', keys);
            if (onlyData) return club;
            return this.okcreate(App.filter(club, this.saftKey));
        } catch (err) {
            if (err.isdefine) throw (err);
            throw (this.error.db(err));
        }
    }

    async update(data) {
        const keys = ['ename'];

        if (!App.haskeys(data, keys)) {
            throw (this.error.param);
        }

        data = App.filter(data, Clubs.keys());

        try {
            // 英文名不可更改
            return this.okupdate(await super.set(data, Clubs, 'ename'));
        } catch (err) {
            if (err.isdefine) throw (err);
            throw (this.error.db(err));
        }
    }

    async remove(data) {
        try {
            let club = await super.set({
                ename: data.ename,
                valid: false
            }, Clubs, 'ename');
            return this.okdelete(club.id);
        } catch (err) {
            if (err.isdefine) throw (err);
            throw (this.error.db(err));
        }
    }

    async query(data, fields=null, onlyData=false) {
        let ops = {
            id: App.ops.in,
            ename: App.ops.equal,
            name: App.ops.like,
            type: App.ops.equal
        };
        data.query = App.filter(data.query, Object.keys(ops));
        data.query.valid = true;
        try {
            data.fields = fields || this.saftKey;
            let queryData = await super.query(
                data, Clubs, ops
            );
            if (onlyData) return queryData;
            return this.okquery(queryData);
        } catch (err) {
            throw (err);
        }
    }
 
    async exist(name, onlyData = false) {
        try {
            let data = await Clubs.findOne({
                where: {
                    name,
                    valid: true
                }
            });
            if (onlyData) return data;
            return this.okget(!!data);
        } catch (err) {
            if (err.isdefine) throw (err);
            throw (this.error.db(err));
        }
    }

    async ename(ename, onlyData = false) {
        try {
            let data = await Clubs.findOne({
                where: {
                    ename,
                    valid: true
                }
            });
            if (onlyData) return data;
            return this.okget(!!data);
        } catch (err) {
            if (err.isdefine) throw (err);
            throw (this.error.db(err));
        }
    }
}

module.exports = Module;