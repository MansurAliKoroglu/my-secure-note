import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const idToken = useSelector(state => state.auth.idToken);
  const history = useHistory();

  useEffect(() => {
    if (!idToken) {
      history.replace('/auth');
    }
  }, [idToken, history]);

  // TODO: This page will be implemented later.
  if (idToken) {
    return (
      <div>HOME</div>
    );
  } else {
    return null;
  }
};

export default Home;
