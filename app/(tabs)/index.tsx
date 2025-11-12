import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import theme from '../../src/constants/theme';

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Bem-vindo ao ZenFlow</Text>
      <Text style={styles.subtitle}>Tela principal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.large,
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
});

