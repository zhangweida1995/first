import Link from 'next/link'
import Head from 'next/head'
import Button from './button/Button'
const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Head>
      <title>My page title</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
    </Head>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <Button />
  </div>
)

export default Header
