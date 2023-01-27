import { useState, useEffect } from 'react';
import axios from 'axios';

import { InferGetStaticPropsType } from 'next';
import dayjs from 'dayjs';

import processExcerpt from '../helpers/processStrings';
import fetchCategories from '../helpers/fetchCategories';

import Layout from '../components/layout/layout';
import Card from '../components/card/card';
import Pagination from '../components/pagination/pagination';

const pageSize = 6;

export type Post = {
  id: number;
  link: string;
  modified: string;
  slug: string;
  content?: {
    rendered: string;
  };
  title: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  _embedded: {
    'wp:featuredmedia': {
      source_url: string;
    }[];
    'wp:term': {
      id: number;
      name: string;
      taxonomy: string;
      slug: string;
    }[][];
  };
};

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsArr, setPostsArr] = useState<Post[]>(posts);

  useEffect(() => {
    const fetchData = async () => {
      const { data: resData } = await axios.get<Post[]>(
        `http://localhost/build-media/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link, modified,_links,_embedded&_embed&page=${currentPage}&per_page=${pageSize}`
      );
      setPostsArr(resData);
    };

    fetchData().catch(error => {
      console.log((error as Error).message);
    });
  }, [currentPage]);

  return (
    <Layout categories={categories}>
      <div className="grid max-w-7xl grid-cols-3 gap-5">
        {postsArr.map(el => {
          let imageUrl = el._embedded['wp:featuredmedia']
            ? el._embedded['wp:featuredmedia']['0'].source_url
            : '';
          let categoryName = el._embedded['wp:term']
            ? el._embedded['wp:term'][0][0].name
            : '';
          let postDate = dayjs(el.modified).format('DD.MM.YYYY');
          return (
            <Card
              key={el.id}
              title={el.title.rendered}
              slug={el.slug}
              excerpt={processExcerpt(el.excerpt.rendered)}
              imageLink={imageUrl}
              categoryName={categoryName}
              postDate={postDate}
              postId={el.id}
            />
          );
        })}
        <div className="col-span-full mb-5 text-center">
          <Pagination
            pageSize={pageSize}
            siblingCount={1}
            currentPage={currentPage}
            onPageChange={page => setCurrentPage(page)}
            totalCount={totalPosts}
          />
        </div>
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
