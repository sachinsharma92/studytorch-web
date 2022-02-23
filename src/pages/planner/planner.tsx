import { useEffect, useState } from 'react';
import { Button, PageHeader, Spin, Drawer, message } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import moment from 'moment';
import get from 'lodash/get';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import { useDispatch } from 'react-redux';
import PlanAddModal from '../../components/planner/modals/planAddModal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  fetchUserCalendar,
  deleteUserCalendar,
} from '../../redux/actions/UserCalendarAction';
// Images
import folderGray from '../../assets/images/icons/folder-gray.svg';
import PlanDetails from '../../components/planner/planDetails';
import { DELETE_CALENDAR_PLAN_SUCCESS } from '../../constants/messages';
// Styles
import './styles.scss';

const localizer = momentLocalizer(moment);

function PlannerScreen(props: any) {
  const [isPlannerAddModal, setIsPlannerAddModal] = useState({
    visible: false,
    data: null,
  });
  const [dateFilter, setDateFilter] = useState({
    start_date: moment().startOf('month').format('YYYY-MM-DD'),
    end_date: moment().endOf('month').format('YYYY-MM-DD'),
  });
  const [plans, setPlans] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [planDetail, setPlanDetail] = useState({
    visible: false,
    data: null,
  });

  const togglePlanDetails = (data = null) => {
    setPlanDetail({
      visible: !get(planDetail, 'visible'),
      data,
    });
  };

  const dispatch = useDispatch();
  const plannerAddToggleModal = (data = null) => {
    setIsPlannerAddModal({
      visible: !get(isPlannerAddModal, 'visible'),
      data,
    });
  };

  const getUserCalendar = (query: any) => {
    setLoading(true);

    dispatch(fetchUserCalendar(query))
      .then((result: any) => {
        const transformedPlans = map(result, (plan) => {
          return {
            id: get(plan, 'id'),
            title: get(plan, 'title'),
            start: moment(
              `${get(plan, 'date')} ${get(plan, 'start_time')}`,
              'YYYY-MM-DD HH:mm'
            ).toDate(),
            end: moment(
              `${get(plan, 'date')} ${get(plan, 'end_time')}`,
              'YYYY-MM-DD HH:mm'
            ).toDate(),
            color: get(plan, 'color'),
            ...plan,
          };
        });
        setPlans(transformedPlans);
        setDateFilter({
          ...query,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onDeletePlan = (id: any) => {
    setLoading(true);
    dispatch(deleteUserCalendar(id))
      .then(() => {
        togglePlanDetails();
        getUserCalendar(dateFilter);
        message.success(DELETE_CALENDAR_PLAN_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserCalendar(dateFilter);
  }, []);

  return (
    <PrimaryLayout>
      <div className="planner-page-style">
        <Spin spinning={loading}>
          <PageHeader
            className="site-page-header header-back"
            title="Planner"
            extra={[
              <Button
                onClick={() => {
                  plannerAddToggleModal();
                }}
                shape="round"
                size="large"
                type="primary"
              >
                <PlusSquareOutlined />
                Add
              </Button>,
            ]}
          />

          {props.collectionData ? (
            <div className="state-center">
              <EmptyState
                imgUrl={folderGray}
                title="Create your Collection"
                description=" Your Collection can be the folder underwhich all the study material is kept"
                buttonText="Add Collection"
                buttonType="primary"
              />
            </div>
          ) : (
            <div className="calendar-section">
              <Calendar
                localizer={localizer}
                views={['month', 'week', 'day']}
                events={plans}
                onSelectEvent={(event) => {
                  togglePlanDetails(event);
                }}
                onRangeChange={(slotInfo) => {
                  if (isArray(slotInfo) && slotInfo.length > 1) {
                    getUserCalendar({
                      // @ts-ignore: Unreachable code error
                      start_date: `${get(slotInfo, '0').getFullYear()}-${
                        // @ts-ignore: Unreachable code error
                        get(slotInfo, '0').getMonth() + 1
                        // @ts-ignore: Unreachable code error
                      }-${get(slotInfo, '0').getDate()}`,
                      // @ts-ignore: Unreachable code error
                      end_date: `${get(slotInfo, '6').getFullYear()}-${
                        // @ts-ignore: Unreachable code error
                        get(slotInfo, '6').getMonth() + 1
                        // @ts-ignore: Unreachable code error
                      }-${get(slotInfo, '6').getDate()}`,
                    });
                    return;
                  }
                  if (isArray(slotInfo)) {
                    getUserCalendar({
                      // @ts-ignore: Unreachable code error
                      start_date: `${get(slotInfo, '0').getFullYear()}-${
                        // @ts-ignore: Unreachable code error
                        get(slotInfo, '0').getMonth() + 1
                        // @ts-ignore: Unreachable code error
                      }-${get(slotInfo, '0').getDate()}`,
                      // @ts-ignore: Unreachable code error
                      end_date: `${get(slotInfo, '0').getFullYear()}-${
                        // @ts-ignore: Unreachable code error
                        get(slotInfo, '0').getMonth() + 1
                        // @ts-ignore: Unreachable code error
                      }-${get(slotInfo, '0').getDate()}`,
                    });
                  } else {
                    getUserCalendar({
                      // @ts-ignore: Unreachable code error
                      start_date: `${get(slotInfo, 'start').getFullYear()}-${
                        // @ts-ignore: Unreachable code error
                        get(slotInfo, 'start').getMonth() + 1
                        // @ts-ignore: Unreachable code error
                      }-${get(slotInfo, 'start').getDate()}`,
                      // @ts-ignore: Unreachable code error
                      end_date: `${get(slotInfo, 'end').getFullYear()}-${
                        // @ts-ignore: Unreachable code error
                        get(slotInfo, 'end').getMonth() + 1
                        // @ts-ignore: Unreachable code error
                      }-${get(slotInfo, 'end').getDate()}`,
                    });
                  }
                }}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                eventPropGetter={(event) => {
                  return { style: { backgroundColor: get(event, 'color') } };
                }}
              />
            </div>
          )}
        </Spin>
      </div>

      {/* Questions Modal */}
      {get(isPlannerAddModal, 'visible') && (
        <PlanAddModal
          visible={get(isPlannerAddModal, 'visible')}
          edit={get(isPlannerAddModal, 'data') ? true : false}
          initialValues={get(isPlannerAddModal, 'data')}
          addHandler={plannerAddToggleModal}
          onSuccess={() => {
            plannerAddToggleModal();
            getUserCalendar(dateFilter);
          }}
          cancelHandler={plannerAddToggleModal}
          onCancel={plannerAddToggleModal}
        />
      )}

      <Drawer
        width={450}
        closable={false}
        onClose={() => {
          togglePlanDetails();
        }}
        maskClosable={true}
        visible={get(planDetail, 'visible')}
      >
        <PlanDetails
          plan={get(planDetail, 'data')}
          onDeletePlan={onDeletePlan}
          onClickEdit={(plan: any) => {
            togglePlanDetails();
            plannerAddToggleModal(plan);
          }}
        />
      </Drawer>
    </PrimaryLayout>
  );
}

export default PlannerScreen;
