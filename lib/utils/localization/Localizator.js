const Jed = require('jed');

function missing_key_callback(key) {
    console.error(key);
}

module.exports = class Localizator {
    constructor(locales) {
        this.locales = {};
        Object.keys(locales).forEach(key => {
            this.locales[key] = new Jed({
                ...locales[key],
                missing_key_callback
            });
        });
    }

    l(text, ctx) {
        if (!ctx || !this.locales[ctx]) return text;

        return this.locales[ctx].gettext(text);
    }
};
