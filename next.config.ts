import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@google-cloud/firestore",
    "@google-cloud/storage",
    "@google-cloud/tasks",
    "googleapis",
  ],
  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/@google-cloud/tasks/build/protos/protos.json",
      "./node_modules/@google-cloud/firestore/build/protos/*.json",
    ],
  },
};

export default nextConfig;
