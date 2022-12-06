import { useState } from 'react';
import type { NextPage } from 'next';

import Card from '../components/card/card';
import Pagination from '../components/pagination/pagination';
let arr = [0, 1, 2, 3, 4, 5, 6,];

let pageSize = 10;

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <div className="grid max-w-7xl grid-cols-3 gap-5">
      {arr.map((el) => (
        <Card key={el} />
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
