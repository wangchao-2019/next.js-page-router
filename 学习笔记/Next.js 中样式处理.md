# 静态文件

根目录 public 目录下放静态文件，Next.js 会自动处理，放在这个文件夹外的静态文件是无法获取到的。

# CSS 模块

Next.js 通过 [name].module.css 文件命名约定来支持 CSS 模块。
``` 
pages/about.module.css

.title {
font-weight: bold;
color: indigo;
}
pages/about.js
``` 
``` 
import classes from './about.module.css';

const About = () => (
  <div>
    <p className={classes.title}>Next.js</p>
    <p>
      xxx
		</p>
  </div>
); 
``` 