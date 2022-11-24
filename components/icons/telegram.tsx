import * as React from 'react';
import Link from 'next/link';

function TelegramIcon() {
  return (
    <Link href="#">
      <svg
        width={19}
        height={16}
        viewBox="0 0 19 16"
        fill="#fff"
        className="hover:fill-orange"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.965 1.879l-2.693 12.39c-.204.875-.733 1.093-1.486.681L9.682 12l-1.98 1.858c-.22.214-.402.393-.825.393l.295-4.078 7.606-6.704c.33-.288-.072-.447-.514-.16L4.862 9.087.814 7.849c-.88-.268-.896-.859.183-1.27L16.83.626c.734-.268 1.375.16 1.136 1.252z" />
      </svg>
    </Link>
  );
}

export default TelegramIcon;
