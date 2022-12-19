import React, { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from 'axios';

import Layout from '../../components/layout/layout';

// import Card from '../components/card/card';
import { Category } from '../index';

import { Post } from '../index';
import PostContent from '../../components/posts/post-content';
import Spinner from '../../components/icons/spinner';

let arr = [0, 1, 2, 3];

const PostPage = ({
  categories,
  postData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout categories={categories}>
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
  // const publishedPosts = await axios.get<[{ id: number; slug: string }]>(
  //   'http://localhost/build-media/wp-json/wp/v2/posts?status=publish&_fields=id,slug'
  // );
  // const generatedPaths = publishedPosts.data.map(
  //   (post) => '/posts/' + post.slug
  // );
  return {
    paths: [{ params: { slug: '8th-test' } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
	let slug;
	if (context.params) {
		slug = context.params.slug;
		
	} else {
		slug = '';
	}
	console.log('slug: ', slug)
  const categories = await axios.get<Category[]>(
    `http://localhost/build-media/wp-json/wp/v2/categories?_fields=name,%20id,%20slug`
  );


  const fetchedPost = await axios.get<Post[]>(
    `http://localhost/build-media/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link,%20content,%20modified,_links,_embedded&_embed&slug=${slug}`
  );

	console.log('fetched post: ', fetchedPost.data);

  return {
    props: {
      categories: categories.data,
      postData: fetchedPost.data[0],
    }, // will be passed to the page component as props
  };
};
