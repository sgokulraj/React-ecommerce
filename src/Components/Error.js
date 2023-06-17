import {Link} from 'react-router-dom'

function Error() {
  return (
    <>
      <h4>Something went wrong</h4>
      <Link to="/">Back to Home</Link>
    </>
  );
}

export default Error;
