import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return <div className="">Hello from Home page</div>;
}

export default Home;
