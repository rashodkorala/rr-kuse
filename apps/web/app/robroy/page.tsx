import { getVenueData } from '@/lib/data';
import RobRoyContent from '@/components/venues/robroy-content';

export const revalidate = 60; // revalidate data every 60 seconds

export default async function RobRoyPage() {
    const { events, performers, deals, gallery } = await getVenueData('rob_roy');

    return (
        <RobRoyContent
            upcomingEvents={events.upcoming}
            pastEvents={events.past}
            performers={performers}
            deals={deals}
            gallery={gallery}
        />
    );
}
