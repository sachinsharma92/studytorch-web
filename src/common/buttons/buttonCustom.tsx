import { Button } from 'antd';

// Styles
import './styles.scss';

export default function ButtonCustom(props: any) {
  return (
    <div className={`button-custom ${props.btnContainer}`}>
      <Button
        type={props.type}
        size={props.size}
        icon={props.icon}
        onClick={props.onClick}
        className={props.className}
        href={props.href}>
        {props.title}
      </Button>
    </div>
  )
}
