import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";

let uiTexture: AdvancedDynamicTexture;

export const createUI = (onCreateContainer: () => void) => {
  uiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI", true);
  uiTexture.idealWidth = 1080;

  createGeneralUI(onCreateContainer);
};

const createGeneralUI = (onCreateContainer: () => void) => {
  const createContainerButton = Button.CreateSimpleButton(
    "createContainerButton",
    "add"
  );
  createContainerButton.width = "40px";
  createContainerButton.height = "40px";
  createContainerButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  createContainerButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

  createContainerButton.onPointerUpObservable.add(onCreateContainer);

  uiTexture.addControl(createContainerButton);
};
