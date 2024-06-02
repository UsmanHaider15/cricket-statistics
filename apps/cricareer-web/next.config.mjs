/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source:
          "/:league(psl|ipl|bbl|bpl|lpl|cpl|ssm_female|ssm_male|hnd_female|hnd_male|wbb|msl|ntb|t20is_female|t20is_male)",
        destination: "/:league/1",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
