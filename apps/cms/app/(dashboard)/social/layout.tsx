import { PostsProvider } from "@/lib/social/posts-context";

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostsProvider>{children}</PostsProvider>;
}
