# Next.js API 路由是一套基于文件系统的服务端接口解决方案，让你无需额外部署后端，即可在项目内编写 RESTful API。

## 核心规则
目录：pages/api/ <br>
映射：文件自动对应 API 路径 → pages/api/hello.js → /api/hello<br>
导出：默认导出 handler(req, res) 函数<br>
环境：纯 Node.js，代码不进入客户端包<br>

## 请求对象 req（NextApiRequest）
   req.method：GET/POST/PUT/DELETE<br>
   req.query：URL 查询参数（/api/user?id=1 → { id: '1' }）<br>
   req.body：自动解析 JSON / 表单 /multipart<br>
   req.headers / req.cookies / req.ip <br>
## 响应对象 res（NextApiResponse）<br>
   res.status(code)：设置状态码<br>
   res.json(data)：返回 JSON<br>
   res.send(body)：返回文本 / HTML<br>
   res.setHeader() / res.redirect() / res.end()<br>
   
## 默认导出方法handler，在页面组件中调用示例
```
export default function Post({post}) {
    const [data, setData] = useState(null)

    // ✅ 客户端调用 API 完全正常
    useEffect(() => {
        fetch('/api/hello') //pages/api/hello.js的hander函数会处理并返回数据
            .then(res => {
                console.log('res+++++++++++++');
                console.log(res);
                console.log(res);
                return res.json()
            })
            .then(d => setData(d))
    }, [])

    return <>
        <div>{post?.title}</div>
        <div>{data?.name}</div>
    </>;

}

```