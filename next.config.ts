import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "@google-cloud/firestore",
    "@google-cloud/storage",
    "@google-cloud/tasks",
    "googleapis",
  ],
};

export default nextConfig;
