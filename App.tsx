import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

type Vegetable = {
  id: number;
  title: string;
  detail: string;
  icon: string;
};

const App = () => {
const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/vegetables/home-list')
      .then(res => res.json())
      .then(data => setVegetables(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('アカウントへ')}>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="野菜を検索"
          onFocus={() => console.log('検索画面へ')}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* 野菜リスト */}
      <FlatList
        data={vegetables}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item?.icon} {item?.title}</Text>
            <Text>{item?.detail}</Text>
          </View>
        )}
      />

      {/* フッター */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => console.log('ホーム')}>
          <Text>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('みつける')}>
          <Text>🔍</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('マイタネ')}>
          <Text>🌱</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('履歴')}>
          <Text>📜</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 },
  icon: { fontSize: 24, marginRight: 10 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    padding: 8,
    borderRadius: 4,
  },
  item: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});

export default App;
