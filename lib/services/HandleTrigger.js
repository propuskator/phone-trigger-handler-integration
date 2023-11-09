const { Op } = require('sequelize');
const { AccessTokenReader, AccessSubject } = require('../models');
const {
    ValidationError,
    validationCodes: { NOT_EXISTS }
}                 = require('../utils/errors');
const ServiceBase = require('./BaseService');

class HandleTrigger extends ServiceBase {
    async validate(data) {
        return this.doValidation(data, {
            phone_in   : [ 'required', 'string', 'trim', 'phone', { 'max_length': 255 } ],
            phone_user : [ 'required', 'string', 'trim', 'phone', { 'max_length': 255 } ]
        });
    }

    async execute({ phone_in, phone_user }) {
        try {
            this.logger.debug('Querying AccessTokenReaders', phone_in);
            const accessTokenReaders = await AccessTokenReader.findAll({
                where : {
                    phone : { [Op.like]: `%${phone_in}` }
                }
            });

            this.logger.debug('AccessTokenReader', accessTokenReaders);

            if (!accessTokenReaders.length) throw new ValidationError(NOT_EXISTS, { entityName: 'AccessTokenReader' });

            this.logger.debug('Querying AccessSubject', phone_user);
            const accessSubjects = await AccessSubject.findAll({
                where : {
                    phone : { [Op.like]: `%${phone_user}` }
                }
            });

            this.logger.debug('AccessSubjects', accessSubjects);

            if (!accessSubjects.length) throw new ValidationError(NOT_EXISTS, { entityName: 'AccessSubjects' });

            const intersectionPairs = this._findIntersectionByWorkspace(accessTokenReaders, accessSubjects);

            for (const phonePair of intersectionPairs) {
                const { reader: foundReader, subject: foundSubject } = phonePair;

                await foundReader.openWithPhone(foundSubject.phoneToken);
            }

            return { status: 'ok' };
        } catch (e) {
            this.logger.error(e);
        }
    }

    _findIntersectionByWorkspace(accessTokenReaders, accessSubjects) {
        const intersectionPairs = [];

        for (const reader of accessTokenReaders) {
            const subjectWithSameWorkspace = accessSubjects.find(s => s.workspaceId === reader.workspaceId);

            if (subjectWithSameWorkspace) intersectionPairs.push({ reader, subject: subjectWithSameWorkspace });
        }

        if (!intersectionPairs.length) throw new Error('pair of reader and subject not found');

        return intersectionPairs;
    }
}

module.exports = HandleTrigger;
