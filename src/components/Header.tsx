import React from 'react';
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

  const handleLogout = async () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeUser();
              if (onLogout) {
                onLogout();
              } else {
                router.replace(logoutRoute as any);
              }
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
              // Mesmo com erro, redirecionar
              router.replace(logoutRoute as any);
            }
          },
        },
      ]
    );
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

