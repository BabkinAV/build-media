import React from 'react';
import {useRouter} from 'next/router';

const InputSearch = () => {
	const router = useRouter();
  const formSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
		router.push(`/search/q=${target.search.value}`)
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <label className="invisible" htmlFor='search'>Search:</label>
      <input
        type="text"
        placeholder="Search"
        name="search"
        className="w-full border border-dimmedGrey bg-transparent p-1 text-dimmedGrey focus:outline-none active:outline-none"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default InputSearch;
