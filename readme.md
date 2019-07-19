# Surge JavaScript 脚本说明
## 【贴吧签到】[代码](https://raw.githubusercontent.com/IsSuperman/Surge-js/master/tieba.js)
1. 将脚本内容复制到本地。
2. 下载【百度贴吧】iOS手机版。
3. 使用Surge或Thor等抓包工具对【一键签到】抓包，得到Header和Body的内容，将内容填到脚本对应的地方。
4. 设置Cron参数，建议凌晨一点以后，如 0 8 * * * (每天上午8点整自动签到)

## 【快递追踪】[代码](https://raw.githubusercontent.com/IsSuperman/Surge-js/master/kuaidi.js)
1. 快递备注可自己设置。
2. 快递单号务必填到双引号内。
3. 支持同时追踪多个快递。
```
const posts = [
    {
        "note": "快递1",
        "no": "快递单号1"
    },{
        "note": "快递2",
        "no": "快递单号2"
    },
]
```
4. 设置Cron参数，如 0 6-20 * * * (每天6点到20点整点检查一次)