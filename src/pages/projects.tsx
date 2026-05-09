import { NextSeo } from "next-seo";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import ProjectCard from "@/components/projects/project-card";
import MiniArcade from "@/components/mini-arcade";
import { PROJECTS_CARD } from "@/data/projects";
import { siteMetadata } from "@/data/siteMetaData.mjs";

import { useRouter } from "next/router";
import { Locale, translations } from "../utility/translations";

export default function Projects() {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const t = translations[locale].events;

  const [projectsData, setProjectsData] = useState(PROJECTS_CARD);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projDoc = await getDoc(doc(db, "portfolio", "projects"));
        if (projDoc.exists()) {
          const data = projDoc.data();
          if (data.PROJECTS_CARD) {
            setProjectsData(data.PROJECTS_CARD as any);
          }
        }
      } catch (err) {
        console.error("Failed to fetch projects from Firebase", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      <NextSeo
        title="Projects - Mohammad Faizan Khan - Project manager Portfolio"
        description="Explore a collection of projects by Mohammad Faizan Khan, a seasoned Project manager. From innovative web applications to responsive interfaces, discover the depth and diversity of my work."
        canonical={`${siteMetadata.siteUrl}/projects`}
        openGraph={{
          url: `${siteMetadata.siteUrl}/projects`,
          title: "Discover Projects by Mohammad Faizan Khan - Project manager",
          description:
            "Explore a showcase of projects crafted by Mohammad Faizan Khan, a Project manager. Witness the fusion of creativity and technology in operations and project management.",
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
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "Projects, Mohammad Faizan Khan Portfolio, Project Manager, Operation Coordinator, Operations, Management",
          },
        ]}
      />
      <section className="mx-auto mb-40 mt-20 w-full gap-20 px-6 sm:mt-12 sm:px-14 md:px-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-semibold text-foreground md:text-4xl">
            {t.title}
          </h1>
          <div className="my-2">
            <span className="text-sm text-muted-foreground">{t.subtitle}</span>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2">
            {(projectsData[locale] || PROJECTS_CARD[locale]).map((card, index) => (
              <ProjectCard key={index} {...card} />
            ))}
          </div>
          <div className="mx-auto mt-16 max-w-5xl text-center text-foreground md:mt-28">
            <span className="text-xl font-bold md:text-2xl">
              {t.footerTitle}
            </span>
            <p className="mt-10 text-base md:text-xl">
              {t.footerDesc}{" "}
              <a
                href={`${siteMetadata.linkedin}`}
                target="_blank"
                className="font-semibold text-accent underline underline-offset-2 hover:text-accent/70"
              >
                LinkedIn
              </a>
            </p>
          </div>
          <MiniArcade />
        </div>
      </section>
    </>
  );
}
