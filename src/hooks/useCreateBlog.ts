import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  author: string;
  category: string;
  content: string;
  description: string;
  thumbnail: File;
  title: string;
}

interface ThumbnailResponse {
  fileURL: string;
  filePath: string;
}

const useCreateBlog = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const form = new FormData();
      form.append("file", payload.thumbnail);

      const randomId = Date.now() + Math.floor(Math.random() * 1000);
      const folderName = "images";
      const resultThumbnail = await axiosInstance.post<ThumbnailResponse>(
        `/api/files/${folderName}/${randomId}`,
        form,
      );

      await axiosInstance.post("/api/data/Blogs", {
        title: payload.title,
        author: payload.author,
        category: payload.category,
        content: payload.content,
        description: payload.description,
        thumbnail: resultThumbnail.data.fileURL,
      });
    },
    onSuccess: () => {
      toast.success("Create blog success");
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateBlog;
