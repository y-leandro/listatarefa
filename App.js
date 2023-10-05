import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Tarefa from './src/Tarefa';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [list, setList] = useState([]);

  function handleAdd() {
    if (tarefa === '') {
      return;
    }

    const dados = {
      key: Date.now(),
      item: tarefa,
      complete: false,
    };

    setList((oldArray) => [dados, ...oldArray]);
    setTarefa('');
  }

  function handleComplete(key) {
    setList((oldList) =>
      oldList.map((item) =>
        item.key === key ? { ...item, complete: !item.complete } : item
      )
    );
  }

  function handleDelete(key) {
    let filteredList = list.filter((item) => item.key !== key);
    setList(filteredList);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas tarefas</Text>

      {list.length === 0 ? (
        <Text style={styles.emptyText}>
          Não há nada por aqui... adicione novas tarefas.
        </Text>
      ) : (
        <FlatList
          data={list}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) => (
            <Tarefa
              data={item}
              completeItem={() => handleComplete(item.key)}
              deleteItem={() => handleDelete(item.key)}
            />
          )}
          style={styles.list}
        />
      )}

      <View style={styles.containerInput}>
        <TextInput
          placeholder="O que você tem para fazer?"
          style={styles.input}
          value={tarefa}
          onChangeText={(text) => setTarefa(text)}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <FontAwesome name="plus" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20, 
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#2383B2',
    marginTop: '10%',
    marginBottom: 20
  },
  containerInput: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: 20,
    paddingEnd: 5,
    marginBottom: 15,
    borderRadius: 25,
    border: '1px solid #1c1c1c',
    backgroundColor: '#F8F8F8',
  },
  input: {
    flex: 1,
    height: 44,
    padding: 4
  },
  buttonAdd: {
    width: 40,
    height: 40,
    backgroundColor: '#2383B2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  list: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingStart: '5%',
    paddingEnd: '5%',
    width: '100%',
  },
  emptyText: {
    fontSize: 18,
    color: '#888888',
    marginTop: 20,
    margin: '10%',
    textAlign: 'center',
  },
};
