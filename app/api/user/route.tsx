import { UserType } from '@/utils/users'
import { cookies } from 'next/headers';

export const GET = async (request: Request) => {
  // Get user info from session
  const cookieStore = await cookies()
  const session = cookieStore.get('session');
  console.info('Fetching user information');
  
  // Make the response extra slow for testing
  await new Promise(resolve => setTimeout(resolve, 2_000));
  return new Response(JSON.stringify({
    id: 1,
    name: 'UserName',
    profilePic: 'https://www.loremfaces.net/24/id/1.jpg'
  } as UserType));
}