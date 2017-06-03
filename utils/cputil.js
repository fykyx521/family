function indexToAddr(index)
{
    let result=0;
  
    switch(parseInt(index))
    {
        case 0: result=141124;break;//临县
        case 1: result=140100;break;// 太原
        case 2: result=141102;break; //离石
    }
    return result;
}
function dateDiff(hisTime,nowTime){
        var now =nowTime?nowTime:new Date().getTime(),
            diffValue = now - hisTime,
            
            result='',
            minute = 1000 * 60,
            hour = minute * 60,
            day = hour * 24,
            halfamonth = day * 15,
            month = day * 30,
            year = month * 12,

            _year = diffValue/year,
            _month =diffValue/month,
            _week =diffValue/(7*day),
            _day =diffValue/day,
            _hour =diffValue/hour,
            _min =diffValue/minute;

             console.log('hisTime'+hisTime);

            console.log('diffValue'+diffValue);
            
            if(_year>=1) result=parseInt(_year) + "年前";
            else if(_month>=1) result=parseInt(_month) + "个月前";
            else if(_week>=1) result=parseInt(_week) + "周前";
            else if(_day>=1) result=parseInt(_day) +"天前";
            else if(_hour>=1) result=parseInt(_hour) +"小时前";
            else if(_min>=1) result=parseInt(_min) +"分钟前";
            else result="刚刚";
            return result;
  }

var dateAfter= function(startDate,nowTime){
        let now=new Date();
        let hours=startDate.getHours();
        // let newdate=new Date();
        // newdate.setTime(startDate.getTime());
        let clonedate=new Date();
        clonedate.setDate(clonedate.getDate()+1);
        let result="今天";
        if(clonedate.getMonth()==startDate.getMonth()&&startDate.getDate()==clonedate.getDate())
        {
            result="明天";
        }
        clonedate.setDate(clonedate.getDate()+1);//已经加了1天 所以再加1天是后台
        if(clonedate.getMonth()==startDate.getMonth()&&startDate.getDate()==clonedate.getDate())
        {
            result="后天";
        }
        return result+hours+"点走";
  }
  var isToday=function(startDate)
  {
     let now=new Date();
     if(now.getDate()==startDate.getDate())
     {
        return true;
     }
     return false;
  }

const mapdata = {
  '141124': '临县',
  '140100': '太原',
  '141102': '离石'  
};
function fromtostr(fromaddr,toaddr)
{
   return mapdata[fromaddr] + '到' + mapdata[toaddr];
}

function showLoading(title,mask=true)
{
    if(wx.showLoding)
    {
        wx.showLoading({
            title:title,
            mask:true,
        });
    }
    wx.showNavigationBarLoading();
    
}

function hideLoading()
{
    if(wx.hideLoading)
    {
        wx.hideLoading();
    }
    wx.hideNavigationBarLoading();
}
function showToast(title)
{
    wx.showToast({title:title});
}
function navigateTo(path)
{
    return new Promise(function(resolve,reject){
      wx.navigateTo({
      url: path,
      success: function(res){
        // success
         resolve(res);
      },
      fail: function(res) {
        // fail
         reject(res);
      },
      complete: function(res) {
        // complete
      }
    })
    });
    
}
function redirectTo(path)
{
  return new Promise(function (resolve,reject){
        wx.redirectTo({
          url: path,
          success: function(res){
            resolve(res);
          },
          fail: function(res) {
            reject(res);
          },
          complete: function(res) {
            // complete
          }
        })
    });
}

module.exports = {
  indexToAddr: indexToAddr,
  dateDiff:dateDiff,
  dateAfter:dateAfter,
  isToday:isToday,
  fromtostr:fromtostr,
  showLoading,
  hideLoading,
  navigateTo,
  showToast,
  redirectTo
}