import { Button, Modal, Carousel } from 'antd';
import ButtonCustom from '../../../common/buttons/buttonCustom';
import map from 'lodash/map';
// Images
import light from '../../../assets/images/icons/light.svg';

// Styles
import './styles.scss';
import { useState } from 'react';

function RevisionModeModal(props: any) {
  const { flashCards } = props;
  const settings = {
    nextArrow: (
      <h2>
        <span>Next</span>
      </h2>
    ),
    prevArrow: (
      <h2>
        <span>Skip</span>
      </h2>
    ),
  };

  const [isBlurActive, setIsBlurActive] = useState(false);

  const toggleBlur = () => {
    setIsBlurActive(!isBlurActive);
  };

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="revision-mode-modal primary-modal-style"
      maskStyle={{ background: 'white' }}
    >
      <div className="top-button-section">
        <h3 className="title3">Revision Mode</h3>
        <Button onClick={props.closeHandler} className="btn-outline">
          X Close
        </Button>
      </div>
      <div className="slider-arrow">
        <Carousel autoplay={false} arrows {...settings}>
          {map(flashCards, (item: any) => (
            <div>
              <div className="card-modal">
                <div className="main-content-section">
                  <div className="icon-circle">
                    <img src={light} alt="" />
                  </div>
                  <h2 className="title2">{item.title}</h2>
                  <p
                    className={`description ${
                      !isBlurActive ? 'blur' : 'unblur'
                    }`}
                  >
                    {item.description}
                  </p>
                  <ButtonCustom
                    type="primary"
                    size="small"
                    onClick={toggleBlur}
                    title={!isBlurActive ? 'Tap to Reveal' : 'Unhide'}
                  />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </Modal>
  );
}

export default RevisionModeModal;
