/**
 *
 * Created by gemery on 2018/5/14.
 */
var _mm = {
    request: function (param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function (res) {
                // 请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 没有登录状态，需要强制登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function (err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    deleteRowByFieldName:function(tableName,idFieldName,idList,callBack){
        console.log(this)
        $.ajax({
            type:'get',
            url:'"http://192.168.1.251:8091/api/baseData/BatchDeleting?'+
                'tableName='+tableName+'&idFieldName='+idFieldName+'&idList='+
                idList,
            success:function (res) {
                callBack();
            }
        });
    }
}
moudle.exports = _mm;