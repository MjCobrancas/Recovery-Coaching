/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3335"
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3336"
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3337"
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3338"
            },
            {
                protocol: "http",
                hostname: "144.91.80.153",
                port: "3335"
            },
            {
                protocol: "http",
                hostname: "144.91.80.153",
                port: "3336"
            },
            {
                protocol: "http",
                hostname: "144.91.80.153",
                port: "3337"
            },
            {
                protocol: "http",
                hostname: "144.91.80.153",
                port: "3338"
            },
            {
                protocol: "http",
                hostname: "144.91.80.153",
                port: "9999"
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/user',
                destination: `${process.env.MANAGEMENT_DOMAIN}/user`,
                permanent: true
            },
            {
                source: '/user/:path*',
                destination: `${process.env.MANAGEMENT_DOMAIN}/user/:path*`,
                permanent: true
            },
            {
                source: '/register',
                destination: `${process.env.MANAGEMENT_DOMAIN}/register`,
                permanent: true
            },
            {
                source: '/register/:path*',
                destination: `${process.env.MANAGEMENT_DOMAIN}/register/:path*`,
                permanent: true
            },
            {
                source: '/monitoring/:path*',
                destination: `${process.env.MONITORING_DOMAIN}/monitoring/:path*`,
                permanent: true
            },
            {
                source: '/workout/:path*',
                destination: `${process.env.WORKOUT_DOMAIN}/workout/:path*`,
                permanent: true
            }
        ]
    },
};

export default nextConfig