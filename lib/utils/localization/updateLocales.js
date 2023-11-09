const LocaleUpdater = require('./LocaleUpdater');

function main() {
    const updater = new LocaleUpdater();

    updater.getMessagesFromErrors();
    updater.getMessagesFromValidator();

    updater.updateLocaleFile('./locales/ru.json');
    updater.checkEmpty('./locales/ru.json');
}

main();
