import {Col, Row,} from 'antd';

// Images
import logo from '../../assets/images/logo.svg';
import illustration from '../../assets/images/illustration.svg';

// Styles
import './styles.scss';

/** * Props * **/
interface RegisterScreenProps {
  children: any
}

function AuthLayout(props: RegisterScreenProps) {

  return (
    <div className="auth-page-style">
      <Row>
        <Col xs={24} md={10}>
          <div className="left-section">
            <img src={logo} className='logo-img' />
            <div className="content">
              <h2 className="title1">An App for your Study need you!</h2>
              <p className="description">Maybe some text here will help me see it better. Oh God. Oke, let’s do it then. </p>
            </div>

            <img src={illustration} className='illustration-img' />
          </div>
        </Col>
        <Col xs={24} md={14}>
          <div className="right-section">
            {props.children}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AuthLayout;
