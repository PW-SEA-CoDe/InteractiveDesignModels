import { FloatingTab } from "./src/ui/Containers";

const fb = FloatingTab();

export function UIElements() {
  let elements = {};
  elements.fb = fb;

  console.log(elements);
  return elements;
}
