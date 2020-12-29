import Cookies from 'universal-cookie';

const setAuthCookies = refreshToken => {
  const cookies = new Cookies();

  cookies.set(
    'refreshToken',
    refreshToken,
    {
      path: '/',
      secure: true
    }
  );
};

export default setAuthCookies;
