import styles from "./photoModal.module.css";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import PhotoModalCloseButton from "./_component/PhotoModalCloseButton";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import ImageZone from "./_component/ImageZone";

type Props = {
  params: { id: string };
};

export default async function PhotoModal({ params }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton />
        <ImageZone id={id} />
        <div className={styles.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm id={id} />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
