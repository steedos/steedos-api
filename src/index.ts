let objectql = require("@steedos/objectql");
let express = require('express');
let graphqlHTTP = require('express-graphql');
let steedosAuth = require('@steedos/auth');
let jwtRouter = steedosAuth.jwtRouter;
let _ = require('underscore');
let Cookies = require("cookies");

let app = express();

const schemaConfig = require(process.cwd() + '/steedos.config.js');
let steedosSchema = objectql.getSteedosSchema();

_.each(schemaConfig.datasources, (datasource, name) => {
    steedosSchema.addDataSource(name, datasource)
})

app.use('/api-v2', jwtRouter);

let ODataRouter = require('@steedos/core').ODataRouter;
_.each(steedosSchema.getDataSources(), (datasource, name) => {
    app.use("/api-v2/odata/v4", ODataRouter);
})


let graphqlRouter = express.Router();
graphqlRouter.use((req, res, next) => {
    let cookies = new Cookies(req, res);
    let authToken: string = req.headers['x-auth-token'] || cookies.get("X-Auth-Token");
    if (!authToken && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'Bearer') {
        authToken = req.headers.authorization.split(' ')[1]
    }

    let user = null
    if (authToken)
        user = steedosAuth.getSession(authToken);

    if (user)
        next();
    else
        res.status(401).send({ errors: [{ 'message': 'You must be logged in to do this.' }] });
})
_.each(steedosSchema.getDataSources(), (datasource, name) => {
    graphqlRouter.use("/#{name}", graphqlHTTP({
        schema: datasource.buildGraphQLSchema(),
        graphiql: true
    }))
})

app.use('/api-v2/graphql', graphqlRouter);

app.listen(process.env.PORT || 3333);
