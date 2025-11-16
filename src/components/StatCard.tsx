import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '@/src/constants/theme';

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string | number;
  subtext?: string;
  iconColor?: string;
  valueColor?: string;
  children?: React.ReactNode;
}

const StatCard = ({
  icon,
  label,
  value,
  subtext,
  iconColor = theme.colors.primary,
  valueColor = theme.colors.primary,
  children,
}: StatCardProps) => {
  return (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        <Ionicons name={icon} size={24} color={iconColor} />
        <Text style={styles.statLabel}>{label}</Text>
      </View>
      {children || (
        <>
          <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
          {subtext && <Text style={styles.statSubtext}>{subtext}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.large,
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
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  statLabel: {
    fontSize: theme.fonts.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginLeft: theme.spacing.small,
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: theme.spacing.small,
  },
  statSubtext: {
    fontSize: theme.fonts.body - 2,
    color: theme.colors.textLight,
  },
});

export default StatCard;

