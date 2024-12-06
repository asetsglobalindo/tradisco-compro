import type {NextConfig} from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;

