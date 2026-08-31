import Image from "next/image";
import { getImageSrc } from "@/packages/utils/get-image";
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

        if (block.type === "image") {
          return (
            <figure key={key} className="li-blog-content__figure">
              <div className="li-blog-content__image-wrapper">
                <Image
                  src={getImageSrc(block.src) ?? block.src}
                  alt={block.alt}
                  fill
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover"
                />
              </div>
              {block.caption && (
                <figcaption className="li-blog-content__caption">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return (
          <p key={key} className="li-blog-content__paragraph">
            {block.type === "paragraph" ? block.text : ""}
          </p>
        );
      })}
    </div>
  );
};

export default BlogContent;
