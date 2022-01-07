import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

const { Search } = Input;

export default function SearchPrimary(props: any) {
  return (
    <>
      {props.clickable ?
        <div className={`search-primary ${props.searchStyle}`}>
          <Search placeholder="Search WorkSpace" />
        </div>
        :
        <Button onClick={props.onClick} className={`search-btn-primary ${props.searchStyle}`} icon={<SearchOutlined />}>Search WorkSpace</Button>
      }
    </>
  )
}
