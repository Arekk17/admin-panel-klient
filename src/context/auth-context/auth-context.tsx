import { useReducer, createContext } from 'react';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import type {
  AuthProviderProperties,
  AuthState,
  AuthReducerProperties
} from './auth-context.types';
import { ACTION_TYPE, DecodedToken, LoginProperties, SigninUserData } from './auth-context.types';

const initialState: AuthState = {
  user: null
};

const theToken = Cookie.get('token');

if (theToken) {
  // TODO add validation if the token is expired
  const { userId, role } = jwtDecode<DecodedToken>(theToken!);
  initialState.user = {
    userId,
    role,
    name: ''
  };
}

const AuthContext = createContext({
  user: null,
  login: (signinUserData: SigninUserData) => {},
  logout: () => {},
  getState: () => {}
});

const authReducer: AuthReducerProperties = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGIN:
      return {
        ...state,
        user: action.payload
      };
    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        user: null
      };
    case ACTION_TYPE.GET_STATE:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }: AuthProviderProperties) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login: LoginProperties = ({ token }) => {
    // TODO fix httpOnly flag
    Cookie.set('token', token);
    dispatch({
      type: ACTION_TYPE.LOGIN,
      payload: {
        ...jwtDecode<AuthState['user']>(token)
      }
    });
  };

  const logout = (): void => {
    Cookie.remove('token');
    dispatch({
      type: ACTION_TYPE.LOGOUT
    });
  };

  const getState = (): void => {
    const tokenCookie = Cookie.get('token');
    const payload = jwtDecode<AuthState['user']>(tokenCookie!);
    dispatch({
      type: ACTION_TYPE.GET_STATE,
      payload
    });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout, getState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
