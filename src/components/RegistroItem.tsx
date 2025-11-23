import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/src/constants/theme';
import { Registro } from '@/src/types/registro';
import { getEmojiForLevel } from '@/src/utils/estresse';

interface RegistroItemProps {
  registro: Registro;
  onEdit: (registro: Registro) => void;
  onDelete: (id: number) => void;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const RegistroItem = ({ registro, onEdit, onDelete }: RegistroItemProps) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemHeader}>
        <View style={styles.levelContainer}>
          <Text style={styles.emoji}>{getEmojiForLevel(registro.nivelEstresse)}</Text>
          <View>
            <Text style={styles.levelText}>Nível {registro.nivelEstresse}</Text>
            <Text style={styles.dateText}>{formatDate(registro.data)}</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(registro)}
          >
            <Ionicons name="pencil" size={20} color={theme.colors.secondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDelete(registro.id)}
          >
            <Ionicons name="trash-outline" size={20} color={theme.colors.error} />
          </TouchableOpacity>
        </View>
      </View>
      {registro.observacoes && (
        <Text style={styles.observacoesText}>{registro.observacoes}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.card,
    marginHorizontal: theme.spacing.medium,
    marginVertical: theme.spacing.small,
    padding: theme.spacing.medium,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 32,
    marginRight: theme.spacing.small,
  },
  levelText: {
    fontSize: theme.fonts.subtitle,
    color: theme.colors.text,
    fontWeight: '600',
  },
  dateText: {
    fontSize: theme.fonts.body - 2,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.small,
  },
  actionButton: {
    padding: theme.spacing.small,
  },
  observacoesText: {
    fontSize: theme.fonts.body,
    color: theme.colors.text,
    marginTop: theme.spacing.small,
    fontStyle: 'italic',
  },
});

export default RegistroItem;

