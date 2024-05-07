import Navbar from "../components/Navbar";
import Main from "./Main";
import HomeCookedGoodness from "../components/HomeCookedGoodness";
import Footer from "../components/Footer";

export default function App() {
  const foodTypes = [
    { id: "#bakedFoodSection", type: "Baked Food" },
    { id: "#frozenFoodSection", type: "Frozen Food" },
    { id: "#chickenFoodSection", type: "Chicken" },
    { id: "#beefFoodSection", type: "Beef" },
  ];
  const menuItems = [
    {
      id: 1,
      name: "Croissant",
      clicked: false,
      type: "Baked Food",
      description: "A crescent-shaped roll made from laminated dough",
      img: "bakedfood_img1.png",
      price: "800.00",
    },
    {
      id: 2,
      name: "Meatballs",
      clicked: false,
      type: "Frozen Food",
      description:
        "South Asian meatballs made with minced lamb or beef,lentils, chickpeas, and spices",
      img: "meatballs.png",
      price: "1000.00",
    },
    {
      id: 3,
      name: "Rice",
      clicked: false,
      type: "Beef",
      description: "Fried rice with vegetables and beef",
      img: "rice.png",
      price: "2000.00",
    },
    {
      id: 4,
      name: "Chicken Piece",
      clicked: false,
      type: "Chicken",
      img: "chickenpiece.png",
      description: "A piece of grilled chicken",
      price: "1200.00",
    },
    {
      id: 5,
      name: "Biscuits",
      clicked: false,
      type: "Baked Food",
      img: "biscuits.png",
      description:
        "Chocolate chip cookies mingle with oblong,chocolate-drizzled treats, with a hint of peanut butter cookies in the mix",
      price: "1500.00",
    },
  ];
  return (
    <>
      <Navbar foodTypes={foodTypes} />
      <Main menuItems={menuItems} foodType={foodTypes} />
      <HomeCookedGoodness />
      <Footer />
    </>
  );
}
