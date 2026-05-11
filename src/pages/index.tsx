import Head from "next/head";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextSeo } from "next-seo";

import { SKILLS_DATA } from "@/data/skills";
import { HIGHLIGHTS_DATA } from "@/data/highlights";
import { siteMetadata } from "@/data/siteMetaData.mjs";
import { useRouter } from "next/router";
import { Locale, translations } from "../utility/translations";

// All components that use browser-only APIs are loaded client-side only
const LandingHero = dynamic(() => import("@/components/landing-hero"), { ssr: false });
const SkillsShowcase = dynamic(() => import("@/components/skills/skills-showcase"), { ssr: false });
const HomeHighlights = dynamic(() => import("@/components/home-highlights"), { ssr: false });

export default function Home() {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;

  const [skills, setSkills] = useState(SKILLS_DATA);
  const [highlights, setHighlights] = useState(HIGHLIGHTS_DATA);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!db) return; // Safety guard: skip if Firebase not initialized
        const skillsDoc = await getDoc(doc(db, "portfolio", "skills"));
        if (skillsDoc.exists()) setSkills(skillsDoc.data() as any);

        const highlightsDoc = await getDoc(doc(db, "portfolio", "highlights"));
        if (highlightsDoc.exists()) setHighlights(highlightsDoc.data() as any);

        const contentDoc = await getDoc(doc(db, "portfolio", "content"));
        if (contentDoc.exists()) setContent(contentDoc.data());
      } catch (err) {
        console.error("Firebase fetch error", err);
      }
    };
    fetchData();
  }, []);

  const heroData = content?.[locale]?.hero || translations[locale].hero;

  return (
    <>
      <NextSeo
        title={`Mohammad Faizan Khan | ${heroData.title}`}
        description={heroData.summary}
        canonical={siteMetadata.siteUrl}
        openGraph={{
          url: siteMetadata.siteUrl,
          title: `${heroData.greeting} - ${heroData.title}`,
          description: heroData.summary,
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Mohammad Faizan Khan - Project Manager Portfolio",
            },
          ],
          siteName: siteMetadata.siteName,
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: "Mohammad Faizan Khan, Project Manager, Operations Specialist, Portfolio, CARE-PRO, Operational Efficiency, Strategic Planning, Resource Management",
          },
          {
            name: "author",
            content: "Mohammad Faizan Khan",
          },
        ]}
      />
      <Head>
        {siteMetadata.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={siteMetadata.googleSiteVerification}
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mohammad Faizan Khan",
              "url": siteMetadata.siteUrl,
              "jobTitle": "Project Manager & Operations Specialist",
              "worksFor": {
                "@type": "Organization",
                "name": "CARE-PRO"
              },
              "sameAs": [
                siteMetadata.linkedin,
                siteMetadata.github,
                siteMetadata.twitter
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mohammad Faizan Khan Portfolio",
              "url": siteMetadata.siteUrl,
              "description": siteMetadata.description
            })
          }}
        />
      </Head>
      <LandingHero data={heroData} />
      <SkillsShowcase skills={skills[locale]} />
      <HomeHighlights data={highlights[locale]} />
    </>
  );
}
