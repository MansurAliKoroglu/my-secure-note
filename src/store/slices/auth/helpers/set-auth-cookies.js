import Cookies from 'universal-cookie';

const setAuthCookies = (idToken, refreshToken, expiresIn) => {
  const cookies = new Cookies();

  cookies.set(
    'idToken',
    idToken,
    {
      path: '/',
      secure: true
    }
  );
  cookies.set(
    'refreshToken',
    refreshToken,
    {
      path: '/',
      secure: true
    }
  );
  cookies.set(
    'expiresIn',
    expiresIn,
    {
      path: '/'
    }
  );
};

export default setAuthCookies;
