import { Helmet } from 'react-helmet-async';
import { NotificationView } from 'src/sections/notification/view';

// ----------------------------------------------------------------------

export default function NotificationPage() {
  return (
    <>
      <Helmet>
        <title> Notification | Life Wise </title>
      </Helmet>

      <NotificationView />
    </>
  );
}
