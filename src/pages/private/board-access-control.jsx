import { Helmet } from 'react-helmet-async';
import BoardAccessControlSetting from 'src/sections/board/views/access-control';

// ----------------------------------------------------------------------

export default function BoardAccessControlPage() {
  return (
    <>
      <Helmet>
        <title> Board-access control</title>
      </Helmet>
      <BoardAccessControlSetting />
    </>
  );
}
