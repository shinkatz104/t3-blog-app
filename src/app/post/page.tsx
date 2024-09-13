import Link from 'next/link'
import InfinitePostsWithScroll from '~/components/post/infinitePostsWithScroll'

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
      {/* Blog Posts */}
      {/* <InfinitePosts /> */}
      <InfinitePostsWithScroll />
      {/* Sticky Sidebar */}
      <aside className="space-y-6 md:sticky md:top-[90px] md:self-start">
        <div className="border rounded-lg p-6">
          <h3 className="font-bold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-muted-foreground hover:underline">
                Technology
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:underline">
                Travel
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:underline">
                Food
              </Link>
            </li>
          </ul>
        </div>
        <div className="border rounded-lg p-6">
          <h3 className="font-bold mb-4">Recent Posts</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-muted-foreground hover:underline">
                Post 1
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:underline">
                Post 2
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:underline">
                Post 3
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default page