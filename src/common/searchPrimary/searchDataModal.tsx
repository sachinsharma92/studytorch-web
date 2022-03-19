import { Modal, Input, Divider, List, Spin, Space, Tag } from 'antd';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { fetchGlobalSearch } from '../../redux/actions/dashboardActions';
import smallFolder from '../../assets/images/icons/folder-small.svg';
import EmptyState from '../emptyState/emptyState';
import noDataImage from '../../assets/images/study-not-data.svg';

// Styles
import './styles.scss';

const { Search } = Input;

function SearchDataModal(props: any) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<any>({
    collections: [],
    notes: [],
    groups: [],
  });
  const dispatch = useDispatch();

  const getGlobalSearch = (query: any) => {
    if (!query || isEmpty(query)) {
      setData({
        collections: [],
        notes: [],
        groups: [],
      });
      return;
    }
    setLoading(true);
    const queryObj = {
      limit: 5,
      query,
    };

    dispatch(fetchGlobalSearch(queryObj))
      .then((result: []) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onSearch = (value: any) => {
    getGlobalSearch(value);
  };

  const debouncedChangeHandler = useCallback(debounce(onSearch, 500), []);

  return (
    <Modal
      centered
      destroyOnClose
      visible={props.visible}
      footer={false}
      onCancel={props.handleCancel}
      wrapClassName="search-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <div className="modal-content-body">
            <div
              className={`search-primary ${props.searchStyle}`}
              onClick={props.onClick}
            >
              <Search
                placeholder="Search WorkSpace"
                onChange={(e) => {
                  debouncedChangeHandler(e.target.value);
                }}
              />
            </div>

            {get(data, 'collections', []).length === 0 &&
              get(data, 'notes', []).length === 0 &&
              get(data, 'groups', []).length === 0 && (
                <div style={{ marginTop: 30 }}>
                  <EmptyState
                    imgUrl={noDataImage}
                    title=""
                    description="No Data exists with search input"
                    imgStyle="empty-image"
                  />
                </div>
              )}

            {get(data, 'collections', []).length > 0 && (
              <>
                <Divider orientation="left" className="ant-list-header ">
                  Collections
                </Divider>
                <List
                  dataSource={get(data, 'collections')}
                  renderItem={(item) => (
                    <List.Item onClick={() => navigate(get(item, 'url'))}>
                      <img
                        src={smallFolder}
                        className="small-folder-icon"
                        alt=""
                      />{' '}
                      {get(item, 'name')}
                    </List.Item>
                  )}
                />
              </>
            )}
            {get(data, 'notes', []).length > 0 && (
              <>
                <Divider orientation="left">Notes</Divider>
                <List
                  dataSource={get(data, 'notes')}
                  renderItem={(item) => (
                    <List.Item onClick={() => navigate(get(item, 'url'))}>
                      <img
                        src={smallFolder}
                        className="small-folder-icon"
                        alt=""
                      />{' '}
                      <Space>
                        <>{get(item, 'title')}</>
                        <>
                          {' '}
                          {map(get(item, 'tags', []), (t, i) => (
                            <Tag className="tag-style" key={i}>
                              {t}
                            </Tag>
                          ))}
                        </>
                      </Space>
                    </List.Item>
                  )}
                />
              </>
            )}

            {get(data, 'groups', []).length > 0 && (
              <>
                <Divider orientation="left">Groups</Divider>
                <List
                  dataSource={get(data, 'groups')}
                  renderItem={(item) => (
                    <List.Item onClick={() => navigate(get(item, 'url'))}>
                      <img
                        src={smallFolder}
                        className="small-folder-icon"
                        alt=""
                      />{' '}
                      {get(item, 'name')}
                    </List.Item>
                  )}
                />
              </>
            )}
          </div>
        </div>
      </Spin>
    </Modal>
  );
}

export default SearchDataModal;
