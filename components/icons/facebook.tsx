import * as React from 'react';
import Link from 'next/link';

function FacebookIcon() {
  return (
    <Link href="#">
      <svg
        width={10}
        height={18}
        viewBox="0 0 10 18"
        fill="#fff"
        xmlns="http://www.w3.org/2000/svg"
        className="hover:fill-orange"
      >
        <path d="M3.053 17.337h3.144v-7.91h2.628l.397-3.078H6.197V4.377c0-.888.246-1.495 1.512-1.495h1.62V.12A22.92 22.92 0 006.98 0C4.642 0 3.054 1.441 3.054 4.074V6.35H.413v3.078h2.64v7.91z" />
      </svg>
    </Link>
  );
}

export default FacebookIcon;
