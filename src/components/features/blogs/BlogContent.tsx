import type { BlogContentBlock } from "@/types/blog";

interface BlogContentProps {
  blocks: BlogContentBlock[];
}

const BlogContent = ({ blocks }: BlogContentProps) => {
  return (
    <div className="li-blog-content">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "heading") {
          return (
            <h2 key={key} className="li-blog-content__heading">
              {block.text}
            </h2>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={key} className="li-blog-content__list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={key} className="li-blog-content__paragraph">
            {block.text}
          </p>
        );
      })}
    </div>
  );
};

export default BlogContent;
