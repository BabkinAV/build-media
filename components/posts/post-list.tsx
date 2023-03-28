import React from 'react';
import dayjs from 'dayjs';

import Card from '../card/card';
import Pagination from '../pagination/pagination';

import processExcerpt from '../../helpers/processStrings';

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

const PostList = ({
  postsArr,
  pageSize,
  currentPage,
  totalPosts,
  pageChangeHandler,
}: {
  postsArr: Post[];
  pageSize: number;
  currentPage: number;
  totalPosts: number;
  pageChangeHandler: (page: number) => void;
}) => {
  return (
    <>
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
          onPageChange={pageChangeHandler}
          totalCount={totalPosts}
        />
      </div>
    </>
  );
};

export default PostList;
