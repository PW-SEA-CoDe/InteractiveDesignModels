import { FloatingTab, MobileTaskbar } from "./src/ui/Containers";

export function UIElements() {
  let elements = {};
  elements.fb = FloatingTab();
  elements.tb = MobileTaskbar();

  console.log(elements);
  return elements;
}
