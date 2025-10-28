import { useRouter } from 'expo-router';

import Items from '../../components/Items';
import { translation } from '../../services/translateService';

export default function ProductList() {


const data = [
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'micrinurent_fertilizers', img: 'micrinurent'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen',},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'phoshate_fertilizers', img: 'phoshate'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'phoshate'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'micrinurent'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'potassium_fertilizers', img: 'potassium'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'potassium'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
    {id: 1, name: 'some name', catagory: 'nitrogen_fertilizers', img: 'phoshate'},
    {id: 1, name: 'Urea', catagory: 'nitrogen_fertilizers', img: 'nitrogen', chemical_formula: "CO(NH2)2",approximate_proportions: '46%N', solubility: 'Very high', common_form: 'Small white granules, sometimes a soluble powder', Indications: "To stimulate vegetative growth, strong leaves and stems", application: "Soil scatter, side fertilize, or spray solution"},

    // {id: 2, name: 'some name', catagory: 'Nitrogen Fertilizers', img: 'flower'}
];

  return (
    <Items data={data}
    catagory=
    {[
      { catagory: 'nitrogen_fertilizers', img: 'nitrogen'},
      { catagory: 'micrinurent_fertilizers', img: 'micrinurent'},
      { catagory: 'nitrogen_fertilizers', img: 'potassium'},
      { catagory: 'nitrogen_fertilizers', img: 'phoshate'},
    ]}
    type={'fertilizer'}
    title={translation('items.fertilizers_type')}
    />
  );
}
