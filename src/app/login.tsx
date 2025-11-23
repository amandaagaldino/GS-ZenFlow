import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/src/constants/theme';
import { login } from '@/src/api/usuarios';
import { saveUser } from '@/src/utils/storage';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Limpa qualquer estado residual quando a tela de login é carregada
  useEffect(() => {
    // Força um re-render para garantir que estamos na tela correta
    const timer = setTimeout(() => {
      // Verifica se ainda estamos na tela de login
      // Se não estiver, não faz nada
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (): Promise<void> => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha email e senha.');
      return;
    }

    setIsLoading(true);
    try {
      const usuario = await login({ email: email.trim(), senha: password });
      
      // Verificar se é gestor
      if (usuario.isGestor) {
        Alert.alert('Atenção', 'Este é um login de gestor. Use a opção "Login para Gerente".');
        setIsLoading(false);
        return;
      }

      // Salvar usuário no storage
      await saveUser(usuario);
      
      // Navegar para a tela principal
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      Alert.alert(
        'Erro no Login',
        error.message || 'Email ou senha incorretos. Tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      
      {/* Seção superior com logo */}
      <View style={styles.logoSection}>
        <Image
          source={require('../../assets/logozenflow.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Seção inferior com formulário */}
      <View style={styles.formSection}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor={theme.colors.textLight}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={theme.colors.textLight}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <View style={styles.buttonContent}>
                <Ionicons name="person" size={20} color="#FFFFFF" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Entrar</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.managerButton}
            onPress={() => router.push('/manager-login')}
            activeOpacity={0.8}
          >
            <Text style={styles.managerButtonText}>Login para Gerente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoSection: {
    flex: 0.4,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 320,
    height: 200,
    marginBottom: theme.spacing.small,
  },
  formSection: {
    flex: 0.6,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.large,
    paddingTop: theme.spacing.large * 2,
    paddingBottom: theme.spacing.large,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: theme.spacing.medium,
  },
  label: {
    fontSize: theme.fonts.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
    fontWeight: '500',
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    paddingHorizontal: theme.spacing.medium,
    paddingVertical: theme.spacing.medium,
    fontSize: theme.fonts.body,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: theme.spacing.small,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: theme.fonts.subtitle,
    fontWeight: '600',
  },
  managerButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.small,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  managerButtonText: {
    color: theme.colors.primary,
    fontSize: theme.fonts.body,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});

