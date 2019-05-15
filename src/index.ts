let objectql = require("@steedos/objectql");
let express = require('express');
let jwtRouter = require('@steedos/auth').jwtRouter;
let _ = require('underscore');

let app = express();

const schemaConfig = require(process.cwd() + '/steedos.config.js');
let steedosSchema = objectql.getSteedosSchema();

_.each(schemaConfig.datasources, (datasource, name) => {
    steedosSchema.addDataSource(name, datasource)
})

app.use('/api-v2', jwtRouter);

app.listen(process.env.PORT || 3333);
