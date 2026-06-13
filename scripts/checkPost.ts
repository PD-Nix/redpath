import { db } from '../lib/db';
import { posts } from '../lib/db/schema';
import { eq } from 'drizzle-orm';

async function main() {
  const idToCheck = 1;
  try {
    const [post] = await db.select().from(posts).where(eq(posts.id, idToCheck));
    console.log('Post:', post);
  } catch (err) {
    console.error('Error querying post:', err);
  }
}

main();
