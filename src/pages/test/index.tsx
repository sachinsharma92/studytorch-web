import React, { useRef, useState } from 'react';

import { Popover } from 'react-text-selection-popover';

export default function Example() {
  const [ref, setRef] = useState<HTMLElement>();
  console.log('=====>ref', ref);
  return (
    <div>
      <h1>
        <pre>react-text-selection-popover</pre>
      </h1>
      <p>This is an example using react-text-selection-popover</p>

      <p ref={(el) => el != null && setRef(el)}>
        <pre>
          ===== Select any text here and you'll see what I mean Select any text
          here and you'll see what I mean Select any text here and you'll see
          what I mean Select any text here and you'll see what I mean Select any
          text here and you'll see what I mean Select any text here and you'll
          see what I mean Select any text here and you'll see what I mean Select
          any text here and you'll see what I mean Select any text here and
          you'll see what I mean =============
        </pre>
      </p>
      <Popover
        target={ref}
        render={({ clientRect, isCollapsed, textContent }) => {
          if (clientRect == null || isCollapsed) return null;

          return (
            <div
              style={{
                position: 'absolute',
                left: `${clientRect.left + clientRect.width / 2}px`,
                top: `${clientRect.top - 40}px`,
                marginLeft: '-75px',
                width: '150px',
                background: 'blue',
                fontSize: '0.7em',
                pointerEvents: 'none',
                textAlign: 'center',
                color: 'white',
                borderRadius: '3px',
              }}
            >
              Selecting {(textContent || '').length} characters
            </div>
          );
        }}
      />
    </div>
  );
}
