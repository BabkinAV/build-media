import { useState } from 'react';
import axios from 'axios';

import { InferGetStaticPropsType, GetStaticPaths, GetStaticProps } from 'next';
import dayjs from 'dayjs';

import processExcerpt from '../../helpers/processStrings';

import Layout from '../../components/layout/layout';
import Card from '../../components/card/card';
import Pagination from '../../components/pagination/pagination';

import { Post, Category } from '..';

let pageSize = 10;


const CategoryPage = ({ posts, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {

  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <Layout categories={categories}>
      <div className="grid max-w-7xl grid-cols-3 gap-5">
        {posts.map((el) => {
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
            onPageChange={(page) => setCurrentPage(page)}
            totalCount={90}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;

export const getStaticPaths: GetStaticPaths = async () => {

  const allCategories = await axios.get<[{ id: number; slug: string, count: number }]>(
    'http://localhost/build-media/wp-json/wp/v2/categories?_fields=id,%20slug,%20count'
  );
	const publishedCategories = allCategories.data.filter(el => el.count > 0);
  const generatedPaths = publishedCategories.map((category) => {
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

export const getStaticProps: GetStaticProps<{categories: Category[], posts: Post[]} > = async (context) => {
	let slug: string;
  if (context.params) {
    slug = context.params.slug as string;
  } else {
    slug = '';
  }
  
	const categories = await axios
	.get<Category[]>(
		`http://localhost/build-media/wp-json/wp/v2/categories?_fields=name,%20id,%20slug`
	)



	const categoryObj = categories.data.find(el => el.slug === slug);
	
	if (!categoryObj) {
		return {
			notFound: true,
		}
	}

	const posts = await axios.get<Post[]>(
    `http://localhost/build-media/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link, modified,_links,_embedded&_embed&categories=${categoryObj.id}`
  );

	if (posts.data.length === 0) {
    return {
      notFound: true,
    };
  }


  return {
    props: {
      posts: posts.data,
			categories: categories.data
    }, 
  };
}
