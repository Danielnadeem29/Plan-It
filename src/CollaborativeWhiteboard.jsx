import React, { useRef, useState, useEffect } from "react";
import "./CollaborativeWhiteboard.css";

export default function CollaborativeWhiteboard() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3B3B3B");
  const [size, setSize] = useState(3);
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [cursor, setCursor] = useState("default");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error("Canvas not found!");
      return;
    }

    ctx.current = canvas.getContext("2d");
    if (!ctx.current) {
      console.error("Canvas context not initialized!");
      return;
    }

    // Set canvas size and initialize white background
    canvas.height = window.innerHeight - 100;
    canvas.width = window.innerWidth;
    ctx.current.fillStyle = "white";
    ctx.current.fillRect(0, 0, canvas.width, canvas.height);

    // Load saved canvas state from localStorage
    const canvasImg = localStorage.getItem("canvasImg");
    if (canvasImg) {
      const image = new Image();
      image.onload = () => {
        ctx.current.drawImage(image, 0, 0);
      };
      image.src = canvasImg;
    }
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const finishDrawing = () => {
    setIsDrawing(false);
    ctx.current.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    ctx.current.lineWidth = size;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = color;

    ctx.current.lineTo(offsetX, offsetY);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(offsetX, offsetY);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctx.current.clearRect(0, 0, canvas.width, canvas.height);

    // Reapply white background
    ctx.current.fillStyle = "white";
    ctx.current.fillRect(0, 0, canvas.width, canvas.height);

    localStorage.removeItem("canvasImg");
  };

  const usePencil = () => {
    setCursor("default");
    setSize(3);
    setColor("#3B3B3B");
  };

  const useEraser = () => {
    setCursor("crosshair");
    setSize(20);
    setColor("white");
  };

  return (
    <div className="whiteboard-container">
      <div className="canvas-toolbar">
        <button onClick={usePencil} className="toolbar-btn">Pencil</button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="toolbar-input"
        />
        <select
          className="toolbar-select"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
        <button onClick={clearCanvas} className="toolbar-btn">Clear</button>
        <button onClick={useEraser} className="toolbar-btn">Eraser</button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        style={{ cursor: cursor }}
      />
    </div>
  );
}
