function formatFieldName({ fieldName, capitalize = false }) {
    const fieldNameString = fieldName.split('_').join(' ');

    if (capitalize) return fieldNameString.charAt(0).toUpperCase() + name.slice(1);

    return fieldNameString;
}

module.exports = {
    formatFieldName
};
