import React, { useRef, useState } from "react";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";


const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);

  const mondrianColors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Box w="100vw" h="100vh" position="relative">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: "block" }}
      />
      <VStack position="absolute" top={4} left={4} spacing={4}>
        {mondrianColors.map((mondrianColor) => (
          <Button
            key={mondrianColor}
            bg={mondrianColor}
            size="lg"
            onClick={() => setColor(mondrianColor)}
            _hover={{ bg: mondrianColor }}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Index;