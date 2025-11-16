import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/src/constants/theme';
import DicaCard from '@/src/components/DicaCard';

const dicas = [
  {
    id: '1',
    titulo: 'Respiração Profunda',
    descricao: 'Pratique respiração profunda por 5 minutos. Inspire pelo nariz contando até 4, segure por 4 segundos e expire pela boca contando até 4.',
    icone: 'leaf-outline',
  },
  {
    id: '2',
    titulo: 'Caminhada ao Ar Livre',
    descricao: 'Uma caminhada de 15 minutos pode reduzir significativamente os níveis de estresse e melhorar o humor.',
    icone: 'walk-outline',
  },
  {
    id: '3',
    titulo: 'Meditação',
    descricao: 'Reserve 10 minutos do seu dia para meditar. Use aplicativos de meditação guiada ou simplesmente foque na sua respiração.',
    icone: 'flower-outline',
  },
  {
    id: '4',
    titulo: 'Hidratação',
    descricao: 'Beba água regularmente ao longo do dia. A desidratação pode aumentar os níveis de cortisol (hormônio do estresse).',
    icone: 'water-outline',
  },
  {
    id: '5',
    titulo: 'Pausas Regulares',
    descricao: 'Faça pausas de 5 minutos a cada hora de trabalho. Levante-se, alongue-se e dê uma volta.',
    icone: 'time-outline',
  },
  {
    id: '6',
    titulo: 'Sono de Qualidade',
    descricao: 'Priorize 7-8 horas de sono por noite. Um sono adequado é fundamental para gerenciar o estresse.',
    icone: 'moon-outline',
  },
  {
    id: '7',
    titulo: 'Alimentação Balanceada',
    descricao: 'Evite alimentos processados e açúcares em excesso. Prefira alimentos naturais e ricos em nutrientes.',
    icone: 'nutrition-outline',
  },
  {
    id: '8',
    titulo: 'Limite de Notificações',
    descricao: 'Desative notificações desnecessárias do celular. Reduza a exposição constante a informações que podem gerar ansiedade.',
    icone: 'notifications-outline',
  },
];

export default function Dicas() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Dicas de Bem-Estar</Text>
        <Text style={styles.subtitle}>
          Pequenas ações que podem fazer grande diferença no seu dia a dia
        </Text>
      </View>

      <View style={styles.dicasContainer}>
        {dicas.map((dica) => (
          <DicaCard
            key={dica.id}
            titulo={dica.titulo}
            descricao={dica.descricao}
            icone={dica.icone as keyof typeof Ionicons.glyphMap}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.card,
    marginBottom: theme.spacing.medium,
  },
  title: {
    fontSize: theme.fonts.title,
    color: theme.colors.text,
    fontWeight: 'bold',
    marginBottom: theme.spacing.small,
  },
  subtitle: {
    fontSize: theme.fonts.body,
    color: theme.colors.textLight,
  },
  dicasContainer: {
    padding: theme.spacing.medium,
  },
});

