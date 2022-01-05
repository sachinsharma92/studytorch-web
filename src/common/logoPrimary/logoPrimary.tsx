// Icons here
import logoColor from "../../assets/images/logo-theme.svg"
import logoWhite from "../../assets/images/logo.svg"

// Styles
import './styles.scss';

export default function LogoPrimary(props: any) {
  return (
    <div className={`logo-primary ${props.logoStyle}`}>
      {logoColor ? <img src={logoColor} className={props.imgStyle} />
        :
        <img src={logoWhite} className={props.imgStyle} />
      }
    </div>
  )
}
