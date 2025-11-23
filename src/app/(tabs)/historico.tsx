import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/src/constants/theme';
import { getRegistrosByUsuario, deleteRegistro, updateRegistro } from '@/src/api/registros';
import { getUserId } from '@/src/utils/storage';
import { Registro } from '@/src/types/registro';
import RegistroItem from '@/src/components/RegistroItem';
import LevelButton from '@/src/components/LevelButton';

export default function Historico() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [editingRegistro, setEditingRegistro] = useState<Registro | null>(null);
  const [editNivelEstresse, setEditNivelEstresse] = useState<number | null>(null);
  const [editObservacoes, setEditObservacoes] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    loadUserId();
  }, []);

  useEffect(() => {
    if (usuarioId) {
      loadRegistros();
    }
  }, [usuarioId]);

  const loadUserId = async () => {
    const id = await getUserId();
    if (!id) {
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

  const loadRegistros = async () => {
    if (!usuarioId) return;
    
    setIsLoading(true);
    try {
      const result = await getRegistrosByUsuario(usuarioId);
      setRegistros(result);
    } catch (error: any) {
      console.error('Erro ao carregar registros:', error);
      Alert.alert('Erro', error.message || 'Não foi possível carregar os registros.');
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
    if (!usuarioId) {
      Alert.alert('Erro', 'Usuário não identificado.');
      return;
    }
    setEditingRegistro(item);
    setEditNivelEstresse(item.nivelEstresse);
    setEditObservacoes(item.observacoes || '');
  };

  const handleCloseEdit = () => {
    setEditingRegistro(null);
    setEditNivelEstresse(null);
    setEditObservacoes('');
  };

  const handleSaveEdit = async () => {
    if (!editingRegistro || !usuarioId || editNivelEstresse === null) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSaving(true);
    try {
      await updateRegistro(editingRegistro.id, usuarioId, {
        nivelEstresse: editNivelEstresse,
        observacoes: editObservacoes.trim() || undefined,
      });
      await loadRegistros();
      handleCloseEdit();
      Alert.alert('Sucesso', 'Registro atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao atualizar:', error);
      Alert.alert('Erro', error.message || 'Não foi possível atualizar o registro.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id: number) => {
    if (!usuarioId) {
      Alert.alert('Erro', 'Usuário não identificado.');
      return;
    }

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
              await deleteRegistro(id, usuarioId);
              await loadRegistros();
              Alert.alert('Sucesso', 'Registro excluído!');
            } catch (error: any) {
              console.error('Erro ao excluir:', error);
              Alert.alert('Erro', error.message || 'Não foi possível excluir o registro.');
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
        keyExtractor={(item) => item.id.toString()}
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

      {/* Modal de Edição */}
      <Modal
        visible={editingRegistro !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseEdit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Registro</Text>
              <TouchableOpacity onPress={handleCloseEdit}>
                <Ionicons name="close" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.modalLabel}>Nível de Estresse</Text>
              <View style={styles.levelsContainer}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <LevelButton
                    key={level}
                    level={level}
                    isSelected={editNivelEstresse === level}
                    onPress={() => setEditNivelEstresse(level)}
                  />
                ))}
              </View>

              <Text style={styles.modalLabel}>Observações (opcional)</Text>
              <TextInput
                style={styles.modalTextInput}
                placeholder="Como foi seu dia?"
                placeholderTextColor={theme.colors.textLight}
                value={editObservacoes}
                onChangeText={setEditObservacoes}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={handleCloseEdit}
                disabled={isSaving}
              >
                <Text style={styles.modalButtonCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.modalButtonSave,
                  (editNivelEstresse === null || isSaving) && styles.modalButtonDisabled,
                ]}
                onPress={handleSaveEdit}
                disabled={editNivelEstresse === null || isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.modalButtonSaveText}>Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: theme.spacing.large,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.medium,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: theme.fonts.title,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  modalBody: {
    padding: theme.spacing.medium,
  },
  modalLabel: {
    fontSize: theme.fonts.subtitle,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.small,
    marginTop: theme.spacing.medium,
  },
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: theme.spacing.medium,
  },
  modalTextInput: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    padding: theme.spacing.medium,
    fontSize: theme.fonts.body,
    color: theme.colors.text,
    minHeight: 100,
    marginTop: theme.spacing.small,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: theme.spacing.medium,
    gap: theme.spacing.medium,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  modalButton: {
    flex: 1,
    padding: theme.spacing.medium,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  modalButtonCancel: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  modalButtonSave: {
    backgroundColor: theme.colors.primary,
  },
  modalButtonDisabled: {
    opacity: 0.5,
  },
  modalButtonCancelText: {
    fontSize: theme.fonts.body,
    fontWeight: '600',
    color: theme.colors.text,
  },
  modalButtonSaveText: {
    fontSize: theme.fonts.body,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

