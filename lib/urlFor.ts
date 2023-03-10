import { sanityClient } from "./sanity.client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);

const urlFor = (source: any) => {
  return builder.image(source);
};

export { urlFor };
