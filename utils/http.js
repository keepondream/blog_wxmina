const env = require('./env')
const http = (url, method, data, showLoading = true) => {

    let URL = env.url + url
    let request_params = {
        params: {}
    }
    let return_result = {
        return_res: {}
    }
    return new Promise((resolve, reject) => {
        if (showLoading) {
            wx.showLoading({
                title: '正在拼命加载中...',
                mask: true
            })
        }

        wx.request({
            url: URL,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json'
            },
            success: (res) => {
                if (env.debug) {
                    if (data) {
                        request_params = {
                            params: data
                        }
                    }
                    if (res) {
                        return_result = {
                            return_res: res

                        }
                    }
                    console.log('request url: ' + url + ' , method: ' + method + ' >>>>>>>', request_params, return_result)
                }
                if (res.statusCode != 200) {
                    reject({
                        error: '服务器忙,请稍后重试',
                        code: 500
                    })
                    return
                }

                resolve(res)
                wx.hideLoading()
            },
            fail: (res) => {
                // 接口调用失败
                reject({
                    error: '网络错误',
                    code: 0
                })
                wx.hideLoading()
            },
            complete: (res) => {
                setTimeout(() => {
                    wx.hideLoading()
                }, 3000)
            }
        })
    })
}

module.exports = http