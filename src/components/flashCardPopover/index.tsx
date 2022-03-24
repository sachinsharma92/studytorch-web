import { Button, Popover as NPopover } from 'antd';
import { Popover } from 'react-text-selection-popover';

import './styles.scss';

const FlashCardPopOver = (props: any) => {
  const { ref, onAddFlashCard } = props;

  return (
    <>
      <Popover
        target={ref}
        render={(obj: any) => {
          const { clientRect, isCollapsed, textContent } = obj;

          if (clientRect == null || isCollapsed) return null;
          console.log({
            left: `${clientRect.left + clientRect.width / 2}px`,
            top: `${clientRect.top - 40}px`,
          });
          return (
            <div
              className="popover-container"
              style={{
                left: `${clientRect.left + clientRect.width / 2}px`,
                top: `${clientRect.top - 40}px`,
              }}
            >
              <NPopover
                content={
                  <div className="button-section">
                    <Button
                      className="button-style"
                      type="link"
                      onClick={() => {
                        onAddFlashCard({ description: textContent });
                      }}
                    >
                      Add a flash Card
                    </Button>
                  </div>
                }
                visible={!isCollapsed}
                onVisibleChange={() => {}}
              />
            </div>
          );
        }}
      />
    </>
  );
};

export default FlashCardPopOver;
