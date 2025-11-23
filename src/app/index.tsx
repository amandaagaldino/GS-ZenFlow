import { Redirect } from 'expo-router';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getUser } from '@/src/utils/storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();
      if (user) {
        if (user.isGestor) {
          router.replace('/gestor');
        } else {
          router.replace('/(tabs)');
        }
      } else {
        router.replace('/login');
      }
    };
    checkAuth();
  }, []);

  return <Redirect href="/login" />;
}

