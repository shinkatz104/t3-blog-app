import { getServerAuthSession } from "~/server/auth";
import { notFound } from "next/navigation";
import { PostNew } from '~/components/post/postNew'

const PostNewPage = async () => {
  const session = await getServerAuthSession();
  if (!session) notFound();
  return (
    <>
      <PostNew />
    </>
  )
}

export default PostNewPage