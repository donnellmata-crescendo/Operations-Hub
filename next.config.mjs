/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Hub is designed to be embeddable inside a Confluence page (iframe) and
  // discoverable from the OPSHUB space. Adjust frame-ancestors to your tenant.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://crescendoai.atlassian.net;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
