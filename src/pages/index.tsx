import VirtualList from "@/components/VirtualList";

export default function VirtualListDemo() {
  const data = Array.from({ length: 10000 }, (_, index) => `列表项 ${index}`);

  return (
    <div style={{ backgroundColor: "#ffff00" }}>
      <VirtualList itemHeight={50} data={data} containerHeight={300} />
    </div>
  );
}
