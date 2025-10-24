import { useRouter } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import ThemedView from '../../components/ThemedView';
import Items from '../../components/Items';

export default function ProductList() {
  const router = useRouter();

const data = [
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    // {id: 2, name: 'some name', catagory: 'Nitrogen Fertilizers', img: 'flower'}
];


  return (
    <Items data={data} />
    // <ThemedView style={{ padding: 20, height: "100%" }}>
    //   <FlatList
    //     data={products}
    //     keyExtractor={(item) => item.id.toString()}
    //     renderItem={({ item }) => (
    //       <TouchableOpacity
    //         onPress={() => router.push(`/details/${JSON.stringify(item)}`)} 
    //         style={{
    //           backgroundColor: '#f2f2f2',
    //           padding: 15,
    //           borderRadius: 8,
    //           marginBottom: 10,
    //         }}
    //       >
    //         <Text style={{ fontSize: 18 }}>{item.name}</Text>
    //         <Text style={{ color: 'gray' }}>${item.price}</Text>
    //       </TouchableOpacity>
    //     )}
    //   />
    // </ThemedView>
  );
}


