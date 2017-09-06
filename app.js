let koa = require('koa'),
    app = new koa(),
    Router = require('koa-router'),
    router = new Router(),
    send = require('koa-send'),
    serve = require('koa-static'),
    fs = require('fs'),
    sessionsDir = '/opt/ocedo/storage/sessions/',
    sessions = {};

let envVars = {
  indexTemplate: '/dist/index.html',
  staticFolder: './dist'
}

// get sessions
// fs.readdir(sessionsDir, function(err, files) {
//   files.forEach((file) => {
//     // sync
//     let filePath = sessionsDir + file;
//     let str = fs.readFileSync(filePath, 'utf8');
//     sessions[file] = str;
//     console.log('session: : ' + str);
//   });
// });

// set environment variables
// if (process.env.NODE_ENV === 'dev') {
//   console.log('use the default variables');
// } else if (process.env.NODE_ENV === 'prod') {
//   console.log('reset environment variables');
//   envVars.indexTemplate = '/app/go/index.html';
//   envVars.staticFolder = '/app/go';
// } else if (process.env.NODE_ENV === 'existing') {
//   console.log('Running existing app');
//   envVars.indexTemplate = '/koa/index-existing.html';
//   envVars.staticFolder = './koa';
// } else if (process.env.NODE_ENV === 'migration') {
//   console.log('Running migration app');
//   envVars.indexTemplate = '/koa/index-migration.html';
//   envVars.staticFolder = './koa';
// }

router.get('/', async function (ctx){
    await send(ctx, ctx.path, { root: __dirname + envVars.indexTemplate });
    console.log("success => default path");
});

// router.get('/ng/session', async function(ctx) {
//   console.log(ctx.request.headers);
//   let cookie = ctx.request.headers.cookie,
//     sessId = cookie.substr(cookie.indexOf('=') + 1),
//     filePath = sessionsDir + 'sess_' + sessId;

//   let sessStr = fs.readFileSync(filePath, 'utf8');
//   ctx.body = sessStr;
//   console.log('return session');
// });

app
  .use(router.routes())
  .use(router.allowedMethods());

// serve static
app.use(serve(envVars.staticFolder));

app.listen(8081, () => {
  console.log("listening on 8081");
});