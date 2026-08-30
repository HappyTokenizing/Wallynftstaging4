'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { BroadcastIntro } from '@/components/broadcast-intro';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
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
    <div className="edition-shell" id="top">
      <a className="skip-link" href="#story">
        Skip to today&apos;s edition
      </a>

      <header className="edition-nav">
        <a className="edition-brand" href="#top" aria-label="Wally NFT home">
          <Image
            src="/wally-logo-mark.png"
            alt=""
            width={84}
            height={84}
            priority
          />
          <span>
            WALLY NFT<small>RWA FOUNDATION CLUB</small>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#story">Story</a>
          <a href="#herd">The 1,000</a>
          <a href="#registry">Collection</a>
          <a href="#activations">Activations</a>
        </nav>
        <button type="button" onClick={() => setSignalOpen(true)}>
          Coming soon
        </button>
      </header>

      <main className="edition-main">
        <BroadcastIntro />

        <section
          className="front-page"
          id="story"
          aria-labelledby="front-page-title"
        >
          <div className="newspaper-flag">
            <span>THE RWA FOUNDATION CLUB</span>
            <span>GENESIS EDITION · 1,000 LEADERS</span>
          </div>
          <div className="newspaper-masthead">
            <p>Est. for the onchain era</p>
            <h1>Wally World Service</h1>
            <p>Fair markets for the real world</p>
          </div>
          <div className="newspaper-date-line">
            <span>MISSION EDITION</span>
            <span>OPEN · FAIR · ONCHAIN</span>
            <span>PRICE: CONVICTION</span>
          </div>

          <div className="front-headline">
            <p>THE LEAD STORY</p>
            <h2 id="front-page-title">The real world is coming onchain.</h2>
            <strong>
              Wally is gathering 1,000 leaders to help make it fair.
            </strong>
          </div>

          <div className="front-grid">
            <figure className="front-portrait">
              <Image
                src="/collection/0271.webp"
                alt="Rainbow Wally, one of the one-of-one leaders"
                width={600}
                height={600}
                sizes="(max-width: 760px) 92vw, 40vw"
                priority
              />
              <figcaption>
                Wally No. 0271 · One leader in a herd of 1,000
              </figcaption>
            </figure>

            <article className="lead-copy">
              <p>
                The world holds enormous value. Access to it is still too
                narrow. Wally exists to make the shift to real-world assets
                understandable, memorable, and human.
              </p>
              <p>
                The collection brings together people who believe markets can be
                more open, transparent, and useful when the real world moves
                onchain responsibly.
              </p>
              <a href="#herd">Meet the 1,000 leaders</a>
            </article>

            <aside className="front-briefs" aria-label="Mission at a glance">
              <p>AT A GLANCE</p>
              <dl>
                <div>
                  <dt>01</dt>
                  <dd>Bring value onchain</dd>
                </div>
                <div>
                  <dt>02</dt>
                  <dd>Keep markets fair</dd>
                </div>
                <div>
                  <dt>03</dt>
                  <dd>Open access wider</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section
          className="herd-edition"
          id="herd"
          aria-labelledby="herd-title"
        >
          <div className="section-rule">
            <span>SPECIAL REPORT</span>
            <span>THE RWA HERD</span>
          </div>
          <div className="herd-lead">
            <div className="herd-number" aria-hidden="true">
              1,000
            </div>
            <div>
              <p>ONE FIXED GENESIS COLLECTION</p>
              <h2 id="herd-title">
                Not spectators.
                <br />
                Leaders.
              </h2>
              <p>
                Founders, builders, educators, investors, and believers helping
                the RWA Foundation bring the world onchain.
              </p>
            </div>
          </div>
          <div className="rarity-table" aria-label="Collection rarity">
            {collection.distribution.map((entry) => (
              <div key={entry.tier}>
                <span>{entry.tier}</span>
                <strong>{entry.count}</strong>
                <small>{entry.percent}%</small>
              </div>
            ))}
          </div>
        </section>

        <section
          className="collection-edition"
          id="registry"
          aria-labelledby="registry-title"
        >
          <div className="section-rule inverse">
            <span>COLLECTION DESK</span>
            <span>SEARCH THE HERD</span>
          </div>
          <div className="collection-heading">
            <div>
              <p>THE GENESIS REGISTRY</p>
              <h2 id="registry-title">Find your Wally.</h2>
            </div>
            <p>Search by number, color, hat, tusk, or rarity.</p>
          </div>

          <div className="collection-tools">
            <label>
              <span className="sr-only">Search the Wally collection</span>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(8);
                }}
                placeholder="Search # or trait"
                aria-label="Search the Wally collection"
              />
            </label>
            <div className="edition-tabs" aria-label="Filter by rarity">
              {tierOrder.map((tier) => (
                <button
                  type="button"
                  key={tier}
                  className={activeTier === tier ? 'active' : ''}
                  onClick={() => chooseTier(tier)}
                  aria-pressed={activeTier === tier}
                >
                  {tier}
                </button>
              ))}
            </div>
            <span>{filteredItems.length} records</span>
          </div>

          <div className="edition-grid">
            {filteredItems.slice(0, visibleCount).map((item) => (
              <article className="edition-card" key={item.number}>
                <div className="edition-card-image">
                  <Image
                    src={item.image}
                    alt={`${item.name}: ${item.color ?? 'special color'}, ${item.hat ?? 'special headwear'}`}
                    width={600}
                    height={600}
                    sizes="(max-width: 620px) 46vw, (max-width: 980px) 31vw, 23vw"
                  />
                  <span className={`edition-tier tier-${tierSlug(item.tier)}`}>
                    {item.tier}
                  </span>
                </div>
                <div className="edition-card-copy">
                  <h3>{item.name}</h3>
                  <p>Rank {String(item.rank).padStart(4, '0')}</p>
                  <dl>
                    <div>
                      <dt>Color</dt>
                      <dd>{item.color ?? 'Unique'}</dd>
                    </div>
                    <div>
                      <dt>Hat</dt>
                      <dd>{item.hat ?? 'One of one'}</dd>
                    </div>
                    <div>
                      <dt>Tusk</dt>
                      <dd>{item.tusk ?? 'Unique'}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
            {filteredItems.length === 0 && (
              <div className="edition-empty">
                <h3>No Wally found.</h3>
                <p>Try another number or trait.</p>
              </div>
            )}
          </div>

          {visibleCount < filteredItems.length && (
            <button
              type="button"
              className="edition-more"
              onClick={() => setVisibleCount((count) => count + 8)}
            >
              Show more leaders
            </button>
          )}
        </section>

        <section
          className="activation-edition"
          id="activations"
          aria-labelledby="activation-title"
        >
          <div className="section-rule">
            <span>FIELD NOTES</span>
            <span>ACTIVATIONS</span>
          </div>
          <div className="activation-headline">
            <p>WHAT COMES NEXT</p>
            <h2 id="activation-title">The herd will move in the real world.</h2>
          </div>
          <div className="activation-columns">
            {[
              ['Research', 'Make real-world assets easier to understand.'],
              ['Gatherings', 'Connect the people building fair markets.'],
              ['Missions', 'Turn attention into useful public action.'],
            ].map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <small>COMING SOON</small>
              </article>
            ))}
          </div>
        </section>

        <section className="edition-signoff">
          <Image
            src="/collection/0510.webp"
            alt="Wally leader No. 0510"
            width={600}
            height={600}
            sizes="(max-width: 760px) 80vw, 38vw"
          />
          <div>
            <p>THE WALLY PLEDGE</p>
            <h2>
              Bring the world onchain.
              <br />
              Make it fair for all.
            </h2>
            <button type="button" onClick={() => setSignalOpen(true)}>
              Stand by for launch
            </button>
          </div>
        </section>
      </main>

      <footer className="edition-footer">
        <strong>WALLY NFT</strong>
        <p>Mission-driven culture for fair and open RWA markets.</p>
        <nav aria-label="Footer navigation">
          <a href="#story">Story</a>
          <a href="#registry">Collection</a>
          <a href="#activations">Activations</a>
        </nav>
      </footer>

      <Dialog open={signalOpen} onOpenChange={setSignalOpen}>
        <DialogContent className="edition-dialog">
          <span>WALLY WORLD SERVICE</span>
          <DialogTitle>Stand by for the next edition.</DialogTitle>
          <DialogDescription>
            Collection launch details and the first RWA Foundation Club
            activations will be announced here soon.
          </DialogDescription>
          <p>LAUNCH APPROACHING · 1,000 LEADERS</p>
          <DialogClose className="edition-dialog-close">
            Return to the paper
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}
