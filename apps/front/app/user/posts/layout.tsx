import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

const PostsLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default PostsLayout;
