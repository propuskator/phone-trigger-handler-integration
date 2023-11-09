module.exports = {
    port : process.env.APP_PORT || 48080,
    mqtt : {
        uri      : process.env.MQTT_URI,
        username : process.env.MQTT_USER,
        password : process.env.MQTT_PASS
    },
    mode : process.env.MODE
};
