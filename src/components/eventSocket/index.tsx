import useWebSocket from 'react-use-websocket';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import get from 'lodash/get';

const EventsSocket = (props: any) => {
  const {
    type,
    id,
    url,
    onEvent = () => {},
    onConnect = () => {},
    onDisconnect = () => {},
    onError = () => {},
  } = props;

  const token = useSelector((state) => get(state, 'userState.accessToken'));
  console.log({ token });
  const shouldSocketReconnect = () => {
    return true;
  };

  const onMessage = (message: any) => {
    try {
      onEvent(JSON.parse(get(message, 'data')));
    } catch (e) {
      onEvent(null);
    }
  };

  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    'ws://localhost:4000',
    {
      onOpen: onConnect,
      onClose: onDisconnect,
      onError,
      onMessage,
      shouldReconnect: shouldSocketReconnect,
      protocols: token,
      retryOnError: true,
      // queryParams: getParams(),
    }
  );

  return (
    <Button
      onClick={() => {
        sendMessage(
          JSON.stringify({
            type: 'quiz',
            time: 30,
            uuid: 'e3c58cc2-f915-4e91-8751-bbe7c515db4e',
          }),
          true
        );
      }}
    >
      Send Message
    </Button>
  );
};

export default EventsSocket;
