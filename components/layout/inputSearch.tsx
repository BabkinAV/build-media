import React from 'react';
import { useRouter } from 'next/router';
import LookingGlassIcon from '../icons/lookingGlass';

const InputSearch = () => {
  const router = useRouter();
  const formSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    router.push(`/search/q=${target.search.value}`);
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <label className="invisible" htmlFor="search">
        Search:
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          className="w-full border border-dimmedGrey bg-transparent p-1 pr-7 text-dimmedGrey focus:outline-none active:outline-none"
        />
        <button
          type="submit"
          className="absolute right-2  top-1/2 -translate-y-1/2"
        >
          <LookingGlassIcon />
        </button>
      </div>
    </form>
  );
};

export default InputSearch;
