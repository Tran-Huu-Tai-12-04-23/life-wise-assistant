import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useModal } from 'src/contexts/modal-context';
import EditTaskView from 'src/sections/task/components/edit-task';

import { TaskView } from 'src/sections/task/views';

// ----------------------------------------------------------------------

export default function TaskPage() {
  const {openModal} = useModal()
  const {id} = useParams()

  useEffect(() => {
    if(id) openModal(<EditTaskView id={id}/>)
  }, [id])

  return (
    <>
      <Helmet>
        <title> Task | Life Wise </title>
      </Helmet>
      <TaskView />
    </>
  );
}
