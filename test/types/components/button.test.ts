import { Button, type ButtonProps } from "../../../src/button.js";

const responsiveSize: ButtonProps = {
  children: "Responsive action",
  size: { initial: "md", lg: "xl" },
};

const sparseResponsiveSize: ButtonProps = {
  children: "Sparse responsive action",
  size: { lg: "xl" },
};

const emptyResponsiveSize: ButtonProps = {
  children: "Invalid responsive action",
  // @ts-expect-error responsive objects require at least one value
  size: {},
};

void Button;
void responsiveSize;
void sparseResponsiveSize;
void emptyResponsiveSize;
