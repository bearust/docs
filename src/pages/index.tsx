import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useBaseUrl from '@docusaurus/useBaseUrl';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const logoUrl = useBaseUrl('img/logo.png');

  return (
    <Layout
      title="Documentation"
      description="BeaRust: a Rust-native reverse proxy with a built-in load balancer, WAF, analytics, and free multi-node clustering.">
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <img className={styles.mark} src={logoUrl} alt="" />
            <div>
              <Heading as="h1">A reverse proxy that grows with you.</Heading>
              <p className={styles.lede}>
                BeaRust is a Rust-native reverse proxy and load balancer that installs with one
                Docker Compose command. A built-in WAF, traffic analytics, and free multi-node
                clustering are there when you need them — off by default, so every deployment
                starts small and predictable.
              </p>
              <div className={styles.primaryActions}>
                <Link className="button button--primary button--lg" to="/docs/introduction/what-is-bearust">
                  Read the introduction
                </Link>
                <a className="button button--outline button--lg" href="https://github.com/rizalord/bearust">
                  View source
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.paths} aria-label="Documentation paths">
          <div className={styles.sectionHeading}>
            <Heading as="h2">Start with the work in front of you.</Heading>
            <p>Choose a focused path, then follow the reference when you need the details.</p>
          </div>
          <div className={styles.pathGrid}>
            <Link className={styles.pathCard} to="/docs/getting-started/installation">
              <span className={styles.cardLabel}>Deploy</span>
              <Heading as="h3">Install BeaRust</Heading>
              <p>Bring up the production-ready Docker Compose stack and verify its health.</p>
            </Link>
            <Link className={styles.pathCard} to="/docs/getting-started/first-proxy">
              <span className={styles.cardLabel}>Route traffic</span>
              <Heading as="h3">Configure a first proxy</Heading>
              <p>Connect a host and upstream, then validate the request path end to end.</p>
            </Link>
            <Link className={styles.pathCard} to="/docs/operate/high-availability">
              <span className={styles.cardLabel}>Scale out</span>
              <Heading as="h3">Cluster multiple nodes</Heading>
              <p>Run BeaRust as a Raft-backed cluster so control-plane configuration stays in sync.</p>
            </Link>
          </div>
        </section>
        <section className={styles.referenceBand}>
          <p>Looking for a specific contract?</p>
          <div>
            <Link to="/docs/reference/api/api-overview">Browse the API reference</Link>
            <Link to="/docs/reference/configuration/overview">Explore configuration</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
