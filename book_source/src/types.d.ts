declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}

declare module '@theme/Layout';
declare module '@docusaurus/Link';
declare module '@docusaurus/useDocusaurusContext';
declare module '@docusaurus/BrowserOnly';
