import { useState, useEffect, useRef, } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';


import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next';
import fetchCategories from '../../helpers/fetchCategories';
import fetchPosts from '../../helpers/fetchPosts';

import Layout from '../../components/layout/layout';
import Spinner from '../../components/icons/spinner';
import PostList from '../../components/posts/post-list';

import { Category } from '..';
import { Post } from '../../components/posts/post-list';

const pageSize = 6;

const CategoryPage = ({
  posts,
  categories,
  categoryName,
  categoryId,
  totalPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter();
  const firstCategoryUpdate = useRef(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsArr, setPostsArr] = useState<Post[]>(posts);
  const [postsLoading, setPostsLoading] = useState<Boolean>(false);

	useEffect(() => {


		setPostsArr(posts);
		firstCategoryUpdate.current = true;

  }, [posts])

  useEffect(() => {
		if (firstCategoryUpdate.current) {
			firstCategoryUpdate.current = false;
			return;
		}
    const fetchData = async () => {
      setPostsLoading(true);
			const [posts] = await fetchPosts(currentPage, pageSize, categoryId); 
      setPostsArr(posts);
    };

    fetchData()
      .catch(error => {
        console.log((error as Error).message);
      })
      .finally(() => {
        setPostsLoading(false);
      });
  }, [currentPage, categoryId, categoryName]);
  return (
    <Layout categories={categories}>
      <div className="grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="col-span-full mb-2 text-center">
          <h2 className="text-3xl font-bold">Category: {categoryName}</h2>
        </div>
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

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const allCategories = await axios.get<
    [{ id: number; slug: string; count: number }]
  >(
    'http://localhost/build-media/wp-json/wp/v2/categories?_fields=id,%20slug,%20count'
  );
  const publishedCategories = allCategories.data.filter(el => el.count > 0);
  const generatedPaths = publishedCategories.map(category => {
    return {
      params: {
        slug: category.slug,
      },
    };
  });
  return {
    paths: generatedPaths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{
  categories: Category[];
  posts: Post[];
  categoryName: string;
  categoryId: number;
  totalPosts: number;
}> = async context => {
  let slug: string;
  if (context.params) {
    slug = context.params.slug as string;
  } else {
    slug = '';
  }

  const categories = await fetchCategories();

  const categoryObj = categories.find(el => el.slug === slug);

  if (!categoryObj) {
    return {
      notFound: true,
    };
  }

	const page = 1;


 const [posts, totalPosts] = await fetchPosts(page, pageSize, categoryObj.id)

  if (posts.length === 0) {
    return {
      notFound: true,
    };
  }



  console.log('Category page revalidated!');

  return {
    props: {
      posts,
      categoryName: categoryObj.name,
      categoryId: categoryObj.id,
      totalPosts,
      categories,
    },
  };
};
