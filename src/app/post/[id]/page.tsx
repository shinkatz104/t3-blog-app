import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
import { Button } from '~/components/ui/button'
import { Heart, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { notFound } from "next/navigation";

interface PostDetailPageProps {
  params: {
    id: string
  }
}

const PostDetailPage = async ({ params }:PostDetailPageProps ) => {
  const id = params.id;
  const post = await api.post.getById({ id });
  if (!post) return notFound();

  return (
    <HydrateClient>
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_300px] gap-6">
        <aside className="space-y-6 md:sticky md:top-[90px] md:self-start">
          <div className="hidden md:flex flex-col items-center space-y-4 pt-8">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-6 w-6" />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-6 w-6" />
              <span className="sr-only">Share</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
          </div>
        </aside>

        <div className="space-y-8">
          <article key={post.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <div className="text-end pb-4">
              <p>CreatedAt: {post.createdAt.toISOString()}</p>
              <p>UpdatedAt: {post.updatedAt.toISOString()}</p>
            </div>
            <p className="text-muted-foreground mb-4">
              {post.content}
            </p>
          </article>
        </div>
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
    </HydrateClient>
  )
}

export default PostDetailPage