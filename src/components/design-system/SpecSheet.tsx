'use client';

import { useState, type CSSProperties, type Key, type ReactNode } from 'react';
import {
  Button,
  Tab,
  TabList,
  TabPanel,
  Tabs as AriaTabs,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-aria-components';
import { ChevronDown, Sparkles, Tag, X } from 'lucide-react';
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
  twigGroups,
  typeTokens,
  type TypeToken,
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
  const twigs = [...new Set(roles.map((r) => twigGroups[r.name.split('/')[0]]).filter(Boolean))];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <h3 className="ds-h3">Feathers · primitive tokens</h3>
        <p className="ds-caption mt-1">
          Eight colour ramps of ten stops, named product/&lt;family&gt;/&lt;stop&gt;. Pick a feather.
        </p>
        <div className="mt-4 space-y-1.5">
          {ramps.map((ramp) => (
            <div key={ramp.family} className="flex items-center gap-2">
              <span className="ds-caption w-[68px] shrink-0">{ramp.family}</span>
              <div className="grid flex-1 grid-cols-10">
                {ramp.values.map((hex, i) => {
                  const id = `${ramp.family}/${stops[i]}`;
                  return (
                    <ToggleButton
                      key={id}
                      className="ds-swatch"
                      style={{ background: hex }}
                      isSelected={selected === id}
                      aria-label={`product/${id}, ${hex}`}
                      // Pressing the selected swatch keeps it selected, as before.
                      onChange={() => setSelected(id)}
                    >
                      <span title={`product/${id}`} className="absolute inset-0 z-[2]" />
                    </ToggleButton>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div aria-live="polite">
        <h3 className="ds-h3">Plumage · semantic roles</h3>
        <p className="ds-caption mt-1">Feathers with a job. Components can only use these.</p>
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
              {roles.length} {roles.length === 1 ? 'role points' : 'roles point'} to this feather:
            </p>
            <ul className="mt-2 max-h-[200px] space-y-2 overflow-y-auto pr-1" tabIndex={0} aria-label={`Roles that alias product/${selected}`}>
              {roles.map((role) => (
                <li key={role.name} className="border-b pb-2" style={{ borderColor: 'var(--ds-border-divider)' }}>
                  <p className="ds-code">{role.name}</p>
                  <p className="ds-caption">{role.use}</p>
                </li>
              ))}
            </ul>
            <h3 className="ds-h3 mt-5">Twigs · components that lean on it</h3>
            {twigs.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-2">
                {twigs.map((t) => (
                  <li
                    key={t}
                    className="ds-badge"
                    style={{
                      background: 'var(--ds-color-product-ube-50)',
                      borderColor: 'var(--ds-color-product-ube-200)',
                      color: 'var(--ds-color-product-ube-800)',
                    }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ds-caption mt-1">
                None by name. These are shared roles, such as text and surface, that any component may use.
              </p>
            )}
          </>
        ) : (
          <p className="ds-p mt-4">
            No role in the groups shown here points to this feather. A component cannot use it until
            a semantic role is added for it.
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

function Row({ stage, title, stacked, children }: { stage: ReactNode; title: string; stacked?: boolean; children: ReactNode }) {
  return (
    <div
      className={`grid grid-cols-[minmax(0,1fr)] gap-4 ${stacked ? '' : 'md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start'}`}
    >
      {stage}
      <Caption title={title}>{children}</Caption>
    </div>
  );
}

function ButtonSpecimen() {
  const [size, setSize] = useState<(typeof sizes)[number][0]>('med');
  return (
    <div className="space-y-3">
      <ToggleButtonGroup
        className="ds-group"
        aria-label="Button size"
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={[size]}
        onSelectionChange={(keys: Set<Key>) => {
          const [next] = keys;
          if (next) setSize(next as (typeof sizes)[number][0]);
        }}
      >
        {sizes.map(([id, label]) => (
          <ToggleButton key={id} id={id} className="ds-focus">
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Stage>
        {buttonTypes.map(([type, label]) => (
          <Button key={type} className="ds-btn ds-focus" data-type={type} data-size={size}>
            {label}
          </Button>
        ))}
      </Stage>
    </div>
  );
}

/** Live specimens rebuilt from the Figma values, one component per tab. */
export function ComponentBench() {
  return (
    <Tabs
      label="Twigs"
      tabs={[
        {
          id: 'card',
          label: 'Card',
          content: (
            <Row
              title="Card"
              stacked
              stage={
                <Stage>
                  <article className="ds-card">
                    <div className="ds-card-media" aria-hidden="true" />
                    <div className="ds-card-content">
                      <div>
                        <p className="ds-card-title">Card title</p>
                        <p className="ds-card-subtitle">Subtitle</p>
                      </div>
                      <p className="ds-card-body">
                        Card description. Give a concise overview of the context or functionality
                        that&apos;s mentioned in the card title.
                      </p>
                    </div>
                    <div className="ds-card-actions">
                      <Button className="ds-btn" data-type="primary" data-size="med">
                        Button Label
                      </Button>
                    </div>
                  </article>
                </Stage>
              }
            >
              Hover it for the raised shadow, or tab to its button for the focus border
              (card/border-focus). Radius is radius/card (16px), and the media fill is
              card/media-background until an image loads. The library has upright and sideways
              layouts, plus disabled and loading states.
            </Row>
          ),
        },
        {
          id: 'tags',
          label: 'Tags',
          content: (
            <Row
              title="Tags · three types, two sizes"
              stage={
                <Stage>
                  <Tags />
                </Stage>
              }
            >
              Functional tags can be removed, read-only tags carry a positive or negative meaning, and
              AI tags have a gradient outline. Remove one, then reset.
            </Row>
          ),
        },
        {
          id: 'button',
          label: 'Button',
          content: (
            <Row title="Button · six types, three sizes" stage={<ButtonSpecimen />}>
              Hover, press and tab through them. Labels use control/button (Poppins Medium 14/20), or
              control/button-sm (12/16) at the small size. Radius is radius/button-sm (6px) or
              radius/button-md (8px). The size switch above is the library&apos;s own Button/Group.
            </Row>
          ),
        },
        {
          id: 'badge',
          label: 'Badge',
          content: (
            <Row
              title="Badge · seven sentiments"
              stage={
                <Stage>
                  <Badges />
                </Stage>
              }
            >
              Each sentiment has its own badge/&lt;sentiment&gt;/background, border and text tokens.
              The name says what the badge means, never which hue it is.
            </Row>
          ),
        },
        {
          id: 'picker',
          label: 'Picker',
          content: (
            <Row
              title="Sentiment picker"
              stage={
                <Stage>
                  {pickerSentiments.map((s) => (
                    <Button
                      key={s}
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
                    </Button>
                  ))}
                </Stage>
              }
            >
              The colour-coded Positive, Neutral and Negative chip. Fill, hover fill, label and icon
              each have their own picker/&lt;sentiment&gt;/* token.
            </Row>
          ),
        },
      ]}
    />
  );
}

const functionalTags = [
  ['md', 'Streaming'],
  ['md', 'Earnings'],
  ['sm', 'Regulation'],
] as const;

function Tags() {
  const [removed, setRemoved] = useState<string[]>([]);
  return (
    <>
      {functionalTags
        .filter(([, label]) => !removed.includes(label))
        .map(([size, label]) => (
          <span key={label} className="ds-tag" data-size={size} data-type="functional">
            {size === 'md' ? <Tag size={16} aria-hidden="true" /> : null}
            {label}
            <Button
              className="ds-tag-remove"
              aria-label={`Remove ${label}`}
              onPress={() => setRemoved((r) => [...r, label])}
            >
              <X size={14} aria-hidden="true" />
            </Button>
          </span>
        ))}
      <span className="ds-tag" data-size="md" data-type="read-only">
        Read-only
      </span>
      <span
        className="ds-tag"
        data-size="sm"
        data-type="read-only"
        style={{ background: token('tag/positive-background'), color: token('tag/positive-text'), borderColor: token('tag/positive-text') }}
      >
        <Tag size={12} aria-hidden="true" />
        Positive
      </span>
      <span
        className="ds-tag"
        data-size="sm"
        data-type="read-only"
        style={{ background: token('tag/negative-background'), color: token('tag/negative-text'), borderColor: token('tag/negative-text') }}
      >
        <Tag size={12} aria-hidden="true" />
        Negative
      </span>
      <span className="ds-tag" data-size="md" data-type="ai">
        <Tag size={16} aria-hidden="true" />
        AI tag
      </span>
      {removed.length > 0 ? (
        <Button className="ds-btn ds-focus" data-type="tertiary" data-size="sm" onPress={() => setRemoved([])}>
          Reset tags
        </Button>
      ) : null}
    </>
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
            <Button key={type} className="ds-btn ds-focus" data-type={type} data-size="med">
              {label}
            </Button>
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

/** Tabs in the library's tab style, with arrow-key movement between tabs (React Aria Tabs). */
function Tabs({ label, tabs }: { label: string; tabs: { id: string; label: string; content: ReactNode }[] }) {
  return (
    <AriaTabs defaultSelectedKey={tabs[0].id}>
      <TabList className="ds-tabs" aria-label={label}>
        {tabs.map((t) => (
          <Tab key={t.id} id={t.id} className="ds-tab ds-focus">
            {t.label}
          </Tab>
        ))}
      </TabList>
      {tabs.map((t) => (
        // Force-mounted so each panel keeps its state when another tab is chosen, as before.
        <TabPanel key={t.id} id={t.id} shouldForceMount className="pt-6 data-inert:hidden">
          {t.content}
        </TabPanel>
      ))}
    </AriaTabs>
  );
}

const segmentColours = ['#4F34D9', '#913096', '#2A5D47', '#9B2C2C'];

const weightNames = { 400: 'Regular', 500: 'Medium', 600: 'Semi Bold' } as const;

function typeStyle(t: TypeToken): CSSProperties {
  return {
    fontFamily: `var(--ds-font-family-${t.family === 'Poppins' ? 'titles' : 'body'})`,
    fontWeight: t.weight,
    fontSize: t.size,
    lineHeight: `${t.lineHeight}px`,
    textDecoration: t.modifier === 'underline' ? 'underline' : undefined,
    textTransform: t.modifier === 'uppercase' || t.modifier === 'capitalize' ? t.modifier : undefined,
    letterSpacing: t.modifier === 'tight' ? '-0.02em' : undefined,
  };
}

/** Every typography token, set in its own family, weight, size and line height. */
function Typography() {
  return (
    <div>
      <p className="ds-caption mb-4">
        Type tokens in two families of use. Each one bundles font family, weight, size and line
        height, and each specimen below is set in its own token.
      </p>
      <div
        className="ds-focus max-h-[420px] space-y-6 overflow-y-auto pr-2"
        tabIndex={0}
        role="group"
        aria-label="Typography tokens. Scrolls."
      >
        {typeTokens.map((g) => (
          <div key={g.group}>
            <h3 className="ds-h3">
              {g.group} · {g.note.toLowerCase()}
            </h3>
            <ul className="mt-2">
              {g.tokens.map((t) => (
                <li
                  key={t.name}
                  className="grid gap-x-4 gap-y-1 border-b py-2.5 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] md:items-center"
                  style={{ borderColor: 'var(--ds-border-divider)' }}
                >
                  <span style={typeStyle(t)}>{t.specimen ?? 'The quick brown fox'}</span>
                  <span>
                    <span className="ds-code block">{t.name}</span>
                    <span className="ds-caption block">{t.use}</span>
                  </span>
                  <span className="ds-caption">
                    {t.family} · {weightNames[t.weight]} · {t.size}/{t.lineHeight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Feathers: the raw colour and spacing values, with the ripple from a feather up to the twigs. */
export function Feathers() {
  return (
    <Tabs
      label="Feathers"
      tabs={[
        { id: 'colour', label: 'Colour', content: <TokenExplorer /> },
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
        { id: 'typography', label: 'Typography', content: <Typography /> },
      ]}
    />
  );
}

/** Plumage: how semantic tokens are named and when a new one is allowed. */
export function Plumage() {
  return (
    <Tabs
      label="Plumage"
      tabs={[
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
