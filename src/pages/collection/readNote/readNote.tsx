import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
import map from 'lodash/map';
import { Button, Breadcrumb, Tag, Spin } from 'antd';
import { fetchNoteDetails } from '../../../redux/actions/noteActions';
import EventsSocket from '../../../components/eventSocket';
import PrimaryLayout from '../../../common/primaryLayout/primaryLayout';
import iconArrowLeft from '../../../assets/images/icons/caret-Left.svg';

// Images

// Styles
import './styles.scss';

function ReadNoteScreen(props: any) {
  const [note, setNote] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getNote = () => {
    setLoading(true);
    dispatch(fetchNoteDetails(id))
      .then((result: any) => {
        setLoading(false);
        setNote(result);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNote();
  }, []);

  return (
    <PrimaryLayout>
      <Spin spinning={loading}>
        {get(note, 'id') && (
          <EventsSocket time={30} type="note" uuid={get(note, 'id')} />
        )}
        <div className="read-note-style">
          <div className="action-section">
            <div className="top-button-section">
              <Button className="btn-outline" onClick={() => navigate(-1)}>
                <img src={iconArrowLeft} alt="" /> Back
              </Button>
            </div>

            <Breadcrumb>
              <Breadcrumb.Item>Adding in Collections</Breadcrumb.Item>
              <Breadcrumb.Item>{get(note, 'collection.name')}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="view-section">
            <h1 className="title1">{get(note, 'title')}</h1>
            <div className="tag-section">
              {map(get(note, 'tags', []), (t, i) => (
                <Tag className="tag-style" key={i}>
                  {t}
                </Tag>
              ))}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: get(note, 'description', '<></>'),
              }}
            ></div>
            {/* {get(note, 'description')} */}
          </div>
        </div>
      </Spin>
    </PrimaryLayout>
  );
}

export default ReadNoteScreen;
