/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
            },
            {
                protocol: 'https',
                hostname: 'i.ibb.co',
            },
            {
                protocol: 'https',
                hostname: '1h3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'avatars.githubsercontent.com',
            },
        ],
    },
};

module.exports = nextConfig;
