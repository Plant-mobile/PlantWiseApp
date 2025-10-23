import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const Items = ({data}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleBack = () => {
    if (selectedItem) {
      // كنت داخل عنصر فرعي → ارجع لقائمة العناصر الفرعية
      setSelectedItem(null);
    } else if (selectedCategory) {
      // كنت داخل كاتيجوري → ارجع لقائمة الكاتيجوريز
      setSelectedCategory(null);
    }else {
      router.replace('/main')
    }
  };

  // لو محدد كاتيجوري → اعرض عناصرها
  if (selectedCategory) {
    const subItems = data.find(d => d.id === selectedCategory)?.subItems || [];

    if (selectedItem) {
      // صفحة التفاصيل للعنصر الداخلي
      return (
        <View style={styles.container}>
          <Text style={styles.title}>تفاصيل: {selectedItem}</Text>
        </View>
      );
    }

    // صفحة العناصر الداخلية
    return (
      <View style={styles.container}>
        <Text style={styles.title}>العناصر في {selectedCategory}</Text>
        <FlatList
          data={subItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => setSelectedItem(item.title)}>
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  // الصفحة الرئيسية (العناصر الخارجية)
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack}>
        <Text style={styles.back}>⬅ رجوع</Text>
      </TouchableOpacity>
      <Text style={styles.title}>القائمة الرئيسية</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => setSelectedCategory(item.id)}>
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}



export default Items

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  back: { color: 'blue', marginBottom: 10 },
  title: { fontSize: 20, marginBottom: 20 },
  item: { padding: 15, backgroundColor: '#eee', marginBottom: 10, borderRadius: 8 },
});