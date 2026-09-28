import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

const config = defineCloudflareConfig();
// @ts-ignore
config.cloudflare = { useWorkerdCondition: false, dangerousDisableConfigValidation: true };

export default config;
