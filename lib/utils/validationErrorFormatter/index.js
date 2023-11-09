const dotProp = require('dot-prop');
const X = require('../../Exception');
const mappings = require('./mappings');

let commonMap = {};

for (const mapKey of Object.keys(mappings)) {
    if (mapKey === 'defaultMapping') continue;
    commonMap = {
        ...commonMap,
        ...mappings[mapKey]
    };
}

function getField(field) {
    if (!field.includes('/')) return field;
    const fieldParts = field.split('/');

    return fieldParts[fieldParts.length - 1];
}

module.exports = function formatter(error) {
    const formatted = new X({
        type    : 'validation',
        message : 'Validation error',
        errors  : []
    });

    for (const field of Object.keys(error.fields)) {
        const code = error.fields[field];

        if (!code) continue;

        const message = dotProp.get(commonMap, `${getField(field)}.${code}`, dotProp.get(mappings.defaultMapping, code));

        formatted.errors.push({
            message,
            'uri' : `#/${field}`
        });

        // For sessions
        if (field === 'context') {
            formatted.type = 'forbidden';
            formatted.message = message;
            formatted.errors = [];
            break;
        }
    }

    return formatted;
};
