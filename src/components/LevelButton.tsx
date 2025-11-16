import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '@/src/constants/theme';
import { getEmojiForLevel, getColorForLevel } from '@/src/utils/estresse';

interface LevelButtonProps {
  level: number;
  isSelected: boolean;
  onPress: () => void;
}

const LevelButton = ({ level, isSelected, onPress }: LevelButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.levelButton,
        isSelected && {
          backgroundColor: getColorForLevel(level),
          borderColor: getColorForLevel(level),
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{getEmojiForLevel(level)}</Text>
      <Text
        style={[
          styles.levelText,
          isSelected && styles.levelTextSelected,
        ]}
      >
        {level}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  levelButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.card,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  levelText: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: '600',
  },
  levelTextSelected: {
    color: '#FFFFFF',
  },
});

export default LevelButton;

