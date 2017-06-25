import {cloud} from './util.js';


export default class User{
 
     constructor()
     {
        this.username='';
        this.objectId='';
        this.sessionToken='';
     }
     static current()
     {
        //""{\"authData\":{\"weapp\":{\"expires_in\":7200,\"openid\":\"oCeYK0cXTpD3Hvow4xUcVE9Wy8kA\",\"session_key\":\"8qAlzMWD7UEj+C7qcA0hkA==\"}},\"createdAt\":\"2017-06-25 22:55:40\",\"objectId\":\"4ca69ed083\",\"sessionToken\":\"bb4437b440d2694f80d2790c6d41bbab\",\"username\":\"f5a86851f78dfc0d\"}""

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
             return createUser(json);
           }) 
        }
     }

     
}

function createUser(result)
{
   let user=new User();
   user.sessionToken=result.sessionToken;
   user.objectId=result.objectId;
   user.username=result.username;
   return user;

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



