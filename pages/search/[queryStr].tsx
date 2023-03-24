import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { InferGetStaticPropsType } from 'next';
import fetchCategories from '../../helpers/fetchCategories';
import fetchPosts from '../../helpers/fetchPosts';

import Layout from '../../components/layout/layout';
import PostList from '../../components/posts/post-list';
import Spinner from '../../components/icons/spinner';

import { Post } from '../../components/posts/post-list';

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
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
	const firstUpdate = useRef(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsArr, setPostsArr] = useState<Post[]>(posts);
  const [postsLoading, setPostsLoading] = useState<Boolean>(false);


  // useEffect(() => {
	// 	if (firstUpdate.current) {

	// 		firstUpdate.current = false;
	// 		return;
	// 	}
  //   const fetchData = async () => {
  //     setPostsLoading(true);
  //     const [posts] = await fetchPosts(currentPage, pageSize)
  //     setPostsArr(posts);
  //   };

  //   fetchData()
  //     .catch(error => {
  //       console.log((error as Error).message);
  //     })
  //     .finally(() => {
  //       setPostsLoading(false);
  //     });
  // }, [currentPage]);

  return (
    <Layout categories={categories}>
      <div className="grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
          <PostList
            postsArr={postsArr}
            pageSize={pageSize}
            currentPage={currentPage}
            totalPosts={totalPosts}
            pageChangeHandler={page => setCurrentPage(page)}
          />
        
      </div>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
 

  const categories = await fetchCategories();

	const page = 1;

	const [posts, totalPosts] = await fetchPosts(page, pageSize, undefined, 'ngrok')



  return {
    props: {
      posts,
      totalPosts,
      categories,
    },
  };
}
