import useWebSocket from "react-use-websocket";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import assign from "lodash/assign";
import { useStopwatch } from "react-timer-hook";

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

  const token = useSelector((state) => get(state, "userState.accessToken"));
  const { seconds, reset } = useStopwatch({ autoStart: true });

  const secondRef = useRef();

  const shouldSocketReconnect = () => {
    return true;
  };

  useEffect(() => {
    assign(secondRef, { current: seconds });
  }, [seconds]);

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
      onEvent(JSON.parse(get(message, "data")));
    } catch (e) {
      onEvent(null);
    }
  };

  useEffect(() => {
    return () => {
      sendEvent(uuid, secondRef.current);
    };
  }, [uuid]);

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

  return <>{seconds}</>;
};

export default EventsSocket;
