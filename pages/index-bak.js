import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
// 使用调用的异步函数来完成它getInitialProps。获取数据并将它们作为props发送到我们的页面
const Index = props => (
  <Layout>
    <h1 onClick={}>Batman TV Shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
    {/* 
    1.传统的基于CSS文件的样式（包括SASS，PostCSS等）   import "../style.css"
    2.CSS中的Js样式     ---建议使用JS中的CSS
    Next.js预装了一个名为styled-jsx的 JS框架中的CSS 
    */}
    <style jsx>{`
      h1,
      a {
        font-family: 'Arial';
      }

      ul {
        padding: 0;
      }

      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </Layout>
)
/* 要在页面加载时加载数据，我们使用的getInitialProps是async静态方法。
它可以异步获取解析为Object填充的JavaScript平面的任何内容props。
返回的数据getInitialProps在服务器渲染时被序列化，类似于JSON.stringify。
确保返回的对象getInitialProps是普通的Object而不是使用Date，Map或Set。
 对于初始页面加载，getInitialProps仅在服务器上执行。
 getInitialProps只有在通过Link组件导航到不同路径或使用路由API 时才会在客户端上执行。
*/
Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.json()
  // 消息仅打印在服务器上。

  // 那是因为我们在服务器上渲染页面。所以，我们已经有了数据，没有理由在客户端再次获取它。
  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data.map(entry => entry.show)
  }
}
export default Index
