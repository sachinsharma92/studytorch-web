import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import get from 'lodash/get';
import moment from 'moment';
import { PageHeader, Table, Spin, Avatar } from 'antd';
import { getNameAvatar } from '../../../utilities/helpers';
import { avatarColors } from '../../../constants/groups';

import PrimaryLayout from '../../../common/primaryLayout/primaryLayout';

import { fetchGroupQuizDetails } from '../../../redux/actions/groupActions';

// Styles
import './styles.scss';

const columns = [
  {
    title: 'Rank',
    key: 'rank',
    render: (record: any, t: any, index: any) => `${index + 1}`,
  },
  {
    title: 'Member',
    key: 'member',
    render: (record: any, t: any, index: any) => (
      <div className="name-section">
        {get(record, 'user.image') ? (
          <Avatar src={get(record, 'user.image_url')} />
        ) : (
          getNameAvatar(get(record, 'user.name'), 30, avatarColors[index % 4])
        )}
        <span className="name">{get(record, 'user.name')}</span>
      </div>
    ),
  },
  {
    title: 'Score',
    key: 'score',
    render: (record: any, index: any) =>
      get(record, 'status.value') === 1 ? get(record, 'correct_answer') : 'Nil',
  },
  {
    title: 'Time',

    key: 'time',
    render: (record: any, index: any) =>
      get(record, 'status.value') === 1 ? (
        '20:00'
      ) : (
        <div className="text-not-taken">Not Taken</div>
      ),
  },
  {
    title: 'Taken on',
    key: 'takenOn',
    render: (record: any, index: any) =>
      get(record, 'status.value') === 1
        ? moment(get(record, 'updated_at'), 'YYYY-MM-DD HH:mm:ss').format(
            'DD / MM/ YYYY'
          )
        : '--',
  },
];

const data = [
  {
    key: '1',
    rank: '1',
    member: (
      <div className="name-section">
        <Avatar>GS</Avatar>
        <span className="name">Gwen Stefancy</span>
      </div>
    ),
    score: '5000',
    time: '20:00',
    takenOn: '08 / 11 / 2021',
  },
  {
    key: '2',
    rank: '2',
    member: (
      <div className="name-section">
        <Avatar>GS</Avatar>
        <span className="name">Gwen Stefancy</span>
      </div>
    ),
    score: '5000',
    time: '20:00',
    takenOn: '08 / 11 / 2021',
  },
  {
    key: '3',
    rank: '3',
    member: (
      <div className="name-section">
        <Avatar>GS</Avatar>
        <span className="name">Gwen Stefancy</span>
      </div>
    ),
    score: 'Nil',
    time: '20:00',
    takenOn: '08 / 11 / 2021',
  },
  {
    key: '4',
    rank: '#',
    member: (
      <div className="name-section">
        <Avatar>GS</Avatar>
        <span className="name">Gwen Stefancy</span>
      </div>
    ),
    score: '5000',
    time: <div className="text-not-taken">Not Taken</div>,
    takenOn: '08 / 11 / 2021',
  },
  {
    key: '5',
    rank: '#',
    member: (
      <div className="name-section">
        <Avatar>GS</Avatar>
        <span className="name">Gwen Stefancy</span>
      </div>
    ),
    score: '5000',
    time: <div className="text-not-taken">Not Taken</div>,
    takenOn: 'Nil',
  },
];

function ScoreDetailScreen(props: any) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [groupQuizDetails, setGroupQuizDetails] = useState(null);
  const dispatch = useDispatch();

  const { id, gid } = useParams();

  const getGroupQuizDetails = () => {
    setLoading(true);
    dispatch(fetchGroupQuizDetails(gid, id))
      .then((result: any) => {
        setGroupQuizDetails(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getGroupQuizDetails();
  }, []);

  return (
    <PrimaryLayout>
      <Spin spinning={loading}>
        <div className="score-page-style">
          <PageHeader
            className="site-page-header header-back"
            onBack={() => navigate(-1)}
            title={
              <div className="title-top">
                Score Details of <span>{get(groupQuizDetails, 'name')}</span>
              </div>
            }
          />

          <div className="table-section">
            <Table
              columns={columns}
              dataSource={get(groupQuizDetails, 'quizzess')}
            />
          </div>
        </div>
      </Spin>
    </PrimaryLayout>
  );
}

export default ScoreDetailScreen;
