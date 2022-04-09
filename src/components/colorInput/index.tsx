import { Input, Form, Dropdown, Button } from "antd";
import get from "lodash/get";
import { useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const ColorInput = (props: any) => {
  const { initialColor, form } = props;
  const [color, setColor] = useColor("hex", initialColor);

  const onChangeColor = (c: any) => {
    form.setFieldsValue({
      color: get(c, "hex"),
    });
    setColor(c);
  };

  useEffect(() => {
    form.setFieldsValue({
      color: initialColor,
    });
  }, []);

  const overlay = (
    <>
      <div>
        <ColorPicker
          width={456}
          height={228}
          color={color}
          onChange={onChangeColor}
          hideHSV
          dark
        />
      </div>
    </>
  );

  return (
    <Form.Item
      name="color"
      rules={[{ required: true, message: "Please select colour!" }]}
    >
      <Dropdown overlay={overlay}>
        <Input
          style={{ width: "100%" }}
          size="small"
          value={get(color, "hex")}
          onChange={() => {
            form.setFieldsValue({
              color: get(color, "hex"),
            });
          }}
          suffix={
            <Button style={{ background: get(color, "hex") }} type="text">
              {" "}
            </Button>
          }
        />
      </Dropdown>
    </Form.Item>
  );
};

export default ColorInput;
