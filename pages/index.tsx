import { useState, useEffect } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';

import processExcerpt from '../helpers/processStrings';

import Card from '../components/card/card';
import Pagination from '../components/pagination/pagination';
// let arr = [0, 1, 2, 3, 4, 5, 6];

let pageSize = 10;


type Post = {
  id: number;
  link: string;
  modified: string;
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
  };
};

const Home: NextPage = () => {
  useEffect(() => {
    axios
      .get<Post[]>(
        'http://localhost/build-media/wp-json/wp/v2/posts?_fields=id,excerpt,title,link, modified,_links,_embedded&_embed'
      )
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  return (
    <div className="grid max-w-7xl grid-cols-3 gap-5">
      {posts.map((el) => {
        let imageUrl = el._embedded['wp:featuredmedia']
          ? el._embedded['wp:featuredmedia']['0'].source_url
          :'';
        return (
          <Card
            key={posts.indexOf(el)}
            title={el.title.rendered}
            excerpt={processExcerpt(el.excerpt.rendered)}
            imageLink={imageUrl}
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
  );
};

export default Home;
