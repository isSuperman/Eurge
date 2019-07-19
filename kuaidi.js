const posts = [
    {
        "note": "快递备注",
        "no": "快递单号"
    },
]

const coms = {
    "zhongtong": "中通快递",
    "sf": "顺丰快递",
    "shentong": "申通快递",
    "yto": "圆通快递",
    "yunda": "韵达快递",
    "youzhengguonei": "邮政快递包裹"
}

const autoapi = "https://www.kuaidi100.com/autonumber/autoComNum?resultv2=1&text="
const queryapi = "http://www.135cha.com/model/ajax.php?"

posts.forEach(element => {
    querypost(element.no, element.note)
});

async function querypost(postid, note) {
    if (postid) {
        $httpClient.post(autoapi + postid, function (error, response, data) {
            if (error) {
                $notification.post("公司ID查询失败！", "请检查", "")
                $done()
            } else {
                let resp = JSON.parse(data)
                let com_id = resp.auto[0].comCode
                $httpClient.get(queryapi + "type=" + com_id + "&no=" + postid, function (error, response, data) {
                    if (error) {
                        $notification.post("单号查询失败！", "请检查", "")
                    } else {
                        let res = JSON.parse(data)
                        let time = res.data[0].time
                        let com = coms[res.com] ? coms[res.com] : res.com
                        let context = res.data[0].context
                        let isStore = $persistentStore.read(postid)
                        if (isStore) {
                            if (isStore !== time) {
                                let save = $persistentStore.write(time, postid)
                                if (!save) {
                                    $notification.post("写入缓存失败！", postid)
                                    $done()
                                }
                                $notification.post("📦 快递追踪 <" + note + "> " + com, "更新时间：" + time, context)
                                $done()
                            }
                        } else {
                            let save = $persistentStore.write(time, postid)
                            if (!save) {
                                $notification.post("写入缓存失败！", postid)
                                $done()
                            }
                            $notification.post("📦 快递追踪 <" + note + "> " + com, "更新时间：" + time, context)
                            $done()
                        }
                    }
                })
            }
        })
    } else {
        $notification.post("单号不存在！", "请检查", "")
        $done()
    }
}