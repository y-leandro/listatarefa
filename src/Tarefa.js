import React, { useState } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Tarefa({ data, completeItem, deleteItem }) {
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(!completed);
    completeItem(data.key);
  };

  const handleLongPress = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: () => deleteItem(data.key) },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        backgroundColor: '#CADEE8',
        padding: 15,
        borderRadius: 5,
        margin: 5
      }}
      onLongPress={handleLongPress}
    >
      <Text
        style={{
          textDecorationLine: completed ? 'line-through' : 'none',
          fontSize: 18,
          color: completed ? '#888888' : '#000000',
          maxWidth: '80%'
        }}
      >
        {data.item}
      </Text>
      <TouchableOpacity onPress={handleComplete}>
        <FontAwesome
          name={completed ? 'check-circle' : 'circle-thin'}
          size={24}
          color={completed ? '#2383B2' : '#888888'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
