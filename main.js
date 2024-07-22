import { FloatingTab, MobileTaskbar } from "./src/ui/Containers";

const fb = FloatingTab();
const tb = MobileTaskbar();

export function UIElements() {
  let elements = {};
  elements.fb = fb;

  console.log(elements);
  return elements;
}
