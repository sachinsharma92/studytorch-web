import { useEffect, useState } from 'react';
import { Button, PageHeader, Spin, Drawer, message } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import moment from 'moment';
import get from 'lodash/get';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import pick from 'lodash/pick';
import { useDispatch } from 'react-redux';
import PlanAddModal from '../../components/planner/modals/planAddModal';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  fetchUserCalendar,
  deleteUserCalendar,
  updateUserCalendar,
} from '../../redux/actions/UserCalendarAction';
// Images
import folderGray from '../../assets/images/icons/folder-gray.svg';
import PlanDetails from '../../components/planner/planDetails';
import {
  DELETE_CALENDAR_PLAN_SUCCESS,
  UPDATE_CALENDAR_PLAN_SUCCESS,
} from '../../constants/messages';
import {
  getFormattedDateString,
  getFormattedTimeString,
} from '../../utilities/helpers';
// Styles
import './styles.scss';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar as any);

function PlannerScreen(props: any) {
  const [isPlannerAddModal, setIsPlannerAddModal] = useState({
    visible: false,
    data: null,
    edit: false,
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
  const plannerAddToggleModal = (data: any = null, edit = false) => {
    setIsPlannerAddModal({
      visible: !get(isPlannerAddModal, 'visible'),
      data,
      edit,
    });
  };

  const editUserCalendar = (id: any, payload: any) => {
    setLoading(true);
    dispatch(updateUserCalendar(id, payload))
      .then(() => {
        setLoading(false);
        message.success(UPDATE_CALENDAR_PLAN_SUCCESS);
        getUserCalendar(dateFilter);
      })
      .catch(() => {
        setLoading(false);
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
              `${get(plan, 'start_date')} ${get(plan, 'start_time')}`,
              'YYYY-MM-DD HH:mm'
            ).toDate(),
            end: moment(
              `${get(plan, 'end_date')} ${get(plan, 'end_time')}`,
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
  console.log({ plans });
  const now = new Date();
  now.setHours(0, 0, 0, 0);
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
              <DnDCalendar
                localizer={localizer}
                selectable
                views={['month', 'week', 'day']}
                events={plans}
                onSelectEvent={(event: any) => {
                  togglePlanDetails(event);
                }}
                onSelectSlot={(slotInfo) => {
                  if (
                    !moment(
                      getFormattedDateString(get(slotInfo, 'slots.0')),
                      'YYYY-MM-DD'
                    ).isBefore(moment().startOf('day'))
                  ) {
                    plannerAddToggleModal(
                      {
                        date: getFormattedDateString(get(slotInfo, 'slots.0')),
                      },
                      false
                    );
                  }
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
                      start_date: getFormattedDateString(get(slotInfo, '0')),
                      end_date: getFormattedDateString(get(slotInfo, '0')),
                    });
                  } else {
                    getUserCalendar({
                      start_date: getFormattedDateString(
                        get(slotInfo, 'start')
                      ),
                      end_date: getFormattedDateString(get(slotInfo, 'end')),
                    });
                  }
                }}
                onEventDrop={(eventObj) => {
                  editUserCalendar(get(eventObj, 'event.id'), {
                    ...pick(get(eventObj, 'event'), [
                      'title',
                      'description',
                      'color',
                    ]),
                    start_date: getFormattedDateString(get(eventObj, 'start')),
                    end_date: getFormattedDateString(get(eventObj, 'end')),
                    start_time: getFormattedTimeString(get(eventObj, 'start')),
                    end_time: getFormattedTimeString(get(eventObj, 'end')),
                  });
                }}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                eventPropGetter={(event) => {
                  return {
                    style: { backgroundColor: get(event, 'color') },
                  };
                }}
                dayPropGetter={(dayobj) => {
                  return {
                    style:
                      now > dayobj
                        ? {
                            pointerEvents: 'none',
                            opacity: 0.3,
                            background: '#ccc',
                          }
                        : {},
                  };
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
          edit={get(isPlannerAddModal, 'edit')}
          initialValues={get(isPlannerAddModal, 'data')}
          addHandler={() => plannerAddToggleModal()}
          onSuccess={() => {
            plannerAddToggleModal();
            getUserCalendar(dateFilter);
          }}
          cancelHandler={() => plannerAddToggleModal()}
          onCancel={() => plannerAddToggleModal()}
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
            plannerAddToggleModal(plan, true);
          }}
        />
      </Drawer>
    </PrimaryLayout>
  );
}

export default PlannerScreen;
