import { useRef } from 'react';
import { siteBasePath } from '@/lib/siteBasePath';
import { RocketIcon } from '@/components/ui/rocket';
import { BrainIcon } from '@/components/ui/brain';
import { SendIcon } from '@/components/ui/send';
import { CoffeeIcon } from '@/components/ui/coffee';
import { TerminalIcon } from '@/components/ui/terminal';

interface TerminalWelcomeProps {
  onRunCommand?: (command: string) => void;
}

type AnimatedIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

interface Shortcut {
  cmd: string;
  label: string;
  Icon: React.ForwardRefExoticComponent<
    { size?: number; className?: string } & React.RefAttributes<AnimatedIconHandle>
  >;
}

const SHORTCUTS: Shortcut[] = [
  { cmd: 'projects', label: 'Explore my work', Icon: RocketIcon as Shortcut['Icon'] },
  { cmd: 'expertise', label: 'View skills & experience', Icon: BrainIcon as Shortcut['Icon'] },
  { cmd: 'contact', label: 'Get in touch', Icon: SendIcon as Shortcut['Icon'] },
  {
    cmd: 'interview',
    label: 'See a design challenge',
    Icon: CoffeeIcon as Shortcut['Icon'],
  },
];

/**
 * Claude-style pill button that plays its animated icon while hovered/focused.
 * We drive the icon through its imperative handle so pointing anywhere on the
 * button — not just the small glyph — starts the animation.
 */
function ShortcutButton({
  cmd,
  label,
  Icon,
  onRun,
}: Shortcut & { onRun?: (cmd: string) => void }) {
  const iconRef = useRef<AnimatedIconHandle>(null);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onRun?.(cmd)}
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
        onFocus={() => iconRef.current?.startAnimation()}
        onBlur={() => iconRef.current?.stopAnimation()}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 font-medium text-foreground shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-muted hover:shadow-md active:translate-y-0 active:shadow-sm cursor-pointer"
      >
        <Icon ref={iconRef} size={18} className="shrink-0" />
        <span>{cmd}</span>
      </button>
      <span className="opacity-60">→</span>
      <span className="opacity-60">{label}</span>
    </div>
  );
}

export function TerminalWelcome({ onRunCommand }: TerminalWelcomeProps) {
  const tipsIconRef = useRef<AnimatedIconHandle>(null);

  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-2 border-primary rounded-lg p-8">
          <div className="grid md:grid-cols-[1fr_auto] gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              <div className="text-primary text-sm">Portfolio v1.0</div>

              <h1 className="text-2xl">Hi there,</h1>

              {/* Portrait */}
              <div className="select-none">
                <img
                  src={`${siteBasePath}/portrait.png`}
                  alt="Lu Zhang"
                  className="size-[100px] rounded-full object-cover border-2 border-primary"
                />
              </div>

              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <p>Started as a pixel-perfect UX designer who could spend 20 minutes nudging things by 0.5px.</p>
                  <p>Then I discovered something dangerous: code.</p>
                  <p>Now I&apos;m evolving into a Product Designer × Design Engineer hybrid, using vibe coding to turn ideas into working products before the coffee gets cold.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-primary font-medium">My mission:</div>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Building the kind of products where designers and engineers stop arguing about what made it into production.</li>
                    <li>Less friction. More shipping.</li>
                    <li>Less handoff. More building together.</li>
                    <li>And yes, the spacing still matters.</li>
                  </ul>
                </div>
                <div className="text-foreground">/Users/lu-zhang</div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="border-l-2 border-primary/30 pl-8 space-y-6 min-w-[280px]">
              <div
                onMouseEnter={() => tipsIconRef.current?.startAnimation()}
                onMouseLeave={() => tipsIconRef.current?.stopAnimation()}
              >
                <div className="text-primary text-sm mb-2 flex items-center gap-1.5">
                  <TerminalIcon ref={tipsIconRef} size={16} className="shrink-0" />
                  <span>Bash: tips for getting started</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  {SHORTCUTS.map((s) => (
                    <ShortcutButton key={s.cmd} {...s} onRun={onRunCommand} />
                  ))}
                </div>
              </div>

              <div>
                <div className="text-primary text-sm mb-2">The kind of company I want to help build</div>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>A business obsessed with solving genuine customer problems</li>
                  <li>A mission-led organisation with strong ethics</li>
                  <li>A culture where value curiosity, ownership, and bold ideas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
