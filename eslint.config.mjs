import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  { ignores: ["studio-recruiteek-ai/**"] },
  ...nextCoreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;
