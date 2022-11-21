import type { NextPage } from 'next';

import Card from '../components/card/card';
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Home: NextPage = () => {
  return (
    <div className="grid max-w-7xl grid-cols-3 gap-5">
      {arr.map((el) => (
        <Card key={el} />
      ))}
    </div>
  );
};

export default Home;
