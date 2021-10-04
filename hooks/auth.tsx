import React, {
  createContext,
  useState,
  ReactNode,
  useContext
} from 'react'
import { Alert } from 'react-native';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  avatar: string;
  driver_license: string;
}

interface AuthState {
  user: User;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);

  async function signIn({ email, password }: SignInCredentials) {
    await api
      .post('/sessions', { email, password })
      .then(response => {
        const { token, user } = response.data;

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, user });
      })
      .catch(() => {
        Alert.alert('Opa', 'Email ou senha incorreta');
      });
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };