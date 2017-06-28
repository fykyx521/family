import {cloud} from './util.js';

const USER_KEY='family_user';

export default class User{
 
     constructor()
     {
        this.username='';
        this.objectId='';
        this.sessionToken='';
        this.isauthNickName=false;//是否授权获取昵称 
     }
     static current()
     {
        //""{\"authData\":{\"weapp\":{\"expires_in\":7200,\"openid\":\"oCeYK0cXTpD3Hvow4xUcVE9Wy8kA\",\"session_key\":\"8qAlzMWD7UEj+C7qcA0hkA==\"}},\"createdAt\":\"2017-06-25 22:55:40\",\"objectId\":\"4ca69ed083\",\"sessionToken\":\"bb4437b440d2694f80d2790c6d41bbab\",\"username\":\"f5a86851f78dfc0d\"}""
         
         return wxcheckSession().then(
           res=>{
             throw('error login')
           return storageToUser();
         }).catch(err=>{
            return User.login();
         });
     }
     static login(code='')
     {
        if(code=='')
        {
            return wxlogin().then((res)=>{
                let code=res.code;
                return User.login(code);
            });
        }else{
           return cloud('login',{code:code}).then(rep=>{
             let result=rep.data.result;
             let json=JSON.parse(result);
             wxsetStorage(USER_KEY,result);
             return createUser(json);
           }) 
        }
     }
}

/***
 *  获取用户
 */
function storageToUser()
{
    return wxgetStorage('family_user')
    .then(
       res=>{
          let data=res.data;
          let userjson=JSON.parse(data);
          return createUser(userjson);
       },
       err=>{
          return Promise.reject('error get storage user');
       }
    )
}

/**
 * 
 */
function createUser(result)
{
   let user=new User();
   user.sessionToken=result.sessionToken;
   user.objectId=result.objectId;
   user.username=result.username;
   return user;

}
function wxsetStorage(key,data)
{
   return new Promise((resolve,reject)=>{
     wx.setStorage({
       key: key,
       data: data,
       success: function (res) { 
          resolve(res);
       },
       fail: function (res) {
          reject(res);    
       },
       complete: function (res) { },
     })

   });
  
}
function wxgetStorage(key,defaultval='')
{
   return new Promise((resolve,reject)=>{
      wx.getStorage({
        key: key,
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

function wxcheckSession() {
  return new Promise(function (resolve, reject) {
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
function wxlogin() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      },
      complete: function (res) {

      },
    });
  });

}



