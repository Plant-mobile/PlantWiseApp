import { useRouter } from 'expo-router';

import Items from '../../components/Items';

export default function ProductList() {

const data = [
  { id: '1', title: 'Category c', subItems: [
      { id: 'a1', title: 'Item Ad1' },
      { id: 'a2', title: 'Item f' },
    ] },
  { id: '2', title: 'Category v', subItems: [
      { id: 'b1', title: 'Item Bs1' },
      { id: 'b2', title: 'Item f' },
    ] },
];

  return (
    <Items data={data}/>
  );
}
