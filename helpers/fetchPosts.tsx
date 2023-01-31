import axios from 'axios';
import { Post } from '../components/posts/post-list';

const fetchPosts: (
  page: number,
  pageSize: number,
  categoryId?: number
) => Promise<[Post[], number]> = async (page = 1, pageSize = 6, categoryId) => {

  let reqString = `http://localhost/build-media/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link, modified,_links,_embedded&_embed&page=${page}&per_page=${pageSize}`;
	
  if (categoryId) {
    reqString = reqString + '&categories=' + categoryId.toString();
  }
  const { data: posts, headers: resHeaders } = await axios.get<
    Post[],
    { data: Post[]; headers: { 'x-wp-total': string } }
  >(reqString);

  const totalPosts = parseInt(resHeaders['x-wp-total']);

  return [posts, totalPosts];
};

export default fetchPosts;
