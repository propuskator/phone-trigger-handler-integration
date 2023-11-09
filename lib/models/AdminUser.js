const { createHash } = require('crypto');
const { DataTypes: DT } = require('sequelize');
const Base = require('./Base');

class AdminUser extends Base {
    static schema() {
        return {
            id           : { type: DT.BIGINT, primaryKey: true, autoIncrement: true },
            workspaceId  : { type: DT.BIGINT },
            login        : { type: DT.STRING, allowNull: false },
            avatar       : { type: DT.STRING, allowNull: true },
            passwordHash : { type: DT.STRING },
            mqttToken    : { type: DT.STRING },
            createdAt    : { type: DT.DATE(3) },
            updatedAt    : { type: DT.DATE(3) },
            password     : { type: DT.VIRTUAL },
            rootTopic    : { type : DT.VIRTUAL,
                get() {
                    return createHash('sha256').update(this.getDataValue('login')).digest('hex');
                }
            }
        };
    }

    static options() {
        return {
            tableName  : 'adminUsers',
            timestamps : false
        };
    }
    static initRelations() {}
}

module.exports = AdminUser;
