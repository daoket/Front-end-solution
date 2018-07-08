const Koa = require('koa');
const router = require('koa-router')();
var bodyParser = require('koa-bodyparser');
const detectImg = require('./detectImg');

const app = new Koa();
app.use(bodyParser());

router.get('/', (ctx, next) => {
  ctx.body = '图片识别接口，地址：/detectImg'
})

router.post('/detectImg', async (ctx, next) => {
  ctx.res.setHeader('Access-Control-Allow-Origin', '*')
  ctx.body = await detectImg(ctx.request.body.imgUrl)
})
app.use(router.routes());

let server = app.listen(1234, () => {
  console.log('Server is 🏃‍ at: http://127.0.0.1:%s', server.address().port);
});
