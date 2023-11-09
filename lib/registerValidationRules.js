const LIVR = require('livr');

const defaultRules = {
    'phone'() {
        return (value, params, outputArr) => {
            if (value) {
                const numbers = value.replace(/\D/g, '');

                if (numbers.length < 6 || numbers.length > 20) return 'WRONG_PHONE_FORMAT';

                outputArr.push(`+${numbers}`);
            }
        };
    }
};

LIVR.Validator.registerDefaultRules(defaultRules);
