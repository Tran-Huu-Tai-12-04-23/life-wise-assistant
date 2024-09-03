import { Helmet } from 'react-helmet-async';
import BoardHistory from 'src/sections/board/views/board-history';

// ----------------------------------------------------------------------

export default function BoardHistoryPage() {
  return (
    <>
      <Helmet>
        <title> Board history</title>
      </Helmet>
      <BoardHistory />
    </>
  );
}
