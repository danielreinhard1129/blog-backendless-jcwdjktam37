import { axiosInstance2 } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  category: string;
  content: string;
  description: string;
  thumbnail: File;
  title: string;
}

const useCreateBlog = () => {
  const router = useRouter();
  const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const form = new FormData();

      form.append("thumbnail", payload.thumbnail);
      form.append("title", payload.title);
      form.append("description", payload.description);
      form.append("category", payload.category);
      form.append("content", payload.content);

      await axiosInstance2.post("/blogs", form, {
        headers: { Authorization: `Bearer ${session.data?.user.accessToken}` },
      });
    },
    onSuccess: () => {
      toast.success("Create blog success");
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateBlog;
