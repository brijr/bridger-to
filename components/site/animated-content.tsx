import { Children, isValidElement } from "react";

export function AnimatedContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return (
            <div
              key={index}
              className="blur-entrance-content"
              style={{
                animationDelay: `${0.25 + index * 0.25}s`,
              }}
            >
              {child}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
}
