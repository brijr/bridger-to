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
                animationDelay: `${300 + index * 300}ms`,
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
