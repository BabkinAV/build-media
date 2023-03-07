import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // our code will go here
  const { token, postSlug, category, postId } = req.query;

	// console.log('request fired!')

	// console.log('Query token: ', token);
	// console.log('postSlug: ', postSlug);
	// console.log('category: ', category);
	// console.log('PostId: ', postId)
	// console.log('Db token: ', process.env.REVALIDATION_TOKEN);

  if ((token as string) !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

	try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate('/');
		await res.revalidate(`/categories/${category}`);
		await res.revalidate(`/posts/${postSlug}`);
    return res.json({ revalidated: true })
  } catch (err) {
		
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
