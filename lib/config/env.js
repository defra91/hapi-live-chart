'use strict';

const _ = require('lodash');

module.exports = {
    db: _.template('mongodb://<%=dbUser%>:<%=dbPassword%>@<%=dbHost%>:<%=dbPort%>/<%=dbName%>')({
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASSWORD,
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
        dbName: process.env.DB_NAME
    }),
    port: process.env.PORT || 3000,
    webSocketUrl: process.env.WEBSOCKET_URL
};
