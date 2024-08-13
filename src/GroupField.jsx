import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
} from "@ant-design/icons";
import "./GroupField.css";
import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Table,
  Typography,
} from "antd";
import React from "react";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function GroupField({ groups, setGroups, groupsDataSource }) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = React.useState("");
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      price: 0,
      note: "",
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const handleDelete = (record) => {
    const newGroups = [...groups];
    const updateGroup = newGroups.find((group) => group.id === record.groupId);
    const updateMemberIndex = updateGroup.members.findIndex(
      (member) => member.id === record.memberId
    );
    const updateExpenditures = updateGroup.members[
      updateMemberIndex
    ].expenditures.filter((expenditure) => expenditure.id !== record.id);
    updateGroup.members[updateMemberIndex].expenditures = updateExpenditures;
    setGroups(newGroups);
  };
  const save = (record) => {
    const row = form.getFieldsValue();
    const newGroups = [...groups];
    const updateGroup = newGroups.find((group) => group.id === record.groupId);
    const updateMember = updateGroup.members.find(
      (member) => member.id === record.memberId
    );
    const updateExpenditureIndex = updateMember.expenditures.findIndex(
      (expenditure) => expenditure.id === record.id
    );
    if (updateExpenditureIndex > -1) {
      updateMember.expenditures.splice(updateExpenditureIndex, 1, {
        ...updateMember.expenditures[updateExpenditureIndex],
        ...row,
      });
    } else {
      updateMember.expenditures.push({
        id: record.id,
        ...row,
      });
    }

    setGroups(newGroups);
    setEditingKey("");
  };

  console.log(groupsDataSource);
  const sharedOnCell = (record, index) => {
    return {
      rowSpan: record.rowSpan,
    };
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "memberName",
      width: '20%',
      onCell: sharedOnCell,
      editable: false,
    },
    {
      title: "Expenditure",
      children: [
        {
          title: "Note",
          key: "note",
          dataIndex: "note",
          width: '40%',
          editable: true,
          onCell: (record) => ({
            title: "Note",
            dataIndex: "note",
            inputType: "text",
            record,
            editing: isEditing(record),
          }),
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          width: '20%',
          editable: true,
          onCell: (record) => ({
            inputType: "number",
            key: "price",
            dataIndex: "price",
            title: "Price",
            record,
            editing: isEditing(record),
          }),
        },
        {
          title: "Action",
          key: "action",
          width: '20%',
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <Button
                  type="text"
                  icon={<CheckCircleTwoTone />}
                  onClick={() => save(record)}
                />
                <Button
                  type="text"
                  icon={<CloseCircleTwoTone />}
                  onClick={cancel}
                />
              </span>
            ) : (
              <span>
                <Button
                  type="text"
                  icon={<EditTwoTone />}
                  disabled={editingKey !== ""}
                  onClick={() => {
                    edit(record);
                  }}
                />
                <Button
                  type="text"
                  icon={<DeleteTwoTone twoToneColor="#ff4d4f" />}
                  onClick={() => handleDelete(record)}
                />
              </span>
            );
          },
        },
      ],
    },
  ];
  return groupsDataSource.map((group, index) => (
    <div key={index}>
      <Flex justify="center">
        <Typography.Title level="h2">{group.name}</Typography.Title>
      </Flex>
      <Form form={form} component={false}>
        <Table
        pagination={false}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowClassName="editable-row"
          columns={columns}
          dataSource={group.members}
          bordered
        />
      </Form>
    </div>
  ));
}

export default GroupField;
