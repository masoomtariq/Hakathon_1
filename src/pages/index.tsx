import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics"
      description="An interactive, open-source textbook for learning robotics, AI, and physical systems"
    >
      <Hero />
      <BookSummary />
      <LearningOutcomes />
      <Quotes />
      <ModuleCards />
    </Layout>
  );
}

function Hero(): JSX.Element {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Physical AI & Humanoid Robotics</h1>
        <p className={styles.tagline}>
          Master robotics, simulation, and AI with an interactive, open-source textbook
        </p>
        <div className={styles.heroCta}>
          <Link className="button button--primary button--lg" to="docs/">
            Start Learning
          </Link>
          <Link className="button button--secondary button--lg" to="https://github.com/masoomtariq/Hakathon_1">
            View on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}

function BookSummary(): JSX.Element {
  return (
    <section className={styles.bookSummary}>
      <div className={styles.container}>
        <h2>About This Book</h2>
        <div className={styles.summaryContent}>
          <p>
            <strong>Physical AI & Humanoid Robotics</strong> is a comprehensive, modern textbook designed for students and practitioners eager to master the fundamentals and frontiers of robotics, artificial intelligence, and physical systems.
          </p>
          <p>
            This book integrates theory with hands-on learning, featuring practical examples, simulation environments, and cutting-edge techniques used in industry and research. Whether you're building your first robot or advancing to complex autonomous systems, you'll find structured pathways tailored to your background.
          </p>
          <p>
            All code examples use modern tooling (ROS 2, Gazebo, NVIDIA Isaac Sim, PyTorch), and content is continuously updated to reflect the latest advances in robotics and AI.
          </p>
        </div>
      </div>
    </section>
  );
}

function LearningOutcomes(): JSX.Element {
  const outcomes = [
    {
      icon: '🤖',
      title: 'Robot Fundamentals',
      description: 'Learn ROS 2, system architecture, and robot programming from the ground up.',
    },
    {
      icon: '🎮',
      title: 'Simulation & Digital Twins',
      description: 'Master Gazebo and NVIDIA Isaac Sim for virtual testing and development.',
    },
    {
      icon: '🧠',
      title: 'AI & Perception',
      description: 'Implement computer vision and deep learning for robot decision-making.',
    },
    {
      icon: '🗣️',
      title: 'Natural Interaction',
      description: 'Build systems that understand language and respond intelligently.',
    },
    {
      icon: '🔧',
      title: 'Hands-On Projects',
      description: 'Apply knowledge to real-world robotics problems and challenges.',
    },
    {
      icon: '🌍',
      title: 'Accessible Learning',
      description: 'Content in English and Urdu with assistive technology support.',
    },
  ];

  return (
    <section className={styles.outcomes}>
      <div className={styles.container}>
        <h2>What You'll Learn</h2>
        <div className={styles.outcomesGrid}>
          {outcomes.map((outcome, idx) => (
            <div key={idx} className={styles.outcomeCard}>
              <div className={styles.outcomeIcon}>{outcome.icon}</div>
              <h3>{outcome.title}</h3>
              <p>{outcome.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quotes(): JSX.Element {
  const quotes = [
    {
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay, computer scientist",
    },
    {
      text: "Robotics is at the convergence of sensing, computation, and physical interaction with the world.",
      author: "Rodney Brooks, roboticist",
    },
    {
      text: "In robotics, we're not just building machines—we're creating partners for humanity.",
      author: "Feng-Hsiung Hsu, AI researcher",
    },
    {
      text: "Education should not reinforce inequality; it should break it down.",
      author: "Salman Khan, educator",
    },
  ];

  return (
    <section className={styles.quotes}>
      <div className={styles.container}>
        <h2>Inspiration</h2>
        <div className={styles.quotesGrid}>
          {quotes.map((quote, idx) => (
            <blockquote key={idx} className={styles.quoteCard}>
              <p className={styles.quoteText}>"{quote.text}"</p>
              <footer className={styles.quoteAuthor}>— {quote.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleCards(): JSX.Element {
  const modules = [
    {
      id: 'ros-2',
      title: 'ROS 2 Fundamentals',
      description: 'Learn the Robot Operating System 2, the industry standard for robotics.',
      icon: '⚙️',
    },
    {
      id: 'gazebo-unity',
      title: 'Gazebo & Unity',
      description: 'Master physics simulation and 3D visualization tools.',
      icon: '🎮',
    },
    {
      id: 'isaac',
      title: 'NVIDIA Isaac',
      description: 'Explore digital twins and hardware-accelerated perception.',
      icon: '🚀',
    },
    {
      id: 'vla',
      title: 'Vision Language Models',
      description: 'Implement multimodal AI for robot understanding.',
      icon: '🧠',
    },
    {
      id: 'capstone',
      title: 'Capstone Project',
      description: 'Apply everything in a comprehensive robotics project.',
      icon: '🏆',
    },
  ];

  return (
    <section className={styles.modules}>
      <div className={styles.container}>
        <h2>Core Modules</h2>
        <div className={styles.modulesGrid}>
          {modules.map(module => (
            <Link key={module.id} to={`docs/${module.id}`} className={styles.moduleCard}>
              <div className={styles.moduleIcon}>{module.icon}</div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
