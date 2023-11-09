/* eslint-disable no-magic-numbers, more/no-duplicated-chains */
const { DataTypes : DT }      = require('sequelize');
const sequelize               = require('sequelize');
const mqttClient              = require('../api/mqttClient');
const Base                    = require('./Base');
const AdminUser               = require('./AdminUser');

class AccessTokenReader extends Base {
    static initRelations() {}

    static schema() {
        return {
            id                : { type: DT.BIGINT, primaryKey: true, autoIncrement: true },
            // eslint-disable-next-line max-len
            workspaceId       : { type: DT.BIGINT, allowNull: false, defaultValue: () => AccessTokenReader.getWorkspaceIdFromNamespace() },
            name              : { type: DT.STRING, allowNull: false },
            enabled           : { type: DT.BOOLEAN, allowNull: false, defaultValue: true },
            isArchived        : { type: DT.BOOLEAN, allowNull: false, defaultValue: false },
            code              : { type: DT.STRING, allowNull: false },
            phone             : { type: DT.STRING, allowNull: true },
            stateStatus       : { type: DT.STRING, allowNull: false, defaultValue: AccessTokenReader.STATE_INACTIVE },
            brokerStateStatus : { type: DT.STRING, allowNull: true, defaultValue: null },
            popularityCoef    : { type: DT.INTEGER, allowNull: false, defaultValue: 0 },
            activeAt          : { type: DT.DATE(3), allowNull: true },
            createdAt         : { type: DT.DATE(3) },
            updatedAt         : { type: DT.DATE(3) },
            deletedAt         : { type: DT.DATE(3), allowNull: false, defaultValue: { [sequelize.Op.eq]: sequelize.literal('0') } },
            resetRules        : { type: DT.BOOLEAN, allowNull: false, defaultValue: true }
        };
    }

    static options() {
        return {
            tableName  : 'accessTokenReaders',
            paranoid   : true,
            timestamps : true,
            createdAt  : false
        };
    }

    async openWithPhone(phoneToken) {
        const { rootTopic } = await AdminUser.findOne({ where: { workspaceId: this.workspaceId } });

        mqttClient.publish(`${rootTopic}/sweet-home/${this.code}/d/k/set`, phoneToken, { retain: false });
    }
}

module.exports = AccessTokenReader;
