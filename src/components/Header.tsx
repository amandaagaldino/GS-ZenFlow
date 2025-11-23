import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/src/constants/theme';
import { removeUser } from '@/src/utils/storage';

interface HeaderProps {
  onLogout?: () => void;
  logoutRoute?: string;
}

export default function Header({ onLogout, logoutRoute = '/login' }: HeaderProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const performLogout = async () => {
    if (isLoggingOut) return; // Previne múltiplos cliques
    
    setIsLoggingOut(true);
    
    try {
      // Remove o usuário do storage
      await removeUser();
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
    }
    
    // Se houver callback customizado, usa ele (mais confiável)
    if (onLogout) {
      // Chama o callback - ele vai fazer a navegação
      onLogout();
    } else {
      // Fallback: navegação direta sem callback
      // Usa um delay maior para garantir que o Alert feche completamente
      setTimeout(() => {
        // Tenta múltiplas abordagens
        try {
          router.replace(logoutRoute as any);
        } catch (e) {
          try {
            router.push(logoutRoute as any);
          } catch (e2) {
            // Última tentativa: recarrega a aplicação indo para a raiz
            router.replace('/');
          }
        }
      }, 500);
    }
    
    setIsLoggingOut(false);
  };

  const handleLogout = () => {
    // Remove o Alert temporariamente para testar se é ele que está bloqueando
    // Se funcionar, podemos adicionar o Alert de volta depois
    performLogout();
    
    // Versão com Alert (comentada para teste):
    // Alert.alert(
    //   'Confirmar Logout',
    //   'Tem certeza que deseja sair?',
    //   [
    //     {
    //       text: 'Cancelar',
    //       style: 'cancel',
    //     },
    //     {
    //       text: 'Sair',
    //       style: 'destructive',
    //       onPress: performLogout,
    //     },
    //   ],
    //   { cancelable: true }
    // );
  };

  return (
    <View style={styles.header}>
      <Text style={styles.appName}>ZenFlow</Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={24} color={theme.colors.text} />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.large,
    paddingVertical: theme.spacing.medium,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  appName: {
    fontSize: theme.fonts.title,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.small,
    paddingVertical: theme.spacing.small / 2,
  },
  logoutText: {
    fontSize: theme.fonts.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.small / 2,
    fontWeight: '500',
  },
});

