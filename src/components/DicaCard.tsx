import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/src/constants/theme';

interface DicaCardProps {
  titulo: string;
  descricao: string;
  icone: keyof typeof Ionicons.glyphMap;
}

const DicaCard = ({ titulo, descricao, icone }: DicaCardProps) => {
  return (
    <View style={styles.dicaCard}>
      <View style={styles.dicaHeader}>
        <Ionicons name={icone} size={32} color={theme.colors.primary} />
        <Text style={styles.dicaTitulo}>{titulo}</Text>
      </View>
      <Text style={styles.dicaDescricao}>{descricao}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dicaCard: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.medium,
    borderRadius: 8,
    marginBottom: theme.spacing.medium,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dicaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  dicaTitulo: {
    fontSize: theme.fonts.subtitle,
    color: theme.colors.text,
    fontWeight: '600',
    marginLeft: theme.spacing.small,
    flex: 1,
  },
  dicaDescricao: {
    fontSize: theme.fonts.body,
    color: theme.colors.text,
    lineHeight: 20,
  },
});

export default DicaCard;

