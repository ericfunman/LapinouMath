import React, { useRef, useState } from 'react';
import { Stage, Layer, Circle, Line, Text } from 'react-konva';
import { InteractiveQuestion, InteractiveElement } from '../../types';
import Konva from 'konva';

interface GeometryCanvasProps {
  question: InteractiveQuestion;
  onInteraction?: (elementId: string, action: string) => void;
  onCanvasReady?: (canvas: Konva.Stage) => void;
}

/**
 * GeometryCanvas Component
 * Renders an interactive canvas for geometry-based questions
 * Supports interactive elements like points, lines, circles, and polygons
 * 
 * Features:
 * - Grid background option
 * - Interactive element highlighting
 * - Point and line drawing
 * - Drag and drop support
 */
export const GeometryCanvas: React.FC<GeometryCanvasProps> = ({
  question,
  onInteraction,
  onCanvasReady,
}) => {
  const stageRef = useRef<Konva.Stage>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingPoints, setDrawingPoints] = useState<{ x: number; y: number }[]>([]);

  React.useEffect(() => {
    if (stageRef.current && onCanvasReady) {
      onCanvasReady(stageRef.current);
    }
  }, [onCanvasReady]);

  const handleCanvasClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (question.interactionType === 'click') {
      const clickedElement = e.target;
      if (clickedElement.name()) {
        const elementId = clickedElement.name();
        setSelectedElement(elementId);
        onInteraction?.(elementId, 'click');
      }
    }
  };

  const handleMouseMove = () => {
    const stage = stageRef.current;
    if (!stage || !isDrawing) return;

    const pointerPos = stage.getPointerPosition();
    if (pointerPos) {
      setDrawingPoints((prev) => [...prev, pointerPos]);
    }
  };

  const handleMouseDown = () => {
    if (question.interactionType !== 'draw') return;
    
    const stage = stageRef.current;
    if (!stage) return;

    // Toujours commencer le dessin peu importe où on clique sur le canvas
    setIsDrawing(true);
    const pointerPos = stage.getPointerPosition();
    if (pointerPos) {
      setDrawingPoints([pointerPos]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && drawingPoints.length > 1) {
      setIsDrawing(false);
      // Envoyer les points dessinés
      onInteraction?.('drawn-line', `draw:${JSON.stringify(drawingPoints)}`);
      // Garder la ligne dessinée visible
      // setDrawingPoints([]); // Décommentez pour effacer après
    } else if (isDrawing) {
      setIsDrawing(false);
      setDrawingPoints([]);
    }
  };

  const renderElement = (element: InteractiveElement) => {
    const isSelected = selectedElement === element.id;
    const strokeColor = isSelected ? '#FF6B6B' : element.color || '#333';
    const strokeWidth = isSelected ? 3 : 2;

    switch (element.type) {
      case 'point':
        return (
          <Circle
            key={element.id}
            name={element.id}
            x={element.x}
            y={element.y}
            radius={6}
            fill={strokeColor}
            onMouseEnter={(e) => {
              e.target.scale({ x: 1.5, y: 1.5 });
            }}
            onMouseLeave={(e) => {
              e.target.scale({ x: 1, y: 1 });
            }}
            onClick={handleCanvasClick}
            cursor={question.interactionType === 'click' ? 'pointer' : 'default'}
          />
        );

      case 'line':
      case 'segment': {
        if (!element.points || element.points.length < 2) return null;
        const flatPoints = element.points.flatMap((p) => [p.x, p.y]);
        return (
          <Line
            key={element.id}
            name={element.id}
            points={flatPoints}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            onClick={handleCanvasClick}
            cursor={question.interactionType === 'click' ? 'pointer' : 'default'}
          />
        );
      }

      case 'circle':
        return (
          <Circle
            key={element.id}
            name={element.id}
            x={element.x}
            y={element.y}
            radius={element.radius || 30}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            onClick={handleCanvasClick}
            cursor={question.interactionType === 'click' ? 'pointer' : 'default'}
          />
        );

      case 'polygon': {
        if (!element.points || element.points.length < 3) return null;
        const polygonPoints = element.points.flatMap((p) => [p.x, p.y]);
        return (
          <Line
            key={element.id}
            name={element.id}
            points={[...polygonPoints, element.points[0].x, element.points[0].y]}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            onClick={handleCanvasClick}
            cursor={question.interactionType === 'click' ? 'pointer' : 'default'}
          />
        );
      }

      default:
        return null;
    }
  };

  const renderLabels = () => {
    return question.canvas.elements
      .filter((el) => el.label)
      .map((el) => (
        <Text
          key={`label-${el.id}`}
          x={(el.x || 0) + 10}
          y={(el.y || 0) + 10}
          text={el.label}
          fontSize={14}
          fill="#333"
          pointerEvents="none"
        />
      ));
  };

  const renderGrid = () => {
    if (!question.canvas.grid) return null;

    const { width, height } = question.canvas;
    const gridSize = 20;
    const lines = [];

    // Vertical lines
    for (let i = 0; i <= width; i += gridSize) {
      lines.push(
        <Line
          key={`vline-${i}`}
          points={[i, 0, i, height]}
          stroke="#E0E0E0"
          strokeWidth={0.5}
          pointerEvents="none"
        />
      );
    }

    // Horizontal lines
    for (let i = 0; i <= height; i += gridSize) {
      lines.push(
        <Line
          key={`hline-${i}`}
          points={[0, i, width, i]}
          stroke="#E0E0E0"
          strokeWidth={0.5}
          pointerEvents="none"
        />
      );
    }

    return lines;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-gray-600">{question.canvas.elements.length} éléments</p>
      <Stage
        ref={stageRef}
        width={question.canvas.width}
        height={question.canvas.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleCanvasClick}
        className="border-2 border-blue-300 rounded-lg bg-white cursor-crosshair"
      >
        <Layer>
          {renderGrid()}
          {question.canvas.elements.map(renderElement)}
          {renderLabels()}
          {question.interactionType === 'draw' && drawingPoints.length > 1 && (
            <Line
              points={drawingPoints.flatMap((p) => [p.x, p.y])}
              stroke="#FF6B6B"
              strokeWidth={2}
              fill="transparent"
              pointerEvents="none"
            />
          )}
        </Layer>
      </Stage>
      <div className="text-xs text-gray-500 text-center">
        {question.interactionType === 'click' && 'Cliquez sur les éléments'}
        {question.interactionType === 'draw' && 'Dessinez pour tracer'}
        {question.interactionType === 'select' && 'Sélectionnez les éléments'}
      </div>
    </div>
  );
};

export default GeometryCanvas;
