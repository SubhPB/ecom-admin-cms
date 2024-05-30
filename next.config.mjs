/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }
        ]
    },
    async headers(){
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'ACCESS-CONTROL-ALLOW-ORIGIN',
                        value: 'http://localhost:3001'
                    }
                ]
            }
        ]
    }
};
export default nextConfig;
