import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { sanityClient, sanityProjectId, sanityDataset } from "./client";

const imageBuilder = createImageUrlBuilder({
  projectId: sanityProjectId || "placeholder",
  dataset: sanityDataset,
});

export const urlForImage = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};

export { sanityClient };
