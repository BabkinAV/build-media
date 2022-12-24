import React  from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from 'axios';

import Layout from '../../components/layout/layout';
import fetchCategories from '../../helpers/fetchCategories';

import { Category } from '../index';

import { Post } from '../index';
import PostContent from '../../components/posts/post-content';


const PostPage = ({
  categories,
  postData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout categories={categories} singlePostCategory={postData._embedded['wp:term'][0][0].slug}>
      <div className="grid max-w-7xl  grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] gap-5">
        <PostContent
          categoryName={postData._embedded['wp:term'][0][0].name}
          postContent={postData.content!.rendered}
          title={postData.title.rendered}
          postDate={postData.modified}
          imageLink={postData._embedded['wp:featuredmedia'][0].source_url}
        />
        <div className="flex flex-col gap-5">
          {/* {arr.map((el) => (
						<div className="col-start-2" key={el}>
							<Card />
						</div>
					))} */}
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const publishedPosts = await axios.get<[{ id: number; slug: string }]>(
    'http://localhost/build-media/wp-json/wp/v2/posts?status=publish&_fields=id,slug'
  );
  const publishedData = publishedPosts.data;
  const generatedPaths = publishedData.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
  return {
    paths: generatedPaths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{categories: Category[], postData: Post} > = async (context) => {
  let slug;
  if (context.params) {
    slug = context.params.slug;
  } else {
    slug = '';
  }

  const categories = await fetchCategories();

  const fetchedPost = await axios.get<Post[]>(
    `http://localhost/build-media/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link,%20content,%20modified,_links,_embedded&_embed&slug=${slug}`
  );

  if (fetchedPost.data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categories,
      postData: fetchedPost.data[0],
    }, 
  };
};
