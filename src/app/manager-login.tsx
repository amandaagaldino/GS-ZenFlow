import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import theme from '@/src/constants/theme';

export default function ManagerLogin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = (): void => {
    // Navegação para a tela do gestor
    router.replace('/gestor');
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
              placeholder="gerente@empresa.com"
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
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Entrar como Gerente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: theme.fonts.subtitle,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: theme.spacing.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.small,
  },
  backButtonText: {
    color: theme.colors.textLight,
    fontSize: theme.fonts.body,
    fontWeight: '500',
  },
});

