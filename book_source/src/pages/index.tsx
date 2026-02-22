import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main className="container margin-vert--lg">
        <section>
          <Heading as="h1">Hero</Heading>
          <p>Build a complete Physical AI book path from ROS 2 fundamentals to autonomous humanoid capstone delivery.</p>
          <Link className="button button--primary" to="/docs/generated/pre-module/home-landing-page">
            Start Reading
          </Link>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">Book Summary</Heading>
          <p>The scaffold defines module sequencing, chapter metadata, and validation-first delivery for consistent contributor onboarding.</p>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">Learning Outcomes</Heading>
          <ul>
            <li>Understand ROS 2, simulation, and embodied intelligence architecture decisions.</li>
            <li>Ship deterministic documentation structure from a canonical source.</li>
            <li>Adopt quality gates for metadata, navigation, and onboarding readiness.</li>
          </ul>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">Quotes</Heading>
          <blockquote>
            “Embodied intelligence emerges where perception, planning, and action continuously learn together.”
          </blockquote>
          <p className="urdu-sample">جسمانی ذہانت کا سفر تصور سے عمل تک مسلسل سیکھنے کا نام ہے۔</p>
        </section>

        <section className="margin-top--lg">
          <Heading as="h2">Module Cards</Heading>
          <ul>
            <li>Module 1: ROS 2 Nervous System</li>
            <li>Module 2: Digital Twin with Gazebo and Unity</li>
            <li>Module 3: NVIDIA Isaac Robot Brain</li>
            <li>Module 4: Vision-Language-Action Systems</li>
          </ul>
        </section>

        <section className="margin-top--lg margin-bottom--xl">
          <Heading as="h2">Reading/Learning Path</Heading>
          <p>Follow the sequence from pre-module orientation through module labs and finish with the final capstone integration challenge.</p>
        </section>
      </main>
    </Layout>
  );
}
