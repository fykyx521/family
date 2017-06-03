import Bmob from './bmob.js';
function currentUser()
{
    return Bmob.User.current();
}

function createObj(modelname,data={})
{
    let obj=Bmob.Object.extend(modelname);
    let keys=Object.keys(data);
    let result=new obj();
    for(let key of keys)
    {
        result.set(key,data[key]);
    }
    return result;
}
function del(modelname,objid)
{
     let delObj=Bmob.Object.extend(modelname);
     var query = new Bmob.Query(delObj);
     return query.get(objid).then((obj)=>{
        //  console.log('getid');
         return obj.destroy()
    });
    //  return query.delete()
}
function delsafe(modelname,objid)
{
     let delObj=Bmob.Object.extend(modelname);
     var query = new Bmob.Query(delObj);
     return query.get(objid).then((obj)=>{
         obj.set('deletedAt',new Date())
         return obj.save();
    });
    //  return query.delete()
}
function query(modelname,where)
{
   let Obj = Bmob.Object.extend(modelname);
   var query = new Bmob.Query(Obj);
   return query;
}

export default {
    currentUser,
    createObj,
    del,
    delsafe,
    query
}