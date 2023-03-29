import * as React from 'react';
import Link from 'next/link';

function EmailIcon() {
  return (
    <svg
      width={19}
      height={16}
      viewBox="0 0 19 16"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      className="hover:fill-orange"
    >
      <path d="M.012 4.687v7.59a3.06 3.06 0 003.06 3.06h12.237a3.06 3.06 0 003.06-3.06V3.1a3.06 3.06 0 00-3.06-3.06H3.07A3.06 3.06 0 00.012 3.1v1.588zm3.06-3.118h12.237a1.53 1.53 0 011.53 1.53V4.23L9.19 8.349 1.542 4.23V3.099a1.53 1.53 0 011.53-1.53zm-1.53 4.4L8.828 9.89a.765.765 0 00.725 0l7.285-3.922v6.308a1.53 1.53 0 01-1.53 1.53H3.072a1.53 1.53 0 01-1.53-1.53V5.97z" />
    </svg>
  );
}

export default EmailIcon;
