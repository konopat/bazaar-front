/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, { width: 400, height: 300 });

figma.ui.onmessage = async (msg: { type: string }) => {
  if (msg.type === 'get-selection') {
    const selection = figma.currentPage.selection;
    const selectionData = selection.map((node: SceneNode) => ({
      id: node.id,
      name: node.name,
      type: node.type,
      x: node.x,
      y: node.y,
      width: 'width' in node ? node.width : null,
      height: 'height' in node ? node.height : null,
    }));
    
    figma.ui.postMessage({
      type: 'selection-data',
      data: selectionData
    });
  }
}; 