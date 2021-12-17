import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

export default function SearchPrimary(props: any) {
  return (
    <div className={`search-primary ${props.searchStyle}`}>
     <Search placeholder="Search WorkSpace" />
    </div>
  )
}
