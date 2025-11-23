import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import theme from '@/src/constants/theme';
import { createRegistro } from '@/src/api/registros';
import { getUserId } from '@/src/utils/storage';
import LevelButton from '@/src/components/LevelButton';
import Header from '@/src/components/Header';

export default function Home() {
  const [nivelEstresse, setNivelEstresse] = useState<number | null>(null);
  const [observacoes, setObservacoes] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar se há usuário logado
    loadUserId();
  }, []);

  const loadUserId = async () => {
    const id = await getUserId();
    if (!id) {
      // Se não houver usuário logado, redirecionar para login
      Alert.alert('Atenção', 'Você precisa fazer login para continuar.', [
        {
          text: 'OK',
          onPress: () => router.replace('/login'),
        },
      ]);
      return;
    }
    setUsuarioId(id);
  };

  const handleRegistrar = async () => {
    if (nivelEstresse === null) {
      Alert.alert('Atenção', 'Por favor, selecione um nível de estresse.');
      return;
    }

    if (!usuarioId) {
      Alert.alert('Erro', 'Usuário não identificado. Faça login novamente.');
      router.replace('/login');
      return;
    }

    setIsLoading(true);
    try {
      await createRegistro(usuarioId, {
        nivelEstresse,
        observacoes: observacoes.trim() || undefined,
      });
      
      Alert.alert('Sucesso', 'Registro salvo com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            setNivelEstresse(null);
            setObservacoes('');
          },
        },
      ]);
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      Alert.alert('Erro', error.message || 'Não foi possível salvar o registro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header logoutRoute="/login" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
        <Text style={styles.greeting}>Olá, como você está hoje?</Text>

        <View style={styles.levelsContainer}>
          {[1, 2, 3, 4, 5].map((level) => (
            <LevelButton
              key={level}
              level={level}
              isSelected={nivelEstresse === level}
              onPress={() => setNivelEstresse(level)}
            />
          ))}
        </View>

        <View style={styles.observacoesContainer}>
          <Text style={styles.label}>Observações do dia (opcional)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Como foi seu dia?"
            placeholderTextColor={theme.colors.textLight}
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.registerButton,
            (nivelEstresse === null || isLoading) && styles.registerButtonDisabled,
          ]}
          onPress={handleRegistrar}
          disabled={nivelEstresse === null || isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.registerButtonText}>Registrar</Text>
          )}
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.large,
  },
  greeting: {
    fontSize: theme.fonts.title,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: theme.spacing.large * 2,
    textAlign: 'center',
  },
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.large * 2,
  },
  observacoesContainer: {
    marginBottom: theme.spacing.large,
  },
  label: {
    fontSize: theme.fonts.body,
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
    fontWeight: '500',
  },
  textInput: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    padding: theme.spacing.medium,
    fontSize: theme.fonts.body,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 100,
  },
  registerButton: {
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
  registerButtonDisabled: {
    backgroundColor: theme.colors.textLight,
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fonts.subtitle,
    fontWeight: '600',
  },
});

