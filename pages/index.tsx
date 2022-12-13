import { useState, useEffect } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import dayjs from 'dayjs';

import processExcerpt from '../helpers/processStrings';

import Card from '../components/card/card';
import Pagination from '../components/pagination/pagination';
import Spinner from '../components/icons/spinner';
// let arr = [0, 1, 2, 3, 4, 5, 6];

let pageSize = 10;


export type Post = {
  id: number;
  link: string;
  modified: string;
	slug: string;
	content?: {
		rendered: string
	}
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
		}[][]
  };
};

const Home: NextPage = () => {
  useEffect(() => {
		setPostsIsLoading(true);
    axios
      .get<Post[]>(
        'http://localhost/build-media/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link, modified,_links,_embedded&_embed'
      )
      .then((res) => {
        console.log(res.data);
				setPostsIsLoading(false)
        setPosts(res.data);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
	const [postsIsLoading, setPostsIsLoading] = useState(true);
  return (
    <div className="grid max-w-7xl grid-cols-3 gap-5">
      {postsIsLoading ? <Spinner /> : posts.map((el) => {
        let imageUrl = el._embedded['wp:featuredmedia']
          ? el._embedded['wp:featuredmedia']['0'].source_url
          :'';
				let categoryName = el._embedded['wp:term']
				? el._embedded['wp:term'][0][0].name
				:'';
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
  );
};

export default Home;
