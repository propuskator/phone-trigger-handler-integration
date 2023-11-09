module.exports = function hideSensitiveData(params) {
    if (typeof params === 'object') {
        const sanitizedObject = {};

        for (const key of Object.keys(params)) {
            if (key.match(/pass/gi)) sanitizedObject[key] = '**SENSITIVE DATA**';
            else if (key === 'data') sanitizedObject[key] = hideSensitiveData(params[key]);
            else sanitizedObject[key] = params[key];
        }

        return sanitizedObject;
    }

    return params;
};
