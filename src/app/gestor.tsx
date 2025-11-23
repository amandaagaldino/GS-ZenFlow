import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/src/constants/theme';
import { getEstatisticas } from '@/src/api/registros';
import { getUser } from '@/src/utils/storage';
import { Registro } from '@/src/types/registro';
import StatCard from '@/src/components/StatCard';
import { getEmojiForLevel } from '@/src/utils/estresse';
import Header from '@/src/components/Header';

export default function Gestor() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    checkUserAndLoad();
  }, []);

  const checkUserAndLoad = async () => {
    const usuario = await getUser();
    if (!usuario) {
      Alert.alert('Atenção', 'Você precisa fazer login para continuar.', [
        {
          text: 'OK',
          onPress: () => router.replace('/manager-login'),
        },
      ]);
      return;
    }

    if (!usuario.isGestor) {
      Alert.alert('Acesso Negado', 'Você não tem permissão para acessar esta área.', [
        {
          text: 'OK',
          onPress: () => router.replace('/login'),
        },
      ]);
      return;
    }

    loadEstatisticas();
  };

  const loadEstatisticas = async () => {
    setIsLoading(true);
    try {
      const result = await getEstatisticas();
      setRegistros(result);
    } catch (error: any) {
      console.error('Erro ao carregar estatísticas:', error);
      Alert.alert('Erro', error.message || 'Não foi possível carregar as estatísticas.');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEstatisticas();
    setRefreshing(false);
  };

  // Calcular média
  const calcularMedia = () => {
    if (registros.length === 0) return 0;
    const soma = registros.reduce((acc, reg) => acc + reg.nivelEstresse, 0);
    return (soma / registros.length).toFixed(2);
  };

  // Calcular moda (número que mais se repete)
  const calcularModa = () => {
    if (registros.length === 0) return null;
    
    const frequencias: { [key: number]: number } = {};
    registros.forEach((reg) => {
      frequencias[reg.nivelEstresse] = (frequencias[reg.nivelEstresse] || 0) + 1;
    });

    let moda = 1;
    let maxFrequencia = frequencias[1] || 0;

    for (let i = 2; i <= 5; i++) {
      if ((frequencias[i] || 0) > maxFrequencia) {
        maxFrequencia = frequencias[i] || 0;
        moda = i;
      }
    }

    return moda;
  };

  // Calcular porcentagem de pessoas que votaram 4 ou 5
  const calcularPorcentagemAltoEstresse = () => {
    if (registros.length === 0) return 0;
    const altoEstresse = registros.filter(
      (reg) => reg.nivelEstresse === 4 || reg.nivelEstresse === 5
    ).length;
    return ((altoEstresse / registros.length) * 100).toFixed(1);
  };

  const media = calcularMedia();
  const moda = calcularModa();
  const porcentagemAltoEstresse = calcularPorcentagemAltoEstresse();

  if (isLoading && registros.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Carregando estatísticas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header logoutRoute="/manager-login" />
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Ionicons name="stats-chart" size={32} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>Painel do Gestor</Text>
        </View>

      <View style={styles.statsContainer}>
        <StatCard
          icon="calculator-outline"
          label="Média de Estresse"
          value={media}
          subtext={`Baseado em ${registros.length} registro${registros.length !== 1 ? 's' : ''}`}
        />

        <StatCard
          icon="pulse-outline"
          label="Moda (Mais Frequente)"
          value="-"
        >
          {moda ? (
            <>
              <View style={styles.modaContainer}>
                <Text style={styles.modaEmoji}>{getEmojiForLevel(moda)}</Text>
                <Text style={styles.statValue}>Nível {moda}</Text>
              </View>
              <Text style={styles.statSubtext}>
                Nível de estresse mais registrado
              </Text>
            </>
          ) : (
            <Text style={styles.statValue}>-</Text>
          )}
        </StatCard>

        <StatCard
          icon="alert-circle-outline"
          label="Alto Estresse (4 ou 5)"
          value={`${porcentagemAltoEstresse}%`}
          subtext="Porcentagem de registros com nível 4 ou 5"
          iconColor={theme.colors.error}
          valueColor={theme.colors.error}
        />
      </View>

      <View style={styles.infoCard}>
        <Ionicons name="information-circle-outline" size={24} color={theme.colors.secondary} />
        <Text style={styles.infoText}>
          Estatísticas atualizadas em tempo real. Puxe para baixo para atualizar.
        </Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    marginTop: theme.spacing.medium,
    fontSize: theme.fonts.body,
    color: theme.colors.textLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.large,
    backgroundColor: theme.colors.card,
    marginBottom: theme.spacing.medium,
  },
  headerTitle: {
    fontSize: theme.fonts.title,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginLeft: theme.spacing.small,
  },
  statsContainer: {
    padding: theme.spacing.medium,
  },
  statValue: {
    fontSize: 36,
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.small,
  },
  statSubtext: {
    fontSize: theme.fonts.body - 2,
    color: theme.colors.textLight,
  },
  modaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  modaEmoji: {
    fontSize: 36,
    marginRight: theme.spacing.small,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.medium,
    margin: theme.spacing.medium,
    borderRadius: 8,
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: theme.fonts.body,
    color: theme.colors.text,
    marginLeft: theme.spacing.small,
    flex: 1,
    lineHeight: 20,
  },
});

