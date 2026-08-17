import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Documentation"
      description="Documentation for the BeaRust reverse proxy and load balancer.">
      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <img className={styles.mark} src="img/logo.svg" alt="" />
            <div>
              <Heading as="h1">A safer path from request to upstream.</Heading>
              <p className={styles.lede}>
                BeaRust is a configuration-driven reverse proxy and load balancer
                for teams that need clear routing, operational control, and a
                dependable edge for application traffic.
              </p>
              <div className={styles.primaryActions}>
                <Link className="button button--primary button--lg" to="/docs/intro">
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
            <Link className={styles.pathCard} to="/docs/intro">
              <span className={styles.cardLabel}>Deploy</span>
              <Heading as="h3">Install BeaRust</Heading>
              <p>Bring up the production-ready Docker Compose stack and verify its health.</p>
            </Link>
            <Link className={styles.pathCard} to="/docs/intro">
              <span className={styles.cardLabel}>Route traffic</span>
              <Heading as="h3">Configure a first proxy</Heading>
              <p>Connect a host and upstream, then validate the request path end to end.</p>
            </Link>
            <Link className={styles.pathCard} to="/docs/intro">
              <span className={styles.cardLabel}>Build with us</span>
              <Heading as="h3">Contribute to BeaRust</Heading>
              <p>Understand the runtime, control plane, and contributor workflow.</p>
            </Link>
          </div>
        </section>
        <section className={styles.referenceBand}>
          <p>Looking for a specific contract?</p>
          <div>
            <Link to="/docs/intro">Browse the API reference</Link>
            <Link to="/docs/intro">Explore configuration</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
