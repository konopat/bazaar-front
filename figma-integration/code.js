"use strict";
/// <reference types="@figma/plugin-typings" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.showUI(__html__, { width: 400, height: 300 });
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'get-selection') {
        const selection = figma.currentPage.selection;
        const selectionData = selection.map((node) => ({
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
});
