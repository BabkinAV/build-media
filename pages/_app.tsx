import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
	let router = useRouter();
  return (
    <>
		<Head>
        <title>Build media</title>
      </Head>
        <Component {...pageProps} key={router.asPath}/>
    </>
  );
}

export default MyApp;
