import Bmob from './bmob.js';
import api from './api.js';




export function groupList(groupid)
{
  return getGroup(groupid).then(results=>{
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
export function getGrouplist(groupid) 
{
  let query=api.query('user_group');
  query.include('user');
  query.equalTo("groupid", groupid)
  return query.find();
  // return api.query('user_group').equalTo("groupid", groupid).include('user').find();
}
/***
 *  插入对应关系
 * 
 */
export function createOrInsertUG(group,user)
{
    return api.query('user_group')
      .equalTo('groupoid',group.id)
      .equalTo('useroid',user.id)
      .find()
      .then(results=>{
          if(results.length==0)
          {
            return api
                  .createObj('user_group', { groupoid: group.id, useroid: user.id, groupid: group.get('groupid'),user:user })
                  .save();
          }   
          return results[0];
      })
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

/**
 *  创建或获取群
 */
export function getOrCreateGroup(groupid)
{
   return getGroup(groupid).then((results)=>{
       if(results.length==1)
       {
          return results[0];
       }
       return createGroup(groupid);
   })
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
export function groupId(ticket,userId) {
  // let user = Bmob.User.current();
  return getShare(ticket)
    .then((res) => {
      return getGroupId(userId, res)
    }).then(result => {
      return new Promise((resolve, reject) => resolve(JSON.parse(result).openGId));
    });
}



