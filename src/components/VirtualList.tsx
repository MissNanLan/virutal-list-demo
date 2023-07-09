import { useEffect, useRef, useState } from "react";
import "./style.less";

const VirtualList = ({ itemHeight, data, containerHeight }) => {
  const listContentRef = useRef(null);
  const listRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const calculateVisibleRange = () => {
    const scrollTop = listRef?.current?.scrollTop;
    console.log("scrollTop", scrollTop);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = startIndex + visibleCount;

    setStartIndex(startIndex);
    setEndIndex(endIndex);
  };

  const renderVisibleItems = () => {
    const items = data.slice(startIndex, endIndex + 1).map((item, index) => (
      <li key={startIndex + index} className="list-view-item">
        {item}
      </li>
    ));
    setVisibleItems(items);
  };
  useEffect(() => {
    calculateVisibleRange();
  }, []);

  useEffect(() => {
    renderVisibleItems();

    listContentRef.current.style.webkitTransform = `translate3d(0, ${
      startIndex * itemHeight
    }px, 0)`;
  }, [startIndex, endIndex]);

  return (
    <div
      className="list-view"
      onScroll={calculateVisibleRange}
      style={{ height: `${containerHeight}px` }}
      ref={listRef}
    >
      <div
        className="list-view-phantom"
        style={{
          height: `${data.length * itemHeight}px`,
        }}
      ></div>
      <div className="list-view-content" ref={listContentRef}>
        {visibleItems.map((item, index) => (
          <div style={{ height: `${itemHeight}px` }} key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualList;
