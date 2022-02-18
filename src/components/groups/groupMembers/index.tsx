import { useState } from 'react';
import { Button } from 'antd';
import GroupMemberModal from '../modals/groupMemberModal';
import User from '../../../assets/images/icons/user.svg';

const GroupMembers = (props: any) => {
  const { groupDetails } = props;
  const [groupMemberModal, setGroupMemberModal] = useState(false);
  const toggleGroupMemberModal = () => {
    setGroupMemberModal(!groupMemberModal);
  };
  return (
    <>
      <Button
        icon={<img src={User} className="img-white img-user" alt="" />}
        onClick={toggleGroupMemberModal}
        shape="round"
        type="primary"
        size="large"
      >
        Members
      </Button>
      {groupMemberModal && (
        <GroupMemberModal
          groupDetails={groupDetails}
          visible={groupMemberModal}
          onCancel={toggleGroupMemberModal}
          cancelHandler={toggleGroupMemberModal}
          memberList
        />
      )}
    </>
  );
};

export default GroupMembers;
