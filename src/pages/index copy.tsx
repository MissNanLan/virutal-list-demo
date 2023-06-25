import React, { useState, useEffect, useRef } from "react";

const VirtualList = ({ itemHeight, data, containerHeight }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    calculateVisibleRange();

    window.addEventListener("resize", handleWindowResize);
    containerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      containerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    renderVisibleItems();
  }, [startIndex, endIndex]);

  const calculateVisibleRange = () => {
    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const endIndex = Math.min(startIndex + visibleCount, data.length - 1);

    setStartIndex(startIndex);
    setEndIndex(endIndex);
  };

  const handleWindowResize = () => {
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      calculateVisibleRange();
    }, 100);
  };

  const handleScroll = () => {
    calculateVisibleRange();
  };

  const renderVisibleItems = () => {
    const items = [];
    for (let i = startIndex; i <= endIndex; i++) {
      items.push(
        <li key={i} onClick={() => handleItemClick(i)}>
          {data[i]}
        </li>
      );
    }
    setVisibleItems(items);
  };

  const handleItemClick = (index) => {
    console.log(`点击了第 ${index} 项：${data[index]}`);
  };

  const handleLoadMore = () => {
    // 模拟加载更多数据
    setTimeout(() => {
      const newData = Array.from(
        { length: 1000 },
        (_, index) => `新列表项 ${index}`
      );
      setData([...data, ...newData]);
    }, 1000);
  };

  return (
    <div
      style={{ height: `${containerHeight}px`, overflowY: "auto" }}
      ref={containerRef}
    >
      <ul style={{ height: `${data.length * itemHeight}px` }}>
        {visibleItems}
        {endIndex === data.length - 1 && (
          <li>
            <button onClick={handleLoadMore}>加载更多</button>
          </li>
        )}
      </ul>
    </div>
  );
};

const App = () => {
  const initialData = Array.from(
    { length: 1000 },
    (_, index) => `列表项 ${index}`
  );
  const [data, setData] = useState(initialData);

  return (
    <div>
      <h1>虚拟列表示例</h1>
      <VirtualList itemHeight={50} data={data} containerHeight={300} />
    </div>
  );
};

export default App;
