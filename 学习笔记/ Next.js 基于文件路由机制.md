静态路由

Next.js 在构建时会自动查找根目录的 pages 文件夹，pages 文件夹中 js 文件对应渲染的 React 组件，就是 js 文件内 export default 导出的组件。

动态路由

动态路由使用中括号 [variable].js 作为文件名，其中 variable 会映射成 URL query 的变量名称，在 React 中可以通过 useRouter 获取路由信息：
```
import {useRouter} from 'next/router'

export default function PortfolioDemo() {
const router = useRouter();
console.log(router.pathname);
console.log(router.query);

    return <>PortfolioDemo</>
}
```

动态路由 query
在匹配 URL 时，静态路由优先权大于动态路由。

⚠️注意：文件夹也可以是动态的

Link 组件

可以使用 Next.js 中的 Link 组件来导航至各个页面：
```
import Link from 'next/link';

<Link href="/">
  首页
</Link>
```
Link 组件的 href 不但支持字符串，还可以传入 UrlObject，接口如下：
```
interface UrlObject {
auth?: string | null | undefined;
hash?: string | null | undefined;
host?: string | null | undefined;
hostname?: string | null | undefined;
href?: string | null | undefined;
pathname?: string | null | undefined;
protocol?: string | null | undefined;
search?: string | null | undefined;
slashes?: boolean | null | undefined;
port?: string | number | null | undefined;
query?: string | null | ParsedUrlQueryInput | undefined;
}
如果 url 很长，参数很多的情况下可以使用这种方法传参。
```
router.push

在代码中，如果需要触发导航逻辑，可以使用 router.push 方法：
```
import {useRouter} from 'next/router'

export default function PortfolioDemo() {
const router = useRouter();

		const myFunc = () => {
	    router.push("[url]");
	  }

    return <>PortfolioDemo</>
}
```

pages 文件夹下创建特殊文件 404.js，Next.js 将会在返回 404 错误时，自动加载组件。

相当于用户可以自定义 404 页面