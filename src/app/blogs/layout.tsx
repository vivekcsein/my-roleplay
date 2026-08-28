import type { ReactNode } from "react";
import AdsServices from "@/components/features/ads-sense/AdsServices";

interface BlogsLayoutProps {
  children: ReactNode;
}

const BlogsLayout = ({ children }: BlogsLayoutProps) => {
  return <AdsServices>{children}</AdsServices>;
};

export default BlogsLayout;
