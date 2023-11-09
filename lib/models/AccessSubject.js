const { DataTypes: DT } = require('sequelize');
const sequelize = require('sequelize');
const Base = require('./Base');

class AccessSubject extends Base {
    static initRelations() { }

    static schema() {
        return {
            id             : { type: DT.BIGINT, primaryKey: true, autoIncrement: true },
            workspaceId    : { type: DT.BIGINT, allowNull: false },
            userId         : { type: DT.BIGINT, allowNull: true },
            name           : { type: DT.STRING, allowNull: false, unique: true },
            enabled        : { type: DT.BOOLEAN, allowNull: false, defaultValue: true },
            isArchived     : { type: DT.BOOLEAN, allowNull: false, defaultValue: false },
            isInvited      : { type: DT.BOOLEAN, allowNull: false, defaultValue: false },
            mobileEnabled  : { type: DT.BOOLEAN, allowNull: false, defaultValue: false },
            position       : { type: DT.STRING, allowNull: true },
            email          : { type: DT.STRING, allowNull: true, unique: true },
            phone          : { type: DT.STRING, allowNull: true },
            phoneEnabled   : { type: DT.BOOLEAN, allowNull: false, defaultValue: false },
            avatar         : { type: DT.STRING, allowNull: true },
            avatarColor    : { type: DT.STRING, allowNull: true },
            popularityCoef : { type: DT.INTEGER, allowNull: false, defaultValue: 0 },
            createdAt      : { type: DT.DATE(3) },
            updatedAt      : { type: DT.DATE(3) },
            deletedAt      : { type: DT.DATE(3), allowNull: false, defaultValue: { [sequelize.Op.eq]: sequelize.literal('0') } },
            virtualCode    : { type: DT.STRING(12), allowNull: false },
            mobileToken    : {
                type : DT.VIRTUAL,
                get() {
                    return `sbj-${this.virtualCode}`;
                }
            },
            phoneToken : {
                type : DT.VIRTUAL,
                get() {
                    return `phn-${this.virtualCode}`;
                }
            },
            canAttachTokens : { type: DT.BOOLEAN, allowNull: false, defaultValue: false }
        };
    }

    static options() {
        return {
            tableName  : 'accessSubjects',
            paranoid   : true,
            timestamps : true,
            createdAt  : false,
            updatedAt  : false
        };
    }
}

module.exports = AccessSubject;
