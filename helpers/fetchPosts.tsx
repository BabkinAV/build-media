import axios from 'axios';
import { Post } from '../components/posts/post-list';

/** Fetch posts from Wordpress REST API */ 
const fetchPosts: (
  page: number,
  pageSize: number,
  categoryId?: number,
	searchStr?: string
) => Promise<[Post[], number]> = async (page = 1, pageSize = 6, categoryId, searchStr) => {

	
  let reqString = `${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/wp-json/wp/v2/posts?_fields=id,slug,excerpt,title,link, modified,_links,_embedded&_embed&page=${page}&per_page=${pageSize}`;

	
	 

	 if (searchStr !== undefined) {
		
		reqString = reqString + '&search=ngrok';
	 }
	
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
