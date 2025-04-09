import { withHydrationBoundary } from '@/shared/hocs/withHydrationBoundary';
import { withTeamValidationGuard } from '@/shared/hocs/withTeamValidationGuard';

const TeamSettings = withHydrationBoundary<{ teamId: string }>(() => {
  return (
    <section className="px-4">
      <div className="flex items-center justify-between">
        <h1>Team Settings</h1>
      </div>
    </section>
  );
}, []);

export const TeamSettingsPage = withTeamValidationGuard(TeamSettings);
