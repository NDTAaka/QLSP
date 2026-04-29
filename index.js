const express = require('express');
const route = require('./routes/client/index.routes');
const routeAdmin = require('./routes/admin/index.route')
const app = express();
const systemConfig = require('./config/system');
require("dotenv").config();

const port = process.env.PORT;
const database = require("./config/database");
database.connect();

app.use(express.static("public"));
app.set("views", "./views");
app.set("view engine", "pug");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
