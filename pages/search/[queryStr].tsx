import { useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import fetchCategories from '../../helpers/fetchCategories';
import fetchPosts from '../../helpers/fetchPosts';

import Layout from '../../components/layout/layout';
import PostList from '../../components/posts/post-list';
import Loading from '../../components/Loading';

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
  searchQuery,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <Layout categories={categories}>
      <div className="grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Loading>
          <div className="col-span-full mb-2 text-center">
            <h2 className="text-3xl font-bold">
              Your search results for: &#34;{searchQuery}&#34;
            </h2>
          </div>
          {posts.length > 0 ? (
            <PostList
              postsArr={posts}
              pageSize={pageSize}
              currentPage={currentPage}
              totalPosts={totalPosts}
              pageChangeHandler={page => setCurrentPage(page)}
            />
          ) : (
            <p className="text-xl">No results found</p>
          )}
        </Loading>
      </div>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<
  {
    categories: Category[];
    posts: Post[];
    totalPosts: number;
    searchQuery: string;
  },
  { queryStr: string; reqid: string }
> = async context => {
  const searchQueryArr = context.params?.queryStr.split('q=');

  if (!searchQueryArr || searchQueryArr?.length < 2) {
    return {
      notFound: true,
    };
  }

  const searchQuery = searchQueryArr[1];

  const categories = await fetchCategories();

  if (searchQuery === '') {
    return {
      props: {
        posts: [],
        totalPosts: 0,
        categories,
        searchQuery,
      },
    };
  }

  const page = 1;

  const [posts, totalPosts] = await fetchPosts(
    page,
    pageSize,
    undefined,
    searchQuery
  );

  return {
    props: {
      posts,
      totalPosts,
      categories,
      searchQuery,
    },
  };
};
