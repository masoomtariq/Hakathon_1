import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

type BlogItem = {
  content?: {
    metadata?: {
      title?: string;
      permalink?: string;
      date?: string;
      authors?: Array<{name?: string; key?: string}>;
    };
  };
};

type BlogListPageProps = {
  metadata?: {
    blogTitle?: string;
    blogDescription?: string;
  };
  items?: BlogItem[];
};

function hasUserAuthor(item: BlogItem): boolean {
  const authors = item.content?.metadata?.authors ?? [];
  return authors.some((author) => author?.key === 'user' || author?.name?.toLowerCase() === 'masoomtariq');
}

function isOnboardingPost(item: BlogItem): boolean {
  const title = (item.content?.metadata?.title ?? '').toLowerCase();
  const permalink = (item.content?.metadata?.permalink ?? '').toLowerCase();
  return (
    hasUserAuthor(item)
    && (title.includes('get started')
      || title.includes('get-started')
      || title.includes('onboarding')
      || permalink.includes('get-started')
      || permalink.includes('onboarding'))
  );
}

export default function BlogListPage(props: BlogListPageProps): React.JSX.Element {
  const items = props.items ?? [];
  const topFive = items.slice(0, 5);
  const onboardingVisible = topFive.some(isOnboardingPost);

  return (
    <Layout
      title={props.metadata?.blogTitle ?? 'Blog'}
      description={props.metadata?.blogDescription ?? 'Physical AI Book blog'}>
      <main className="container margin-vert--lg">
        <section data-block="hero" className="margin-bottom--lg">
          <Heading as="h1">hero</Heading>
          <p>Updates, guidance, and contributor notes for the Physical AI Book scaffold.</p>
        </section>

        <section data-block="post_list" className="margin-bottom--lg">
          <Heading as="h2">post_list</Heading>
          <ul>
            {topFive.map((item, index) => {
              const title = item.content?.metadata?.title ?? `Post ${index + 1}`;
              const permalink = item.content?.metadata?.permalink ?? '/blog';
              const date = item.content?.metadata?.date ? new Date(item.content.metadata.date).toLocaleDateString() : 'N/A';

              return (
                <li key={`${permalink}-${index}`}>
                  <Link to={permalink}>{title}</Link>
                  <span>{` — ${date}`}</span>
                </li>
              );
            })}
          </ul>
          <p>{`onboarding_post_in_top_five: ${onboardingVisible ? 'true' : 'false'}`}</p>
        </section>

        <section data-block="author_links">
          <Heading as="h2">author_links</Heading>
          <ul>
            <li>
              <Link to="https://github.com/masoomtariq">user</Link>
            </li>
            <li>
              <Link to="https://docs.anthropic.com/en/docs/claude-code">claude</Link>
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}
