// Icons here
import logoPrimary from "../../assets/images/logo-theme.svg"
import logoIcon from "../../assets/images/logo-icon.svg"

// Styles
import './styles.scss';

export default function LogoPrimary(props: any) {
  return (
    <div className={`logo-primary ${props.logoStyle}`}>
      {/* {logoColor ? <img src={logoColor} className={props.imgStyle} />
        :
        <img src={logoWhite} className={props.imgStyle} />
      } */}

      {props.logoPrimary ?
        <img src={logoPrimary} className={props.imgStyle} />
        :
        <img src={logoIcon} className={props.imgStyle} />
      }
    </div>
  )
}
