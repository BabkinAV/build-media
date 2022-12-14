import React, { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import axios from 'axios';

// import Card from '../components/card/card';

import { Post } from '../index';
import PostContent from '../../components/posts/post-content';
import Spinner from '../../components/icons/spinner';

let arr = [0, 1, 2, 3];

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [postIsLoading, setPostIsLoading] = useState(true);

  const [postData, setPostData] = useState<Post>({
    id: 0,
    link: '',
    modified: '',
    slug: '',
    content: {
      rendered: '',
    },
    title: {
      rendered: '',
      protected: false,
    },
    excerpt: {
      rendered: '',
      protected: false,
    },
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url: '',
        },
      ],
      'wp:term': [[{ id: 0, name: '', taxonomy: '' }]],
    },
  });

  useEffect(() => {
    setPostIsLoading(true);

    axios
      .get<Post[]>(
        `http://localhost/build-media/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link,%20content,%20modified,_links,_embedded&_embed&slug=${slug}`
      )
      .then((res) => {
        console.log(res.data[0].content!.rendered);
        setPostData(res.data[0]);
        setPostIsLoading(false);
      })
      .catch((error: string) => {
        console.log(error);
      });
  }, [slug]);

  //localhost/build-media/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link,%20content,%20modified,_links,_embedded&_embed&slug=this-is-a-5-post-from-andrey

  console.log(slug);

  return (
    <div className="grid max-w-7xl  grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] gap-5">
      {postIsLoading ? (
        <Spinner />
      ) : (
        <PostContent
					categoryName={postData._embedded['wp:term'][0][0].name}
          postContent={postData.content!.rendered}
          title={postData.title.rendered}
					postDate={postData.modified}
					imageLink={postData._embedded['wp:featuredmedia'][0].source_url}
        />
      )}
      <div className="flex flex-col gap-5">
        {/* {arr.map((el) => (
          <div className="col-start-2" key={el}>
            <Card />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default PostPage;
