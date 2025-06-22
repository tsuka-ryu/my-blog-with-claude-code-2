import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'モノレポ構成',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        TurboRepoとpnpmを使用したモノレポ構成で、効率的な開発環境を構築。
        共有パッケージとアプリケーションを統一管理しています。
      </>
    ),
  },
  {
    title: '技術スタック',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Next.js 15+ App Router、TypeScript (strict mode)、Tailwind CSS を採用。
        モダンな技術スタックで高品質なブログを構築します。
      </>
    ),
  },
  {
    title: '開発体験重視',
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        ESLint、Prettier、lefthook、Storybookなどの開発ツールを統合。
        コード品質と開発効率を両立した環境を提供します。
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
