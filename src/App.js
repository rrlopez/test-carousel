import Carousel from "./components/Carousel";

const DATA = [
  { name: "Company A" },
  { name: "Company X" },
  { name: "Company Z" },
  { name: "Company B" },
  { name: "Company C" },
  { name: "Company D" },
];

export default function App() {
  return (
    <Carousel>
      {DATA.map(({ name }) => (
        <div
          className="min-w-[calc(100%/3)] border aspect-video p-2"
          key={name}
        >
          <h2>{name}</h2>
          <Carousel className="overflow-x-overlay">
            {DATA.map(({ name }) => (
              <div
                className="min-w-[calc(100%/3)] border aspect-video p-2"
                key={name}
              >
                <h2>{name}</h2>
              </div>
            ))}
          </Carousel>
        </div>
      ))}
    </Carousel>
  );
}
