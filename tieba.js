var d = new Date()
var m = d.getMonth() + 1
var day = d.getDate()

const signUrl = {
    url: "http://c.tieba.baidu.com/c/c/forum/msign",
    header: {},
    body: {}
}

$httpClient.post(signUrl, function (error, response, data) {
    if (error) {
        $notification.post("百度贴吧 自动签到", "接口错误！", error)
        $done()
    }
    let resp = JSON.parse(data)
    let state = resp.error["errno"]
    if (state === "0") {
        let sign_days = resp.info[0]["sign_day_count"]
        $notification.post("🌟 " + m + "月" + day + "日【自动签到】报告", "", "🔺 百度贴吧 成功！已连续签到" + sign_days + "天")
        $done()
    } else if (state === "340011" && resp.sign_notice === "") {
        $notification.post("🌟 " + m + "月" + day + "日【自动签到】报告", "", "🔺 百度贴吧 今天已签过！")
        $done()
    } else {
        $notification.post("‼️ " + m + "月" + day + "日【自动签到】报告", "🔔 百度贴吧 失败！", "请检查！")
        $done()
    }
})