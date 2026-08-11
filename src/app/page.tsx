import { Sidebar } from '@/components/layout/Sidebar';
import { HubHeader } from '@/components/layout/HubHeader';
import { HeroFocus } from '@/components/sections/HeroFocus';
import { OperationsPulse } from '@/components/sections/OperationsPulse';
import { SystemsAndOperations } from '@/components/sections/SystemsAndOperations';
import { OpsAiInsights } from '@/components/sections/OpsAiInsights';
import { HelpOwnership } from '@/components/sections/HelpOwnership';
import { getFocusMetric, getPulseKpis, getDailyVolume } from '@/services/metricsService';

const OWNER = 'Operations Intelligence';
const UPDATED = 'Aug 11';

/**
 * Operations Hub homepage.
 *
 * Server component: all data is fetched server-side (services return mock in
 * Phase 2, live sources in later phases) so no credentials or fan-out of API
 * calls reach the browser. The three sections stream in below the hero.
 */
export default async function Home() {
  const [focus, kpis, daily] = await Promise.all([
    getFocusMetric(),
    getPulseKpis(),
    getDailyVolume(),
  ]);

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-6xl space-y-12 px-5 py-8 sm:px-8 lg:py-10">
          <HubHeader owner={OWNER} updated={UPDATED} />

          <HeroFocus
            focus={focus.data}
            kpis={kpis.data}
            daily={daily.data}
            focusStale={!focus.meta.ok}
            dailyStale={!daily.meta.ok}
          />

          <OperationsPulse />
          <SystemsAndOperations />
          <OpsAiInsights />
          <HelpOwnership owner={OWNER} updated={UPDATED} />
        </div>
      </main>
    </div>
  );
}
