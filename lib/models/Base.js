/* istanbul ignore file */
const Sequelize  = require('sequelize');
const { Logger } = require('../utils/Logger');
const {
    ValidationError,
    validationCodes: { NOT_EXISTS }
} = require('../utils/errors');
const { getId, getIds } = require('./utils');

class Base extends Sequelize.Model {
    static init(sequelize, options = {}) {
        super.init(this.schema(), { ...options, sequelize });
        this.logger = Logger(`${this.name}Model`);
    }

    static create(data, options = {}) {
        const id = getId();

        return super.create({ id, ...data }, options);
    }

    static bulkCreate(data = [], options = {}) {
        const ids = getIds(data.length);
        const dataWithIds = data.map((item, index) => ({ id: ids[index], ...item }));

        return super.bulkCreate(dataWithIds, options);
    }

    static initRelationsAndHooks(sequelize) {
        if (this.initRelations) this.initRelations(sequelize);
        if (this.initHooks) this.initHooks(sequelize);
    }

    static async findById(id) {
        const entity = await this.findOne({ where: { id } });

        if (!entity) {
            throw new ValidationError(NOT_EXISTS, { entityName: this.name });
        }

        return entity;
    }

    static getIncludeMap(includesList) {
        const includeMap = {};

        includesList.forEach(item => {
            if (!this.whiteIncludeList[item]) return;
            if (includeMap[item]) return;

            includeMap[item] = this.whiteIncludeList[item];
        });

        return includeMap;
    }

    static options() {
        return {};
    }
}

module.exports = Base;
