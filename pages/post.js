import { withRouter } from 'next/router'
import Markdown from 'react-markdown'
import Layout from '../components/Layout.js'
import fetch from 'isomorphic-unfetch'
import Axios from 'axios'
// 我们从“next / router”导入并使用“withRouter”函数，它将Next.js路由器作为属性注入
// const Content = withRouter(props => (
//   <div>
//     <h1>{props.router.query.title}</h1>
//     <p>This is the blog post content.</p>
//   </div>
// ))

// const Page = props => (
//   <Layout>
//     <Content />
//   </Layout>
// )

const Post = props => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <img src={props.show.image.medium} />
    <div className="markdown">
      <Markdown
        source={`
This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

### This is a title

And here's the content.
     `}
      />
    </div>
    {/* 全局样式 */}
    <style jsx global>{`
      .markdown {
        font-family: 'Arial';
      }

      .markdown a {
        text-decoration: none;
        color: blue;
      }

      .markdown a:hover {
        opacity: 0.6;
      }

      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}</style>
  </Layout>
)
// getInitialProps 函数的第一个参数是上下文对象。它有一个查询字段，我们可以用它来获取信息。query - 解析为对象的URL的查询字符串部分
Post.getInitialProps = async function(context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  //可以使用axios
  // const res = await Axios.get(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()
  // 我们只能在浏览器控制台上看到该消息。那是因为我们通过客户端导航到帖子页面。

  // 当我们单击包含Next.js <Link>组件的链接时，页面转换将在浏览器中进行，而不向服务器发出请求
  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Post
