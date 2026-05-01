import { siteBasePath } from '@/lib/siteBasePath';

export function TerminalWelcome() {
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
              <div>
                <div className="text-primary text-sm mb-2">Tips for getting started</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>
                    Run <span className="text-foreground">projects</span> to view work
                  </div>
                  <div>
                    Run <span className="text-foreground">expertise</span> for skills
                  </div>
                  <div>
                    Run <span className="text-foreground">contact</span> to connect
                  </div>
                  <div>
                    Run <span className="text-foreground">interview</span> for{' '}
                    <span className="text-foreground">interview design task</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-primary text-sm mb-2">Recent activity</div>
                <div className="text-sm text-muted-foreground">
                  <div>● Available for new projects</div>
                  <div className="text-xs mt-1">Last updated: March 16, 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
