

const router = require('koa-router')()
// imdlq的登录注册
const pcController = require('../controllers/pc');
 
router.prefix('/pc')
/**
 * 注册接口
 */
//注册账号 手机密码 昵称后缀
router.post('/register',pcController.register);
//登录 手机+密码
router.post('/login',pcController.logon)
//查询个人信息 id
router.get('/me',pcController.me)

module.exports = router