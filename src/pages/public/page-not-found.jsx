import { Helmet } from 'react-helmet-async';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function NotFoundPage({title = '404 Page Not Found', onBack = null}) {
  return (
    <>
      <Helmet>
        <title> {title} </title>
      </Helmet>

      <NotFoundView title={title} onBack={onBack}/>
    </>
  );
}
