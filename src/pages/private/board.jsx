import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useModal } from 'src/contexts/modal-context';
import EditTaskView from 'src/sections/board/components/edit-task';

import BoardView from 'src/sections/board/views/board-view';

// ----------------------------------------------------------------------

export default function BoardPage() {
  const { openModal } = useModal();
  const { id } = useParams();

  useEffect(() => {
    if (id) openModal(<EditTaskView id={id} />);
  }, [id]);

  return (
    <>
      <Helmet>
        <title> Board - Manager </title>
      </Helmet>
      <BoardView />
    </>
  );
}
