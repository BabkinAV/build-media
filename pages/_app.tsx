import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
		<Head>
        <title>Build media</title>
      </Head>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </>
  );
}

export default MyApp;
