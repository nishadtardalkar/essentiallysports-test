import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
    	<Head>
			<link href="https://fonts.googleapis.com/css?family=Roboto&display=optional" rel="stylesheet" />
			<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />
		</Head>
		<body>
			<Main />
			<NextScript />
		</body>
    </Html>
  )
}
