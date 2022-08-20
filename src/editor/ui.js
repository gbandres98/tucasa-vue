import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";
let uiTexture;
let createContainerButton;
let deleteContainerButton;
let switchIndoorButton;
let createWallButton;
let deleteWallButton;
let floorUpButton;
let floorDownButton;
let placeFurnitureButton;
export const createUI = () => {
    uiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true);
    uiTexture.idealWidth = 1080;
};
export const switchToIndoorUI = (onStartWallCreation, onEndWallCreation, onStartWallDeletion, onEndWallDeletion, onFloorUp, onFloorDown, onPlaceFurniture) => {
    deleteOutdoorUI();
    createIndoorUI(onStartWallCreation, onEndWallCreation, onStartWallDeletion, onEndWallDeletion, onFloorUp, onFloorDown, onPlaceFurniture);
};
const createOutdoorUI = (onCreateContainer, onDeleteContainer, onSwitchToIndoorEditor) => {
    createContainerButton = createButton(0, "add", "createContainerButton", onCreateContainer);
    deleteContainerButton = createButton(1, "delete", "deleteContainerButton", onDeleteContainer);
    switchIndoorButton = createButton(2, "2", "switchIndoorButton", onSwitchToIndoorEditor);
    uiTexture.addControl(createContainerButton);
    uiTexture.addControl(deleteContainerButton);
    uiTexture.addControl(switchIndoorButton);
};
const createIndoorUI = (onStartWallCreation, onEndWallCreation, onStartWallDeletion, onEndWallDeletion, onFloorUp, onFloorDown, onPlaceFurniture) => {
    createWallButton = createButton(0, "add", "createWallButton", onStartWallCreation);
    deleteWallButton = createButton(1, "delete", "deleteWallButton", onStartWallDeletion);
    floorUpButton = createButton(2, "up", "floorUpButton", onFloorUp);
    floorDownButton = createButton(3, "down", "floorDownButton", onFloorDown);
    placeFurnitureButton = createButton(4, "f", "placeFurnitureButton", onPlaceFurniture);
    uiTexture.addControl(createWallButton);
    uiTexture.addControl(deleteWallButton);
    uiTexture.addControl(floorUpButton);
    uiTexture.addControl(floorDownButton);
    uiTexture.addControl(placeFurnitureButton);
};
const deleteOutdoorUI = () => {
    createContainerButton.dispose();
    deleteContainerButton.dispose();
    switchIndoorButton.dispose();
};
const createButton = (index, text, id, f, enabled = true) => {
    const button = Button.CreateSimpleButton(id, text);
    button.width = "40px";
    button.height = "40px";
    button.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
    button.leftInPixels = index * 40;
    button.onPointerUpObservable.add(f);
    button.isEnabled = enabled;
    return button;
};
export const createContainerUI = (
// eslint-disable-next-line @typescript-eslint/no-unused-vars
container, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
onContainerDelete, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
onContainerRotate, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
onContainerUp, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
onContainerDown) => {
    return;
    // if (onContainerDelete) {
    //   const deleteButton = Button.CreateSimpleButton(
    //     `delete-${container.mesh.id}`,
    //     "d"
    //   );
    //   deleteButton.width = "20px";
    //   deleteButton.height = "20px";
    //   deleteButton.onPointerDownObservable.add(onContainerDelete);
    //
    //   uiTexture.addControl(deleteButton);
    //
    //   deleteButton.linkWithMesh(container.mesh);
    //
    //   container.uiControls.push(deleteButton);
    // }
    //
    // if (onContainerRotate) {
    //   const rotateButton = Button.CreateSimpleButton(
    //     `rotate-${container.mesh.id}`,
    //     "r"
    //   );
    //   rotateButton.width = "20px";
    //   rotateButton.height = "20px";
    //   rotateButton.onPointerDownObservable.add(onContainerRotate);
    //
    //   uiTexture.addControl(rotateButton);
    //
    //   rotateButton.linkWithMesh(container.mesh);
    //   rotateButton.linkOffsetX = 20;
    //
    //   container.uiControls.push(rotateButton);
    // }
    //
    // if (onContainerUp) {
    //   const upButton = Button.CreateSimpleButton(`up-${container.mesh.id}`, "up");
    //   upButton.width = "20px";
    //   upButton.height = "20px";
    //   upButton.onPointerDownObservable.add(onContainerUp);
    //
    //   uiTexture.addControl(upButton);
    //
    //   upButton.linkWithMesh(container.mesh);
    //   upButton.linkOffsetX = 40;
    //   upButton.linkOffsetY = -10;
    //
    //   container.uiControls.push(upButton);
    // }
    //
    // if (onContainerDown) {
    //   const downButton = Button.CreateSimpleButton(
    //     `down-${container.mesh.id}`,
    //     "down"
    //   );
    //   downButton.width = "20px";
    //   downButton.height = "20px";
    //   downButton.onPointerDownObservable.add(onContainerDown);
    //
    //   uiTexture.addControl(downButton);
    //
    //   downButton.linkWithMesh(container.mesh);
    //   downButton.linkOffsetX = 40;
    //   downButton.linkOffsetY = 10;
    //
    //   container.uiControls.push(downButton);
    // }
};
export const deleteContainerUI = (container) => {
    container.uiControls.forEach((control) => control.dispose());
};
//# sourceMappingURL=ui.js.map