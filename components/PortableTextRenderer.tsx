import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock as SanityPortableTextBlock } from "@portabletext/types";

import { urlForImage } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlForImage(value).width(1200).url();
      return (
        <Image
          src={imageUrl}
          alt={value.alt || ""}
          width={1200}
          height={675}
          className="w-full h-auto"
        />
      );
    },
  },
};

const PortableTextRenderer = ({ value }: { value: PortableTextBlock[] }) => {
  return (
    <div className="blog-prose">
      <PortableText
        value={value as unknown as SanityPortableTextBlock[]}
        components={components}
      />
    </div>
  );
};

export default PortableTextRenderer;
