import { DeleteTwoTone, EditTwoTone, QrcodeOutlined } from "@ant-design/icons";
import { Avatar, Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

function MemberCard({ member }) {
  return (
    <Card
      actions={[
        <Tooltip title="Edit" color="blue">
          <EditTwoTone key="edit" />
        </Tooltip>,
        <Tooltip title="Show QR Code">
          <QrcodeOutlined key="qrcode" />
        </Tooltip>,
        <Tooltip title="Delete" color="red">
          <DeleteTwoTone twoToneColor="#ff4d4f" key="ellipsis" />
        </Tooltip>,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
        }
        title={member.name}
        description="This is the description"
      />
    </Card>
  );
}

export default MemberCard;
