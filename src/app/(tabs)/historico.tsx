import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/src/constants/theme';
import { getRegistros, updateRegistro, deleteRegistro } from '@/src/api/registros';
import { Registro } from '@/src/types/registro';
import RegistroItem from '@/src/components/RegistroItem';

export default function Historico() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    loadRegistros();
  }, []);

  const loadRegistros = async () => {
    setIsLoading(true);
    try {
      const result = await getRegistros();
      setRegistros(result);
    } catch (error) {
      console.error('Erro ao carregar registros:', error);
      Alert.alert('Erro', 'Não foi possível carregar os registros.');
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRegistros();
    setRefreshing(false);
  };

  const handleEdit = (item: Registro) => {
    Alert.alert(
      'Editar Nível de Estresse',
      'Selecione o novo nível:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Nível 1',
          onPress: async () => {
            await updateRegistroItem(item, 1);
          },
        },
        {
          text: 'Nível 2',
          onPress: async () => {
            await updateRegistroItem(item, 2);
          },
        },
        {
          text: 'Nível 3',
          onPress: async () => {
            await updateRegistroItem(item, 3);
          },
        },
        {
          text: 'Nível 4',
          onPress: async () => {
            await updateRegistroItem(item, 4);
          },
        },
        {
          text: 'Nível 5',
          onPress: async () => {
            await updateRegistroItem(item, 5);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const updateRegistroItem = async (item: Registro, novoNivel: number) => {
    setIsPending(true);
    try {
      await updateRegistro(item.id, {
        nivelEstresse: novoNivel,
        observacoes: item.observacoes,
      });
      await loadRegistros();
      Alert.alert('Sucesso', 'Registro atualizado!');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o registro.');
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setIsPending(true);
            try {
              await deleteRegistro(id);
              await loadRegistros();
              Alert.alert('Sucesso', 'Registro excluído!');
            } catch (error) {
              console.error('Erro ao excluir:', error);
              Alert.alert('Erro', 'Não foi possível excluir o registro.');
            } finally {
              setIsPending(false);
            }
          },
        },
      ]
    );
  };


  if (isLoading && registros.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {isPending && (
        <View style={styles.pendingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
      <FlatList
        data={registros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RegistroItem
            registro={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color={theme.colors.textLight} />
            <Text style={styles.emptyText}>Nenhum registro encontrado</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={registros.length === 0 ? styles.emptyList : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  pendingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.large * 3,
  },
  emptyText: {
    fontSize: theme.fonts.body,
    color: theme.colors.textLight,
    marginTop: theme.spacing.medium,
  },
  emptyList: {
    flexGrow: 1,
  },
});

