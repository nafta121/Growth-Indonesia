import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

const config = defineCloudflareConfig();
config.buildCommand = "npm run build:next";

export default config;

