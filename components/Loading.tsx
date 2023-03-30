import { useState, useEffect } from 'react';
import { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import Spinner from './icons/spinner';

const Loading= (props:PropsWithChildren) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    <>
      {loading ? <Spinner /> : props.children}
    </>
  );
};

export default Loading;
