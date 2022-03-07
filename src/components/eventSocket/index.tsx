import useWebSocket from 'react-use-websocket';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { useStopwatch } from 'react-timer-hook';

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const EventsSocket = (props: any) => {
  const {
    type = null,
    uuid = null,
    time = 10,
    onEvent = () => {},
    onConnect = () => {},
    onDisconnect = () => {},
    onError = () => {},
  } = props;

  const token = useSelector((state) => get(state, 'userState.accessToken'));
  const { seconds, reset } = useStopwatch({ autoStart: true });
  const prevUuid = usePrevious(uuid);

  const shouldSocketReconnect = () => {
    return true;
  };

  const sendEvent = (uuid: any, t: any) => {
    if (uuid) {
      sendMessage(
        JSON.stringify({
          type,
          uuid,
          time: t,
        })
      );
      reset();
    }
  };

  const onMessage = (message: any) => {
    try {
      onEvent(JSON.parse(get(message, 'data')));
    } catch (e) {
      onEvent(null);
    }
  };

  useEffect(() => {
    if (uuid) {
      sendEvent(prevUuid, seconds);
    }
  }, [uuid]);
  console.log('@@@', process.env.REACT_APP_WSS_HOST);
  const { sendMessage } = useWebSocket(`${process.env.REACT_APP_WSS_HOST}`, {
    onOpen: onConnect,
    onClose: onDisconnect,
    onError,
    onMessage,
    shouldReconnect: shouldSocketReconnect,
    protocols: token,
    retryOnError: true,
    // queryParams: getParams(),
  });

  useEffect(() => {
    if (seconds === time) {
      sendEvent(uuid, time);
    }
  }, [seconds]);

  return <></>;
};

export default EventsSocket;
