'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import './ds.css';
import {
  badgeSentiments,
  createOrReuse,
  namingGrammar,
  spacing,
  pickerSentiments,
  primitiveValue,
  ramps,
  semanticTokens,
  stops,
  token,
} from './data';

/** A white documentation frame in the style of the library's own Figma doc pages. */
export function Sheet({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="ds ds-sheet">
      <div className="ds-status">
        <span>{label}</span>
        {meta ? <span>{meta}</span> : null}
      </div>
      <div className="ds-body">{children}</div>
    </div>
  );
}

/** Colour ramps. Pick a primitive to see which semantic roles alias it. */
export function TokenExplorer() {
  const [selected, setSelected] = useState('ube/500');
  const value = primitiveValue(selected);
  const roles = semanticTokens.filter((t) => t.alias === selected);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <h3 className="ds-h3">Layer 1 · Primitives</h3>
        <p className="ds-caption mt-1">
          Eight ramps of ten stops, named product/&lt;family&gt;/&lt;stop&gt;. Select a stop.
        </p>
        <div className="mt-4 space-y-1.5">
          {ramps.map((ramp) => (
            <div key={ramp.family} className="flex items-center gap-2">
              <span className="ds-caption w-[68px] shrink-0">{ramp.family}</span>
              <div className="grid flex-1 grid-cols-10">
                {ramp.values.map((hex, i) => {
                  const id = `${ramp.family}/${stops[i]}`;
                  return (
                    <button
                      key={id}
                      type="button"
                      className="ds-swatch"
                      style={{ background: hex }}
                      aria-pressed={selected === id}
                      aria-label={`product/${id}, ${hex}`}
                      title={`product/${id}`}
                      onClick={() => setSelected(id)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div aria-live="polite">
        <h3 className="ds-h3">Layer 2 · Semantic roles</h3>
        <p className="ds-caption mt-1">Components can only bind to these.</p>
        <div className="ds-panel mt-4">
          <div className="flex items-center gap-3">
            <span
              className="h-10 w-10 shrink-0 rounded-md"
              style={{ background: value, boxShadow: 'inset 0 0 0 1px rgba(37,40,54,0.12)' }}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="ds-code font-semibold">product/{selected}</p>
              <p className="ds-code" style={{ color: 'var(--ds-text-color-secondary)' }}>
                {value}
              </p>
            </div>
          </div>
        </div>

        {roles.length > 0 ? (
          <>
            <p className="ds-caption mt-4">
              {roles.length} {roles.length === 1 ? 'role aliases' : 'roles alias'} this stop:
            </p>
            <ul className="mt-2 max-h-[264px] space-y-2 overflow-y-auto pr-1" tabIndex={0} aria-label={`Roles that alias product/${selected}`}>
              {roles.map((role) => (
                <li key={role.name} className="border-b pb-2" style={{ borderColor: 'var(--ds-border-divider)' }}>
                  <p className="ds-code">{role.name}</p>
                  <p className="ds-caption">{role.use}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="ds-p mt-4">
            No role in the foundation, badge, tag, card, avatar or picker groups aliases this stop. A
            component cannot use it until a semantic role is added for it.
          </p>
        )}
      </div>
    </div>
  );
}

const buttonTypes = [
  ['primary', 'Save Changes'],
  ['secondary', 'Cancel'],
  ['tertiary', 'Edit'],
  ['accent', 'Upgrade'],
  ['destructive', 'Delete'],
  ['destructive-subtle', 'Remove'],
] as const;

const sizes = [
  ['sm', 'Small · 24'],
  ['med', 'Medium · 32'],
  ['lg', 'Large · 36'],
] as const;

function Stage({ children }: { children: ReactNode }) {
  return <div className="ds-panel flex min-h-[72px] flex-wrap items-center gap-3">{children}</div>;
}

function Caption({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="ds-h3">{title}</p>
      <p className="ds-caption mt-1">{children}</p>
    </div>
  );
}

/** Live specimens rebuilt from the token values. */
export function ComponentBench() {
  const [size, setSize] = useState<(typeof sizes)[number][0]>('med');

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start">
        <div className="space-y-3">
          <div className="ds-group" role="group" aria-label="Button size">
            {sizes.map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={size === id}
                className="ds-focus"
                onClick={() => setSize(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <Stage>
            {buttonTypes.map(([type, label]) => (
              <button key={type} type="button" className="ds-btn ds-focus" data-type={type} data-size={size}>
                {label}
              </button>
            ))}
          </Stage>
        </div>
        <Caption title="Button · six types, three sizes">
          Hover, press and tab through them. Labels use control/button (Poppins Medium 14/20), or
          control/button-sm (12/16) at the small size. Radius is radius/button-sm (6px) or
          radius/button-md (8px). The size switch above is the library&apos;s own Button/Group.
        </Caption>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start">
        <Stage>
          <Badges />
        </Stage>
        <Caption title="Badge · seven sentiments">
          Each sentiment has its own badge/&lt;sentiment&gt;/background, border and text tokens. The
          name says what the badge means, never which hue it is.
        </Caption>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start">
        <Stage>
          {pickerSentiments.map((s) => (
            <button
              key={s}
              type="button"
              className="ds-chip"
              style={
                {
                  '--chip-bg': token(`picker/${s}/background`),
                  '--chip-bg-hover': token(`picker/${s}/background-hover`),
                  '--chip-text': token(`picker/${s}/text`),
                } as CSSProperties
              }
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              <ChevronDown size={16} aria-hidden="true" style={{ color: token(`picker/${s}/icon`) }} />
            </button>
          ))}
        </Stage>
        <Caption title="Sentiment picker">
          The colour-coded Positive, Neutral and Negative chip. Fill, hover fill, label and icon each
          have their own picker/&lt;sentiment&gt;/* token.
        </Caption>
      </div>
    </div>
  );
}

function Badges() {
  return (
    <>
      {badgeSentiments.map((s) => (
        <span
          key={s}
          className="ds-badge"
          style={{
            background: token(`badge/${s}/background`),
            borderColor: token(`badge/${s}/border`),
            color: token(`badge/${s}/text`),
          }}
        >
          <Sparkles size={12} aria-hidden="true" />
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </span>
      ))}
    </>
  );
}

/** A short strip of live components for the top of the page. */
export function QuickDemo({ moreHref }: { moreHref: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
      <div className="ds-panel space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {buttonTypes.map(([type, label]) => (
            <button key={type} type="button" className="ds-btn ds-focus" data-type={type} data-size="med">
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badges />
        </div>
      </div>
      <div>
        <p className="ds-h3">These are live, not a screenshot</p>
        <p className="ds-caption mt-1">
          Phase 2 buttons and badges, rebuilt on this page from the system&apos;s real token values.
          Hover, press or tab through them.
        </p>
        <a
          href={moreHref}
          className="ds-focus mt-2 inline-block rounded text-[13px] font-semibold underline"
          style={{ color: 'var(--ds-color-product-ube-800)' }}
        >
          See every size and component
        </a>
      </div>
    </div>
  );
}

/** Tabs in the library's tab style, with arrow-key movement between tabs. */
function Tabs({ label, tabs }: { label: string; tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const base = useId();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((t) => t.id === active);
    let next = -1;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(tabs[next].id);
    refs.current[tabs[next].id]?.focus();
  };

  return (
    <div>
      <div className="ds-tabs" role="tablist" aria-label={label} onKeyDown={onKeyDown}>
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[t.id] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`${base}-panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            className="ds-tab ds-focus"
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${base}-panel-${t.id}`}
          aria-labelledby={`${base}-tab-${t.id}`}
          hidden={active !== t.id}
          className="pt-6"
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}

const segmentColours = ['#4F34D9', '#913096', '#2A5D47', '#9B2C2C'];

/** Phase 2 foundations: colour, naming, spacing and the create-or-reuse rules, in one frame. */
export function Foundations() {
  return (
    <Tabs
      label="Phase 2 foundations"
      tabs={[
        { id: 'colour', label: 'Colour', content: <TokenExplorer /> },
        {
          id: 'naming',
          label: 'Naming',
          content: (
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="ds-code text-[15px] leading-6" aria-label="badge/error/background-strong">
                  <span style={{ color: segmentColours[0] }}>badge</span>/
                  <span style={{ color: segmentColours[1] }}>error</span>/
                  <span style={{ color: segmentColours[2] }}>background</span>
                  <span style={{ color: segmentColours[3] }}>-strong</span>
                </p>
                <p className="ds-caption mt-1">
                  Lowercase, slash-separated, general to specific. Four segments at most.
                </p>
                <div className="ds-panel-warn mt-4">
                  <p className="ds-h3">Never a hue name in a semantic token</p>
                  <p className="ds-caption mt-1">Use badge/error/*, not badge/chili/*.</p>
                </div>
              </div>
              <dl className="space-y-3">
                {namingGrammar.map((g, i) => (
                  <div key={g.segment} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3">
                    <dt className="ds-h3">{g.segment}</dt>
                    <dd className="ds-code row-span-2 self-center" style={{ color: segmentColours[i] }}>
                      {g.example}
                    </dd>
                    <dd className="ds-caption">{g.rule}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ),
        },
        {
          id: 'spacing',
          label: 'Spacing',
          content: (
            <div>
              <ul className="grid gap-x-10 gap-y-1.5 md:grid-cols-2">
                {spacing.map((px) => (
                  <li key={px} className="grid grid-cols-[72px_44px_minmax(0,1fr)] items-center gap-2">
                    <span className="ds-code">space-{px}</span>
                    <span className="ds-caption">{px}px</span>
                    <span
                      className="block h-2.5 rounded-sm"
                      style={{ width: `${px * 2}px`, maxWidth: '100%', background: 'var(--ds-color-product-ube-500)' }}
                      aria-hidden="true"
                    />
                  </li>
                ))}
              </ul>
              <p className="ds-caption mt-4">
                Fourteen primitive steps, named by pixel size. Bars are drawn at twice their size.
              </p>
            </div>
          ),
        },
        {
          id: 'rules',
          label: 'Create or reuse',
          content: (
            <div>
              <p className="ds-caption mb-4">
                The questions to ask before adding a token. The goal is a small set of specific roles.
              </p>
              <div className="overflow-x-auto">
                <table className="ds-table min-w-[640px]">
                  <thead>
                    <tr>
                      <th scope="col">Question</th>
                      <th scope="col">Do this</th>
                      <th scope="col">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    {createOrReuse.map((row) => (
                      <tr key={row.question}>
                        <td>{row.question}</td>
                        <td>{row.answer}</td>
                        <td className="ds-muted">{row.why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}

export { SectionNav } from '../SectionNav';
