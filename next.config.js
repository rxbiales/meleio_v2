/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Nunca gerar sourcemap de browser em produção:
  productionBrowserSourceMaps: false,

  // Garante minificação com SWC:
  swcMinify: true,

  // Evitar expor variáveis não públicas
  experimental: {
    // Mantém RSC como padrão; Turbopack em dev é ok
    serverActions: { bodySizeLimit: '2mb' },
  },

  webpack: (config, { dev, isServer }) => {
    // Em dev, desativa sourcemaps explícitos do Webpack (fallback quando não for Turbopack)
    if (dev) {
      config.devtool = false;
    }

    // Remove console.* em produção (lado do cliente)
    if (!dev && !isServer) {
      config.optimization.minimizer = config.optimization.minimizer || [];
      // SWC já minifica, mas asseguramos drop de console via define:
      config.plugins.push(
        new (require('webpack')).DefinePlugin({
          'process.env.__DROP_CONSOLE__': JSON.stringify('1'),
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
