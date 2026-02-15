import { getVenueData } from '@/lib/data';
import KonfusionContent from '@/components/venues/konfusion-content';

export const revalidate = 60; // revalidate data every 60 seconds

export default async function KonfusionPage() {
    const { events, performers, deals, gallery } = await getVenueData('konfusion');

    return (
        <KonfusionContent
            upcomingEvents={events.upcoming}
            pastEvents={events.past}
            performers={performers}
            deals={deals}
            gallery={gallery}
        />
    );
}
