import { getBlog } from "@/api/get-blog";
import Markdown from "@/components/Markdown";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Image from "next/image";

interface BlogDetailProps {
  params: Promise<{ objectId: string }>;
}

const BlogDetail = async (props: BlogDetailProps) => {
  const { objectId } = await props.params;

  const blog = await getBlog(objectId);

  return (
    <main className="container mx-auto p-4">
      <Badge>{blog.category}</Badge>
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <p className="font-extralight">
        {format(new Date(blog.created), "dd-MMMM-yyyy")} - {blog.author}
      </p>
      <div className="relative mb-2 h-[360px] w-full">
        <Image
          src={blog.thumbnail}
          alt="thumbnail"
          className="object-cover"
          fill
        />
      </div>

      <Markdown content={blog.content} />
    </main>
  );
};

export default BlogDetail;
