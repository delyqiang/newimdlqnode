const pcModel = require("../modules/pc");
 
class pcController {
    /**
     * 注册信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async register(ctx){
        let req = ctx.request.body;
        if(req.name && req.phone && req.url_name && req.parssword){
            try{
                //注册
                const ret = await pcModel.register(req);
                //使用刚刚注册的信息，且返回注册信息详情信息
                const data = await pcModel.getStudentDetail(ret.id);
 
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '注册成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '注册失败',
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }
    /**
     * 登录 并返回个人id
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async logon(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                // 查询学生信息详情模型
                let data = await pcModel.getStudentDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '学生ID必须传'
            }
        }
    }
    /**
     * 通过id返回个人信息
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async me(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                // 查询学生信息详情模型
                let data = await pcModel.getStudentDetail(id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '查询成功',
                    data
                }
            }catch(err){
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查询失败',
                    data
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '学生ID必须传'
            }
        }
    }
}
 
module.exports = pcController;