import { useState, useEffect } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';

import Card from '../components/card/card';
import Pagination from '../components/pagination/pagination';
// let arr = [0, 1, 2, 3, 4, 5, 6];

let pageSize = 10;

const Home: NextPage = () => {
  useEffect(() => {
    axios
      .get<{}[]>('http://localhost/build-media/wp-json/wp/v2/posts/')
      .then((res) => {
        setPosts(res.data)
      })
			.catch((error: string) => {
				console.log(error)
			})
  }, []);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<{}[]>([]);
  return (
    <div className="grid max-w-7xl grid-cols-3 gap-5">
      {posts.map((el) => (
        <Card key={posts.indexOf(el)} />
      ))}
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
