import Bmob from './bmob.js';
import api from './api.js';







export function groupList(groupid)
{
   return getGroup().then(results=>{
      if(results.length>0)
      {
          let group=results[0];
          return getGrouplist(group); 
      }else{
          return new Promise((resolve,reject)=>{
             return createGroup(groupid).then(group => {
                 resolve(getGrouplist(group));
             });
          });
          
      }
   })
}
function getGrouplist(group)
{
   return api.query('user_group').find();
}
//获取群
export function getGroup(groupid)
{
   let query = api.query('group').equalTo("groupid", groupid);
   return query.find();
}
//创建群
export function createGroup(groupid)
{
   return api.createObj('group',{groupid:groupid}).save();
}

function getShare(ticket)
{
  return new Promise(function (resolve, reject) {
    wx.getShareInfo({
      shareTicket: ticket,
      success: function (res) {
        resolve(res);
      },
      fail(error) {
        reject(error);
      },
    });
  });
}

function getGroupId(userid, res)
{
  return new Promise(function (resolve, reject) {
    Bmob.Cloud.run('groupid', { "uid": userid, 'evdata': res.encryptedData, 'iv': res.iv }, {
      success: function (result) {
        resolve(result);
      },
      error: function (error) {
        reject(error);
      }
    });
  });
}
export function groupId(ticket) {
  let user = Bmob.User.current();
  return getShare(ticket)
    .then((res) => {
      return getGroupId(user.id, res)
    }).then(result => {
      return new Promise((resolve, reject) => resolve(JSON.parse(result).openGId));
    });
}


