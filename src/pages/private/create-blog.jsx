import { Helmet } from 'react-helmet-async';
import CreateBlogView from 'src/sections/blog/view/create-blog-view';

// ----------------------------------------------------------------------

export default function CreateBlogPage() {
  return (
    <>
      <Helmet>
        <title>Create Blog | Life Wise </title>
      </Helmet>

      <CreateBlogView />
    </>
  );
}
