import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { InferGetStaticPropsType } from 'next';
import fetchCategories from '../helpers/fetchCategories';

import Layout from '../components/layout/layout';
import PostList from '../components/posts/post-list';
import Spinner from '../components/icons/spinner';

import { Post } from '../components/posts/post-list';

const pageSize = 6;

export type Category = {
  id: number;
  name: string;
  slug: string;
};

const Home = ({
  posts,
  categories,
  totalPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const firstUpdate = useRef({'main': true});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsArr, setPostsArr] = useState<Post[]>(posts);
  const [postsLoading, setPostsLoading] = useState<Boolean>(false);


  useEffect(() => {
		if (firstUpdate.current['main']) {
			console.log('firstUpdate.current: ', firstUpdate.current);

			firstUpdate.current['main']= false;
			return;
		}
    const fetchData = async () => {
      setPostsLoading(true);
      const { data: resData } = await axios.get<Post[]>(
        `http://localhost/build-media/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link, modified,_links,_embedded&_embed&page=${currentPage}&per_page=${pageSize}`
      );
      setPostsArr(resData);
    };

    fetchData()
      .catch(error => {
        console.log((error as Error).message);
      })
      .finally(() => {
        setPostsLoading(false);
      });
  }, [currentPage]);

  return (
    <Layout categories={categories}>
      <div className="grid max-w-7xl grid-cols-3 gap-5">
        {postsLoading ? (
          <Spinner />
        ) : (
          <PostList
            postsArr={postsArr}
            pageSize={pageSize}
            currentPage={currentPage}
            totalPosts={totalPosts}
            pageChangeHandler={page => setCurrentPage(page)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const { data: resData, headers: resHeaders } = await axios.get<
    Post[],
    { data: Post[]; headers: { 'x-wp-total': string } }
  >(
    `http://localhost/build-media/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link, modified,_links,_embedded&_embed&page=1&per_page=${pageSize}`
  );

  const categories = await fetchCategories();

  const totalPosts = resHeaders['x-wp-total'];

  console.log(resHeaders);
  console.log('Main page revalidated!');
  return {
    props: {
      posts: resData,
      totalPosts: parseInt(totalPosts),

      categories,
    },
  };
}
