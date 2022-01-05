// Icons here

// Styles
import { Button } from 'antd';
import './styles.scss';

export default function EmptyState(props: any) {
  return (
    <div className={`empty-state-primary ${props.logoStyle}`}>
      {props.imgUrl && <img src={props.imgUrl} className={props.imgStyle} />}
      {props.title && <h4 className="title4">{props.title}</h4>}
      {props.description && <p className="description">{props.description}</p>}
      {props.buttonText && <div className="button-section">
        <Button type={props.buttonType} onClick={props.buttonHandler}>{props.buttonText}</Button>
      </div>
      }
    </div>
  )
}
