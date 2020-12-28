import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.replace('/auth');
    }
  }, [isAuthenticated, history]);

  // TODO: This page will be implemented later.
  if (isAuthenticated) {
    return (
      <div>HOME</div>
    );
  } else {
    return null;
  }
};

export default Home;
