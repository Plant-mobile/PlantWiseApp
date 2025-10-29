import { useRouter } from "expo-router";

import Items from "../../components/Items";
import { translation } from "../../services/translateService";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res =await fetch('http://192.168.1.121:5000/api/Fertilizers', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  // body: JSON.stringify({ question: 'اشرح لي عن النباتات' }),
});
        const json = await res.json();
        setData(json); // خزّن البيانات
        console.log(json);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
      }
    };
    getData();
  }, []);

  // const data = [
  //   {
  //     id: 1,
  //     name: "Urea",
  //     catagory: "nitrogen_fertilizers",
  //     img: "nitrogen",
  //     chemical_formula: "CO(NH2)2",
  //     Symptoms:
  //       "Yellowing of old leaves (old ones turn yellow and then fall off), poor growth, stunting of the plant",
  //     approximate_proportions: "46%N",
  //     solubility: "Very high",
  //     common_form: "Small white granules, sometimes a soluble powder",
  //     Indications: "To stimulate vegetative growth, strong leaves and stems",
  //     application: "Soil scatter, side fertilize, or spray solution",
  //   },

  //   // {id: 2, name: 'some name', catagory: 'Nitrogen Fertilizers', img: 'flower'}
  // ];

  return (
    <Items
      data={data}
      catagory={[
        { catagory: "nitrogen_fertilizers", img: "nitrogen" },
        { catagory: "micrinurent_fertilizers", img: "micrinurent" },
        { catagory: "nitrogen_fertilizers", img: "potassium" },
        { catagory: "nitrogen_fertilizers", img: "phoshate" },
      ]}
      type={"fertilizer"}
      title={translation("items.fertilizers_type")}
    />
  );
}
