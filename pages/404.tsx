import {Category} from './index';
import {  GetStaticProps, InferGetStaticPropsType } from 'next';
import axios from 'axios';

import Layout from '../components/layout/layout';
import fetchCategories from '../helpers/fetchCategories';


export default function Custom404({categories}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout categories={categories}>
      <h1 className="my-20 text-center text-xl font-bold">
        404 - Page Not Found
      </h1>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<{categories: Category[]} > = async (context) => {
  
	const categories = await fetchCategories();

  return {
    props: {
      categories: categories,
    }, 
  };
};
