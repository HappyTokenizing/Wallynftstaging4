'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  CircleArrowOutUpRight,
  Gem,
  Globe2,
  Landmark,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { BroadcastIntro } from '@/components/broadcast-intro';

import collectionPayload from '@/public/collection.json';

type Wally = {
  id: number;
  number: string;
  name: string;
  image: string;
  tier: string;
  rank: number;
  score: number;
  color: string | null;
  hat: string | null;
  tusk: string | null;
  oneOfOne: boolean;
};

type Distribution = {
  tier: string;
  count: number;
  percent: number;
  color: string;
};

type CollectionData = {
  totalSupply: number;
  previewCount: number;
  distribution: Distribution[];
  items: Wally[];
};

const collection = collectionPayload as CollectionData;
const tierOrder = ['All', 'Common', 'Uncommon', 'Rare', 'Epic', '1 of 1'];

const storyChapters = [
  {
    number: '01',
    label: 'THE PROBLEM',
    title: 'The real world is full of value. Access to it is not.',
    copy: 'Ownership, opportunity, and useful assets are still trapped behind borders, paperwork, closed networks, and systems designed for insiders.',
  },
  {
    number: '02',
    label: 'THE TURN',
    title: 'Wally believes markets should move as openly as information.',
    copy: 'Real-world assets can become more visible, more connected, and easier to understand when they move onchain with responsible standards.',
  },
  {
    number: '03',
    label: 'THE MISSION',
    title: 'So Wally gathered a herd of leaders—not spectators.',
    copy: 'One thousand Wallys represent one thousand people ready to help make the transition fair, transparent, useful, and open to more of the world.',
  },
];

const principles = [
  {
    icon: Globe2,
    title: 'Bring value onchain',
    copy: 'Help the world understand how useful real-world assets can connect to open digital markets.',
  },
  {
    icon: ShieldCheck,
    title: 'Demand fair rails',
    copy: 'Champion transparency, responsible standards, and access that is designed for people—not privileged rooms.',
  },
  {
    icon: Users,
    title: 'Move as a herd',
    copy: 'Turn a collection into a visible network of people who believe finance can become more open and human.',
  },
];

function tierSlug(tier: string) {
  return tier.toLowerCase().replaceAll(' ', '-');
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeTier, setActiveTier] = useState('All');
  const [visibleCount, setVisibleCount] = useState(8);
  const [signalOpen, setSignalOpen] = useState(false);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase().replace(/^#/, '');
    return collection.items.filter((item) => {
      const tierMatch = activeTier === 'All' || item.tier === activeTier;
      const searchText = [
        item.number,
        item.name,
        item.color,
        item.hat,
        item.tusk,
        item.tier,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return tierMatch && (!needle || searchText.includes(needle));
    });
  }, [activeTier, query]);

  const chooseTier = (tier: string) => {
    setActiveTier(tier);
    setVisibleCount(8);
  };

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#story">
        Skip to the story
      </a>

      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          aria-label="Wally RWA Foundation Club home"
        >
          <span className="wordmark-glyph">
            <Image
              src="/wally-logo-mark.png"
              alt=""
              width={128}
              height={128}
              priority
            />
          </span>
          <span className="wordmark-copy">
            WALLY WORLD SERVICE<small>THE RWA REPORT</small>
          </span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#story">Wally&apos;s report</a>
          <a href="#leaders">The 1,000</a>
          <a href="#registry">Market desk</a>
        </nav>
        <button className="header-cta" onClick={() => setSignalOpen(true)}>
          <span /> Stand by for launch
        </button>
      </header>

      <main>
        <BroadcastIntro />

        <section className="origin-section" id="story">
          <div className="chapter-index">
            OPENING BULLETIN <span>/</span> WHY WALLY EXISTS
          </div>
          <div className="origin-layout">
            <div className="origin-title">
              <p className="micro-label">EVERY MOVEMENT NEEDS A FACE.</p>
              <h2>
                Wally saw a world of value locked behind <em>old doors.</em>
              </h2>
            </div>
            <div className="origin-portrait">
              <div className="portrait-halo" />
              <Image
                src="/collection/0271.webp"
                alt="Rainbow Wally, one of the collection's one-of-one leaders"
                width={600}
                height={600}
                sizes="(max-width: 800px) 90vw, 42vw"
              />
              <div className="portrait-note">
                <Gem /> ARCHIVE PORTRAIT / RAINBOW WALLY
              </div>
            </div>
            <div className="origin-intro">
              <p className="origin-lead">
                Buildings. Credit. Commodities. Infrastructure. Ideas with real
                utility. The world is rich with assets—but opportunity still
                moves through systems too few people can see or reach.
              </p>
              <p>
                Wally exists to tell a more human story about real-world assets:
                one where technology opens doors, transparency earns trust, and
                participation becomes fairer by design.
              </p>
            </div>
          </div>

          <div className="story-timeline">
            {storyChapters.map((chapter) => (
              <article key={chapter.number}>
                <div className="timeline-marker">
                  <span>{chapter.number}</span>
                  <i />
                </div>
                <p className="micro-label">{chapter.label}</p>
                <h3>{chapter.title}</h3>
                <p>{chapter.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="leaders-section" id="leaders">
          <div className="leaders-number" aria-hidden="true">
            1,000
          </div>
          <div className="leaders-copy">
            <div className="chapter-index light">
              SPECIAL REPORT <span>/</span> THE 1,000 LEADERS
            </div>
            <h2>
              Not a crowd.
              <br />A <em>conviction.</em>
            </h2>
            <p>
              Every Wally is a signal: the real world is coming onchain, and the
              people who care about fairness should help shape how it arrives.
            </p>
          </div>
          <div className="leaders-manifesto">
            <p>
              This collection gathers one thousand founders, builders,
              believers, educators, investors, and curious minds around a shared
              direction.
            </p>
            <p>
              Membership is cultural. The mission is real. Together, the herd
              supports the RWA Foundation&apos;s work to make real-world asset
              markets clearer, more open, and more useful to more people.
            </p>
            <div className="supply-seal">
              <strong>1K</strong>
              <span>
                FIXED
                <br />
                GENESIS
                <br />
                HERD
              </span>
            </div>
          </div>
        </section>

        <section
          className="principles-section"
          aria-labelledby="principles-title"
        >
          <div className="principles-top">
            <div>
              <p className="micro-label">HOW THE HERD HELPS</p>
              <h2 id="principles-title">
                Culture can move markets before capital does.
              </h2>
            </div>
            <p>
              Wally makes a complex shift visible, memorable, and human—then
              turns that shared identity toward education, standards, and
              public-good action.
            </p>
          </div>
          <div className="principles-list">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <article key={principle.title}>
                  <span>0{index + 1}</span>
                  <Icon />
                  <h3>{principle.title}</h3>
                  <p>{principle.copy}</p>
                  <ArrowRight className="principle-arrow" />
                </article>
              );
            })}
          </div>
        </section>

        <section className="registry-section" id="registry">
          <div className="registry-header">
            <div>
              <div className="chapter-index light">
                MARKET DESK <span>/</span> THE HERD REGISTRY
              </div>
              <h2>
                Find your
                <br />
                <em>Wally.</em>
              </h2>
            </div>
            <div className="registry-intro">
              <p>
                Explore a preview of the one-thousand-piece genesis collection.
                Search by number, color, headwear, tusk, or rarity signal.
              </p>
              <div
                className="rarity-key"
                aria-label="Collection rarity distribution"
              >
                {collection.distribution.map((entry) => (
                  <div key={entry.tier}>
                    <i style={{ background: entry.color }} />
                    <span>{entry.tier}</span>
                    <strong>{entry.count}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="registry-tools">
            <label className="registry-search">
              <Search aria-hidden="true" />
              <span className="sr-only">Search the Wally collection</span>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(8);
                }}
                placeholder="Search #, color, hat, tusk…"
                aria-label="Search the Wally collection"
              />
            </label>
            <div className="tier-tabs" aria-label="Filter by rarity">
              {tierOrder.map((tier) => (
                <button
                  key={tier}
                  className={activeTier === tier ? 'active' : ''}
                  onClick={() => chooseTier(tier)}
                  aria-pressed={activeTier === tier}
                >
                  {tier}
                </button>
              ))}
            </div>
            <span className="registry-count">
              {filteredItems.length} RECORDS
            </span>
          </div>

          <div className="registry-grid">
            {filteredItems.slice(0, visibleCount).map((item) => (
              <article className="registry-card" key={item.number}>
                <div className="registry-image">
                  <Image
                    src={item.image}
                    alt={`${item.name}: ${item.color ?? 'special color'}, ${item.hat ?? 'special headwear'}`}
                    width={600}
                    height={600}
                    sizes="(max-width: 620px) 46vw, (max-width: 980px) 31vw, 23vw"
                  />
                  <span className={`tier-signal tier-${tierSlug(item.tier)}`}>
                    {item.tier}
                  </span>
                </div>
                <div className="registry-meta">
                  <div>
                    <h3>{item.name}</h3>
                    <span>RANK {String(item.rank).padStart(4, '0')}</span>
                  </div>
                  <dl>
                    <div>
                      <dt>COLOR</dt>
                      <dd>{item.color ?? 'Unique'}</dd>
                    </div>
                    <div>
                      <dt>HEAD</dt>
                      <dd>{item.hat ?? 'One of one'}</dd>
                    </div>
                    <div>
                      <dt>TUSK</dt>
                      <dd>{item.tusk ?? 'Unique'}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
            {filteredItems.length === 0 && (
              <div className="registry-empty">
                <Search />
                <h3>No Wally found.</h3>
                <p>Try another number or trait.</p>
              </div>
            )}
          </div>
          {visibleCount < filteredItems.length && (
            <button
              className="load-registry"
              onClick={() => setVisibleCount((count) => count + 8)}
            >
              Reveal more leaders <ArrowDown />
            </button>
          )}
        </section>

        <section className="activations-section" id="activations">
          <div className="activation-orbit" aria-hidden="true">
            <span>RWA</span>
          </div>
          <div className="activation-copy">
            <div className="chapter-index light">
              FIELD REPORTS <span>/</span> ACTIVATIONS
            </div>
            <p className="micro-label">WHAT THE HERD WILL DO</p>
            <h2>A club with somewhere important to go.</h2>
            <p>
              The RWA Herd is being built for research, education, public-good
              missions, and real gatherings that help bring the world onchain
              responsibly.
            </p>
            <button onClick={() => setSignalOpen(true)}>
              Follow the signal <CircleArrowOutUpRight />
            </button>
          </div>
          <div className="activation-list">
            {[
              [
                '01',
                'Field notes',
                'Make the RWA shift understandable through clear research and visual stories.',
              ],
              [
                '02',
                'Fair market labs',
                'Bring builders and believers together around access, transparency, and standards.',
              ],
              [
                '03',
                'Onchain missions',
                'Turn community attention into public-good action with the RWA Foundation.',
              ],
              [
                '04',
                'Herd gatherings',
                'Create moments where online identity becomes real relationships and shared purpose.',
              ],
            ].map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <small>COMING SOON</small>
              </article>
            ))}
          </div>
        </section>

        <section className="final-pledge">
          <div className="pledge-art" aria-hidden="true">
            {['0510', '0271', '0001'].map((number, index) => (
              <Image
                key={number}
                className={`pledge-wally pledge-${index + 1}`}
                src={`/collection/${number}.webp`}
                alt=""
                width={600}
                height={600}
              />
            ))}
          </div>
          <div className="pledge-content">
            <Landmark />
            <p>THE WALLY PLEDGE</p>
            <h2>
              The real world is coming onchain.
              <br />
              <em>Help shape how it arrives.</em>
            </h2>
            <button onClick={() => setSignalOpen(true)}>
              Join the launch list <ArrowRight />
            </button>
            <small>
              GENESIS COLLECTION · 1,000 WALLY LEADERS · LAUNCH APPROACHING
            </small>
          </div>
        </section>
      </main>

      <footer>
        <a
          className="wordmark footer-wordmark"
          href="#top"
          aria-label="Wally NFT home"
        >
          <span className="wordmark-glyph">
            <Image src="/wally-logo-mark.png" alt="" width={128} height={128} />
          </span>
          <span className="wordmark-copy">
            WALLY WORLD SERVICE<small>THE RWA REPORT</small>
          </span>
        </a>
        <p>
          Mission-driven culture for fair and open real-world asset markets.
        </p>
        <div>
          <a href="#story">Report</a>
          <a href="#registry">Market desk</a>
          <a href="#activations">Field reports</a>
        </div>
      </footer>

      <Dialog open={signalOpen} onOpenChange={setSignalOpen}>
        <DialogContent className="signal-panel">
          <Sparkles className="signal-spark" />
          <span className="micro-label">STAND BY FOR TRANSMISSION</span>
          <DialogTitle className="signal-title">
            Be there when Wally moves.
          </DialogTitle>
          <DialogDescription className="signal-description">
            Launch details, field notes, and the first RWA Foundation Club
            activations are coming soon. The launch list will open here when it
            is ready.
          </DialogDescription>
          <div className="signal-ready">
            <i />
            <span>LAUNCH LIST OPENS SOON</span>
          </div>
          <DialogClose className="signal-return">
            Return to the story <ArrowRight />
          </DialogClose>
          <small>
            No form. No false promise. Just a clear signal that the next chapter
            is coming.
          </small>
        </DialogContent>
      </Dialog>
    </div>
  );
}
