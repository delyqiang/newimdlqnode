const {  DataTypes } = require('sequelize');
// 引入mysql的配置文件
const db = require('../config/db');
 
// 引入sequelize对象
const Sequelize = db.sequelize;
 
// 引入数据表模型
const pc = require('../schema/pc')(Sequelize,DataTypes);
pc.sync({force: false}); //自动创建表
 
class pcModel {
    /**
     * 注册表模型
     * @param data
     * @returns {Promise<*>}
     */
    static async register(data){
        return await pc.create({
            name: data.name, //昵称
            phone: data.phone,  //手机号
            url_name: data.url_name,  //url后缀
            parssword: data.parssword //密码
        });
    }
 
    /**
     * 查询个人信息的详情
     * @param 手机号
     * @returns {Promise<Model>}
     */
    static async getStudentDetail(id){
        return await pc.findOne({
            where:{
                id
            }
        });
    }
}
 
module.exports = pcModel;