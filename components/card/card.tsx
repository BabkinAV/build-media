import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  className?: string;
  title: string;
  excerpt: string;
  imageLink: string;
  categoryName: string;
  postDate: string;
	slug: string;
	postId: number;
}

const Card = ({
  title,
  excerpt,
  imageLink,
  categoryName,
  postDate,
	slug
	
}: CardProps) => {
  return (
    <Link href={`/posts/${slug}`} >
      <div className="relative h-80 rounded-[19px] bg-lightestGrey px-[20px] pt-[15px] pb-[40px]">
        {/* transition-all hover:translate-y-[-5px] hover:shadow-md */}
        <div className="flex h-full flex-col justify-between">
          <div>
            <h5 className="text-lg font-medium">{title}</h5>
            <p className="font-light">{excerpt}</p>
          </div>
          <div className="relative h-[150px] w-[100%]">
            {imageLink === '' ? (
              <div className="h-[100px]">No image</div>
            ) : (
              <Image
                src={imageLink}
                alt="Post picture"
                fill
                style={{objectFit: 'cover'}}
								sizes="(max-width: 768px) 300px,
              (max-width: 1200px) 500px,
              800px"
              />
            )}
          </div>
        </div>
        <div className="absolute bottom-2 left-5 font-medium text-darkGrey">
          <span>{categoryName}</span>
          <span className="mx-2">&#183;</span>
          <span>{postDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
