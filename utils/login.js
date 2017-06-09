

import Bmob from './bmob.js';


function login()
{

    return dologin();

}  


/***
 *  微信登录
 */
function dologin()
{
  // return wxlogin().then((res) => loginOrRegister(res));

  return wxcheckSession()
   .then(
     (result)=>{
        return Promise.resolve(Bmob.User.current());
        
     },
     (res)=>{
       return wxlogin().then((res) => loginOrRegister(res));
   });
   
}

/**
 *  登录或注册
 * 
 */
function loginOrRegister(res) {

   let user1 = new Bmob.User();//开始注册用户
   return user1.loginWithWeapp(res.code);
}


function wxcheckSession()
{
  return new Promise(function (resolve,reject){
    wx.checkSession({
      success: function (res) {
          resolve(res);
      },
      fail: function (res) {
          reject(res);
      },
      complete: function (res) { },
    });
  });
}
function wxlogin()
{
   return new Promise(function(resolve,reject){
      wx.login({
        success: function(res) {
            resolve(res);
        },
        fail: function(res) {
             reject(res);
        },
        complete: function(res) {

        },
      });
   });
  
}



function oldlogin()
{
    var Bmob=require('bmob.js')
    wx.login({

        success: function (res) {
           var user1 = new Bmob.User();//开始注册用户
           user1.loginWithWeapp(res.code).then(function (user) {
            var openid = user.get("authData").weapp.openid;
            console.log(user, 'user', user.id, res);
            if (user.get("nickName")) {
              // 第二次登录，打印用户之前保存的昵称
              console.log(user.get("nickName"), 'res.get("nickName")');
              //更新openid
              wx.setStorageSync('openid', openid)
            } else {//注册成功的情况  
              var u = Bmob.Object.extend("_User");
              var query = new Bmob.Query(u);
              query.get(user.id, {
                success: function (result) {
                  wx.setStorageSync('own', result.get("uid"));
                },
                error: function (result, error) { 
                  console.log("查询失败");
                }  
              });
              //保存用户其他信息，比如昵称头像之类的
              wx.getUserInfo({
                success: function (result) {

                  var userInfo = result.userInfo;
                  var nickName = userInfo.nickName;
                  var avatarUrl = userInfo.avatarUrl;

                  var u = Bmob.Object.extend("_User");
                  var query = new Bmob.Query(u);
                  // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
                  query.get(user.id, {
                    success: function (result) {  
                      // 自动绑定之前的账号
                      result.set('nickName', nickName);
                      result.set("userPic", avatarUrl);
                      result.set("openid", openid);
                      result.save();

                    }
                  });

                }
              });
            }

          }, function (err) {
            console.log('error');
            console.log(err, 'errr');
          });

        }
    });
    
}

export default login;