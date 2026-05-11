import { cookies } from "next/headers";

export const GET = async (request: Request, { params }: { params: Promise<{ postId: string }> }) => {
  // Get user info from session
  const cookieStore = await cookies()
  const session = cookieStore.get('session');
  // Check the database
  console.info(`Checking if user liked post id ${(await params).postId}...`);

  // Make the response extra slow for testing
  await new Promise(resolve => setTimeout(resolve, 2_000));
  return new Response("true");
}
