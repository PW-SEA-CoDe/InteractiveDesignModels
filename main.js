import { FloatingTab, Taskbar } from "./src/ui/Containers";

export function UIElements() {
  let elements = {};
  elements.fb = FloatingTab();
  elements.tb = Taskbar();

  console.log(elements);
  return elements;
}
