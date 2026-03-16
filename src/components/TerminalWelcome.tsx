export function TerminalWelcome() {
  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="border-2 border-primary rounded-lg p-8">
          <div className="grid md:grid-cols-[1fr_auto] gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              <div className="text-primary text-sm">Portfolio v2.1.0</div>

              <h1 className="text-2xl">Welcome back!</h1>

              {/* ASCII Art */}
              <div className="text-primary font-bold select-none" style={{ lineHeight: '1.2' }}>
                <pre className="text-xs md:text-sm">
                  {`    ████████
   ██      ██
   ██  ██  ██
   ██      ██
    ████████
      ████`}
                </pre>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div>UX Designer · Design Engineer · Vibe Coder</div>
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
