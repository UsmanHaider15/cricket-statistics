/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/oKf9YhgYy0U
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Libre_Franklin } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'

libre_franklin({
  subsets: ['latin'],
  display: 'swap',
})

cormorant_garamond({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

import LeaguesSection from "@/components/leagues-section";
import T20StatsSection from "@/components/t20-stats-section";
import HeroSection from "./hero-section";

export function LandingPage() {
  return (
    <div>
      <main className="flex-1">
        <HeroSection />
        <T20StatsSection />
        <LeaguesSection />
      </main>
    </div>
  );
}
