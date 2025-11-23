import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getUser, removeUser as removeUserStorage } from '@/src/utils/storage';
import { Usuario } from '@/src/types/usuario';

export function useAuth(redirectIfNotLogged = true) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const usuario = await getUser();
      setUser(usuario);
      
      if (!usuario && redirectIfNotLogged) {
        // Não redireciona aqui, deixa a tela decidir
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (redirectTo: string = '/login') => {
    try {
      await removeUserStorage();
      setUser(null);
      // Força a navegação usando uma abordagem mais direta
      if (router.canGoBack()) {
        router.dismissAll();
      }
      router.replace(redirectTo as any);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Mesmo com erro, tenta redirecionar
      router.replace(redirectTo as any);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    checkAuth,
    logout,
  };
}

