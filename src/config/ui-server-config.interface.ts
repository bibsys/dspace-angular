import { ServerConfig } from './server-config.interface';

/**
 * Server configuration related to the UI.
 */
export class UIServerConfig extends ServerConfig {

  // rateLimiter is used to limit the amount of requests a user is allowed make in an amount of time, in order to prevent overloading the server
  rateLimiter?: {
    windowMs: number;
    max: number;
  };

  // Trust X-FORWARDED-* headers from proxies
  useProxies: boolean;

  // Prevents search engines from harvesting the website. This is useful for test version of the app.
  seNoIndex: boolean;

  // Set to true to activate the google meta tag to get site ownership
  enableGoogleOwnershipTag: boolean;
  googleOwnershipTagValue: string;
}
