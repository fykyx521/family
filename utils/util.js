

function dbrequest()
{

}

export function cloud(cloudname,params)
{
    return new Promise((resolve,reject)=>{
      wx.request({
        url: 'https://api.bmob.cn/1/functions/' + cloudname,
        data: params,
        header: {
          'X-Bmob-Application-Id':'a613d7850199a11fc929202507958aa4',
          'X-Bmob-REST-API-Key':'d631329383f295f3130773b5c35fa062',
          'Content-Type':'application/json'
        },
        method: 'post',
        dataType: 'json',
        success: function (res) {   
            resolve(res);
        },
        fail: function (res) {
            reject(res);
        },
        complete: function (res) {

        },
      })


    });
     
}

