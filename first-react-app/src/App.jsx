import FreezeCarousel from "./components/FreezeCarousel";

function App() {
  const items = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
  ];

  const carouselSize = 2;

  return (
    <>
      <FreezeCarousel items={items} carouselSize={carouselSize} />
    </>
  );
}

export default App;
