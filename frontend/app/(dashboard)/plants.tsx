import { useRouter } from 'expo-router';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import ThemedView from '../../components/ThemedView';
import Items from '../../components/Items';
import { translation } from '../../services/translateService';

export default function ProductList() {
  const router = useRouter();

const data = [
    {id: 1, name: 'Urea', catagory: 'nitrogen_fertilizers', img: 'nitrogen', climate: "CO(NH2)2",substrate: '46%N', temperatures: 'Very high', production_time: 'Small white granules, sometimes a soluble powder', humidity: "To stimulate vegetative growth, strong leaves and stems", profit: "Soil scatter, side fertilize, or spray solution"},
    {id: 1, name: 'Ammonium sulphate', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'micrinurent_fertilizers', img: 'micrinurent'},
    {id: 1, name: 'Ammonium nitratee', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'Calcium nitrate', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'phoshate_fertilizers', img: 'phoshate'},
    {id: 1, name: 'Calcium nitrate', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'phoshate_fertilizers', img: 'phoshate'},
    {id: 1, name: 'some name', catagory: 'micrinurent_fertilizers', img: 'micrinurent'},
    {id: 1, name: 'some name', catagory: 'potassium_fertilizers', img: 'potassium'},
    {id: 1, name: 'some name', catagory: 'potassium_fertilizers', img: 'potassium'},
    {id: 1, name: 'some name', catagory: 'phoshate_fertilizers', img: 'phoshate'},
    // {id: 2, name: 'some name', catagory: 'Nitrogen Fertilizers', img: 'flower'}
];


  return (
    <Items data={data}
       catagory={[
      { catagory: 'fungi', img: 'mushroom'},
      { catagory: 'shrubs', img: 'shrubs'},
      { catagory: 'trees', img: 'trees'},
      { catagory: 'herbaceous', img: 'herbs'},
    ]}
    type={'plants'}
    title={translation('items.plant_type')}
     />
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


