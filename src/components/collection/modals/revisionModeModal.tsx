import { Button, Modal, Carousel } from "antd";
import ButtonCustom from "../../../common/buttons/buttonCustom";
import map from "lodash/map";
import get from "lodash/get";
// Images
import light from "../../../assets/images/icons/light.svg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
// Styles
import "./styles.scss";
import { useState } from "react";

function RevisionModeModal(props: any) {
  const { notes } = props;

  const settings = {
    nextArrow: (
      <h2>
        <span>Next</span>
      </h2>
    ),
    prevArrow: (
      <h2>
        <span>Prev</span>
      </h2>
    ),
  };

  const [isBlurActive, setIsBlurActive] = useState(false);

  const toggleBlur = () => {
    setIsBlurActive(!isBlurActive);
  };

  const getNoteDescription = (note: any) => {
    if (note) {
      const t = EditorState.createWithContent(convertFromRaw(note));
      console.log("@@@@", draftToHtml(convertToRaw(t.getCurrentContent())));
      return draftToHtml(convertToRaw(t.getCurrentContent()));
    }
  };

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="revision-mode-modal primary-modal-style"
      maskStyle={{ background: "white" }}
    >
      <div className="top-button-section">
        <h3 className="title3">Revision Mode</h3>
        <Button onClick={props.closeHandler} className="btn-outline">
          X Close
        </Button>
      </div>
      <div className="slider-arrow">
        <Carousel autoplay={false} arrows {...settings}>
          {map(notes, (item: any) => {
            return (
              <div>
                <div className="card-modal">
                  <div className="main-content-section">
                    <div className="icon-circle">
                      <img src={light} alt="" />
                    </div>
                    <h2 className="title2">{item.title}</h2>
                    <p className={`description`}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getNoteDescription(get(item, "description")),
                        }}
                      ></div>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </Modal>
  );
}

export default RevisionModeModal;
