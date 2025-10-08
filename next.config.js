/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ]
  },
}

// Only enable HTTPS in development if not already set
if (process.env.NODE_ENV === 'development' && !process.env.HTTPS) {
  const fs = require('fs');
  const path = require('path');
  
  // Generate self-signed certificates (you'll need to create these first)
  const certPath = path.join(process.cwd(), 'localhost-cert.pem');
  const keyPath = path.join(process.cwd(), 'localhost-key.pem');
  
  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    nextConfig.server = {
      https: {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      },
    };
  }
}

module.exports = nextConfig