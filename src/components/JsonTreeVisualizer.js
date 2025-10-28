import React, { useState, useEffect, useCallback, useMemo } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  useReactFlow,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

const JsonTreeVisualizer = ({
  jsonData,
  searchPath,
  onSearchResult,
  onCopyPath,
  isDarkMode,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);
  const { fitView } = useReactFlow();


  const getNodeColor = useCallback((value, isRoot = false) => {
    if (isRoot) return "#8b5cf6";
    if (Array.isArray(value)) return "#06b6d4";
    if (typeof value === "object" && value !== null) return "#10b981";
    return "#f59e0b";
  }, []);

  const convertJsonToFlow = useCallback(
    (data) => {
      const nodes = [];
      const edges = [];

      const createNode = (id, label, x, y, value, isRoot = false) => {
        const nodeColor = getNodeColor(value, isRoot);
        return {
          id,
          type: "default",
          position: { x, y },
          data: {
            label,
            path: id,
            value,
            nodeColor,
          },
          style: {
            background: "transparent",
            border: "none",
            width: "auto",
            height: "auto",
          },
        };
      };

      const createEdge = (source, target) => ({
        id: `edge-${source}-${target}`,
        source,
        target,
        sourceHandle: "bottom",
        targetHandle: "top",
        animated: false,
        style: {
          stroke: isDarkMode ? "#000000" : "#374151",
          strokeWidth: isDarkMode ? 3 : 2,
          strokeOpacity: isDarkMode ? 0.9 : 1,
        },
        markerEnd: {
          type: "arrowclosed",
          color: isDarkMode ? "#000000" : "#374151",
          width: 14,
          height: 14,
        },
      });

      nodes.push(createNode("user", "user", 400, 50, data.user, true));

      nodes.push(createNode("user.id", "id", 200, 200, data.user.id));
      nodes.push(createNode("user.name", "name", 600, 200, data.user.name));

      edges.push(createEdge("user", "user.id"));
      edges.push(createEdge("user", "user.name"));

      nodes.push(createNode("user.id.value", data.user.id, 200, 350, data.user.id));
      nodes.push(createNode("user.items", "items", 200, 500, data.user.items));

      edges.push(createEdge("user.id", "user.id.value"));
      edges.push(createEdge("user.id.value", "user.items"));

      nodes.push(createNode("user.items.0", "0", 100, 650, data.user.items[0]));
      nodes.push(createNode("user.items.1", "1", 300, 650, data.user.items[1]));

      edges.push(createEdge("user.items", "user.items.0"));
      edges.push(createEdge("user.items", "user.items.1"));

      nodes.push(createNode("user.address.city", "city", 500, 350, data.user.address.city));
      nodes.push(createNode("user.address.country", "country", 700, 350, data.user.address.country));

      edges.push(createEdge("user.name", "user.address.city"));
      edges.push(createEdge("user.name", "user.address.country"));

      nodes.push(createNode("user.address.city.value", data.user.address.city, 500, 500, data.user.address.city));

      edges.push(createEdge("user.address.city", "user.address.city.value"));

      return { nodes, edges };
    },
    [getNodeColor, isDarkMode]
  );

  useEffect(() => {
    if (!jsonData || Object.keys(jsonData).length === 0) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const { nodes: newNodes, edges: newEdges } = convertJsonToFlow(jsonData);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [jsonData, convertJsonToFlow, setNodes, setEdges]);

  useEffect(() => {
    if (!searchPath) {
      setHighlightedNodeId(null);
      onSearchResult(null);
      return;
    }

    let targetNode = nodes.find((node) => {
      const nodePath = node.data.path;
      let cleanSearchPath = searchPath;
      
      if (searchPath.startsWith("$.")) {
        cleanSearchPath = searchPath.slice(2);
      } else if (searchPath.startsWith("$")) {
        cleanSearchPath = searchPath.slice(1);
      }
      
      if (nodePath.endsWith('.value') && nodePath.startsWith(cleanSearchPath)) {
        return true;
      }
      
      return false;
    });

    if (!targetNode) {
      targetNode = nodes.find((node) => {
        const nodePath = node.data.path;
        let cleanSearchPath = searchPath;
        
        if (searchPath.startsWith("$.")) {
          cleanSearchPath = searchPath.slice(2);
        } else if (searchPath.startsWith("$")) {
          cleanSearchPath = searchPath.slice(1);
        }
        
        const nodePathWithoutDot = nodePath.startsWith(".") ? nodePath.slice(1) : nodePath;
        const searchPathWithoutDot = cleanSearchPath.startsWith(".") ? cleanSearchPath.slice(1) : cleanSearchPath;
        
        return nodePath === cleanSearchPath || 
               nodePath === searchPathWithoutDot ||
               nodePathWithoutDot === cleanSearchPath ||
               nodePathWithoutDot === searchPathWithoutDot;
      });
    }

    if (targetNode) {
      setHighlightedNodeId(targetNode.id);
      onSearchResult(true);

      setTimeout(() => {
        fitView({
          nodes: [{ id: targetNode.id }],
          duration: 500,
          padding: 0.1,
        });
      }, 100);
    } else {
      setHighlightedNodeId(null);
      onSearchResult(false);
    }
  }, [searchPath, nodes, onSearchResult, fitView]);

  const nodesWithHighlight = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      style: {
        ...node.style,
        opacity: highlightedNodeId && highlightedNodeId !== node.id ? 0.3 : 1,
      },
    }));
  }, [nodes, highlightedNodeId]);

  const NodeComponent = useCallback(({ data, id }) => {
    const isHighlighted = highlightedNodeId === id;
    const isRoot = data.path.split(".").length === 1;
    
    return (
      <div
        className={`transition-all duration-300 cursor-pointer hover:opacity-80 ${
          isHighlighted ? "animate-pulse scale-110" : ""
        }`}
        onClick={() => onCopyPath(data.path)}
        title={`Path: ${data.path}`}
        style={{
          background: isHighlighted ? "#ef4444" : data.nodeColor,
          color: "white",
          borderRadius: isRoot ? "16px" : "12px",
          padding: isRoot ? "12px 20px" : "10px 16px",
          fontSize: isRoot ? "14px" : "13px",
          fontWeight: isRoot ? "700" : "600",
          minWidth: isRoot ? "100px" : "80px",
          textAlign: "center",
          boxShadow: isDarkMode
            ? "0 6px 12px rgba(255, 255, 255, 0.2)"
            : "0 6px 12px rgba(0, 0, 0, 0.2)",
          border: isHighlighted ? "3px solid #ffffff" : isRoot ? "3px solid rgba(255,255,255,0.3)" : "2px solid rgba(255,255,255,0.2)",
          position: "relative",
        }}
      >
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          style={{
            background: isDarkMode ? "#ffffff" : "#374151",
            border: "2px solid",
            borderColor: isHighlighted ? "#ef4444" : data.nodeColor,
            width: "12px",
            height: "12px",
          }}
        />
        
        <Handle
          type="source"
          position={Position.Bottom}
          id="bottom"
          style={{
            background: isDarkMode ? "#ffffff" : "#374151",
            border: "2px solid",
            borderColor: isHighlighted ? "#ef4444" : data.nodeColor,
            width: "12px",
            height: "12px",
          }}
        />
        
        {data.label}
      </div>
    );
  }, [highlightedNodeId, isDarkMode, onCopyPath]);


  const nodeTypes = useMemo(
    () => ({
      default: NodeComponent,
    }),
    [NodeComponent]
  );

  if (!jsonData || Object.keys(jsonData).length === 0) {
    return (
      <div
        className={`flex items-center justify-center h-full ${
          isDarkMode ? "text-white" : "text-gray-500"
        }`}
      >
        <div className="text-center">
          <div className="text-4xl mb-4">🌳</div>
          <p>No JSON data to visualize</p>
          <p className="text-sm mt-2">
            Enter JSON data in the input field to see the tree
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodesWithHighlight}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        className={isDarkMode ? "dark" : ""}
      >
        <Controls position="top-right" showInteractive={false} />
        <MiniMap
          position="bottom-right"
          nodeColor={(node) => {
            if (highlightedNodeId === node.id) return "#ef4444";
            return getNodeColor(
              node.data.value,
              node.data.path.split(".").length === 1
            );
          }}
          className={isDarkMode ? "dark" : ""}
        />
        <Background
          color={isDarkMode ? "#374151" : "#f3f4f6"}
          gap={20}
          size={1}
        />
      </ReactFlow>
    </div>
  );
};

export default JsonTreeVisualizer;
