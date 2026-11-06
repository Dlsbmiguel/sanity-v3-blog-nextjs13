import { DefaultDocumentNodeResolver } from "sanity/structure";

export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  if (schemaType === "post") {
    return S.document().views([S.view.form()]);
  }
};
