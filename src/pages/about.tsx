import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import { EXPERIENCE } from "@/data/experience";
import { EDUCATION } from "@/data/education";
import { siteMetadata } from "@/data/siteMetaData.mjs";
import { useRouter } from "next/router";
import { Locale, translations } from "@/utility/translations";

const AboutHero = dynamic(() => import("@/components/about-hero"), { ssr: false });
const ExperienceShowcaseList = dynamic(() => import("@/components/experience/experience-showcase-list"), { ssr: false });

export default function About() {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const tExp = translations[locale].experience;
  const tEdu = translations[locale].education;

  const [experienceData, setExperienceData] = useState(EXPERIENCE);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!db) return; // Safety guard: skip if Firebase not initialized
        const expDoc = await getDoc(doc(db, "portfolio", "experience"));
        if (expDoc.exists()) setExperienceData(expDoc.data() as any);

        const contentDoc = await getDoc(doc(db, "portfolio", "content"));
        if (contentDoc.exists()) setContent(contentDoc.data());
      } catch (err) {
        console.error("Failed to fetch from Firebase", err);
      }
    };
    fetchData();
  }, []);

  const aboutContent = content?.[locale] || {
    hero: translations[locale].hero,
    about: translations[locale].about,
  };

  return (
    <>
      <NextSeo
        title={`Mohammad Faizan Khan | About`}
        description={aboutContent.about?.paragraphs?.[0] || aboutContent.about?.p1 || ""}
        canonical={`${siteMetadata.siteUrl}/about`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/about`,
          title: `About Mohammad Faizan Khan`,
          description: aboutContent.about?.paragraphs?.[0] || aboutContent.about?.p1 || "",
          images: [
            {
              url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
              alt: "Mohammad Faizan Khan - Portfolio Image",
            },
          ],
          siteName: siteMetadata.siteName,
          type: "website",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <AboutHero data={content?.[locale]} />
      <ExperienceShowcaseList title={tExp.title} details={experienceData[locale] || EXPERIENCE[locale]} />
      <ExperienceShowcaseList title={tEdu.title} details={EDUCATION[locale]} />
    </>
  );
}
