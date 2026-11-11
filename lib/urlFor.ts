import { sanityClient } from "./sanity.client";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(sanityClient);

const urlFor = (source: any) => {
  return builder.image(source);
};

export { urlFor };
