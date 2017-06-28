

export default class DB {

      constructor(tableName)
      {
         this.tableName=tableName;
         this.query=new Query();
      }
      static table(tableName)
      {
          let db=new DB(tableName);
          return db;
      }
      first()
      {
         
      }

      where(column,option,value)
      {
          this.query.where(column,option,value);
          return this;
      }
      orderBy(column,asc='asc')
      {
         this.query.orderBy(column,asc=='asc'?true:false);
         return this;
      }

      point(pointername)
      {
         this.query.point(pointername);
         return this;
      }

      list()
      {
          let data=this.query.toQueryData();
          return Api.create(this.tableName).request('GET',data)
      }

      insert()
      {

      }

      update()
      {
         
      }
}

class Api {
    constructor(tableName)
    {
       this.apiurl ='https://api.bmob.cn/1/classes/'+tableName;
    }
    static create(tableName)
    {
       return new Api(tableName);
    }
    request(method,data)
    {
        return request(this.apiurl,'GET',data);
    }
    
    
}

function request(url,method,data)
{
    return new Promise((resolve,reject)=>{

         wx.request({
           url: url,
           method:method,
           header:{
             'X-Bmob-Application-Id':'a613d7850199a11fc929202507958aa4',
             'X-Bmob-REST-API-Key':'d631329383f295f3130773b5c35fa062',
             'Content-Type': 'application/json'
               // Bmob.initialize("a613d7850199a11fc929202507958aa4", "d631329383f295f3130773b5c35fa062");
           },
           data:data,
           success:function(res)
           {
             resolve(res);
           },
           fail: function (err)
           {
                reject(err);
           }

         });

    });

}


class Query
{
   constructor()
   {
      this.querymap=new Map();
      this.limit=1000;
      this.skip=0;
      this.orderquery=[];
      this.include=[];//
   }

   where(column,option,value)
   {
       let bmobexp=this.tobmobExp(option);
       let va = this.querymap.get(column);
       if(va)
       {
         va.set(bomobexp,value);
       }else{
         let map = new Map();
         map.set(bmobexp,value);
         this.querymap.set(column, map);
       }
      
       return this;
   }
    
   tobmobExp(option) {
        let value = "";
        switch (option) {
          case ">":
            value = "gt";
            break;
          case ">=":
            value = "gte";
            break;
          case "<":
            value = "lt";
            break;
          case "<=":
            value = "lte";
            break;
          case "!=":
            value = "ne";
            break;
        }
        return "$" + value;
    }

   perpage(perPageNum) {
      this.limit = perPageNum;
      return this;
   }

   page(pageNum,perPageNum=1000) {
      if (perPageNum >= 1000) {
          perPageNum = 1000;
      }
      this.limit = perPageNum;
      this.skip = this.limit * pageNum - 1;
      return this;
    }
    orderBy(key, isasc=true) {
      this.orderquery.push(isasc ? key : "-" + key);
      return this;
    }

    point(pointername) {
      this.include.push(pointername);
      // this.query.withPointer(pointername, args);
      return this;
    }


    toQueryData()
    {
        let data=[];
        data.where = JSON.stringify(this.querymap);
        data.limit=this.limit;
        data.skip=this.skip;
        data.order = this.orderquery.join(',');
        if(this.include.length>0)
        {
           data.include = this.include.join('.');
        }
        
        return data;
    }


}


