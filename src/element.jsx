import React from "react";
React.createElement = (type, props, ...children) => {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        if (typeof child === "object") {
          return child;
        }
        return {
          type: "TEXT_ELEMENT",
          props: {
            nodeValue: child,
            children: [],
          },
        };
      }),
    },
  };
};
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);
export default element;
