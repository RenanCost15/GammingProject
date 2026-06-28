/** @type {import('next').NextConfig} */

// O GitHub Pages publica este repositório em /GammingProject.
// Fora do GitHub Actions, a aplicação continua disponível na raiz do ambiente local.
const isGithubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isGithubPagesBuild ? '/GammingProject' : '');

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  trailingSlash: true,
  images: {
    // GitHub Pages não executa o servidor de otimização de imagens do Next.js.
    unoptimized: true,
  },
};

export default nextConfig;
