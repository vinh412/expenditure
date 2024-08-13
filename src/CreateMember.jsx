import { Avatar, Button, Card, Form, Input, InputNumber, List, Modal, Select } from "antd";
import React, { useState } from "react";
import banks from "./banks";
import { PlusOutlined } from "@ant-design/icons";
import {v4 as uuidv4} from 'uuid';

function CreateMember({members, setMembers}) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const bankOptions = banks.data.map((item) => {
    return {
      ...item,
      filterName: item.name + " " + item.shortName,
      label: item.shortName,
      value: item.bin,
    };
  });

  const onCreate = (values) => {
    const newMembers = [...members];
    newMembers.push({...values, id: uuidv4()})
    setMembers(newMembers);
  };

  return (
    <>
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        style={{ width: "100%", height: "100%" }}
        onClick={() => setOpen(true)}
      >
        Add Member
      </Button>
      <Modal
        open={open}
        title="Add member"
        okText="Add"
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{
              modifier: "public",
            }}
            clearOnDestroy
            onFinish={(values) => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input the name of member!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="acqId" label="Bank">
          <Select
            showSearch
            placeholder="Select a bank"
            optionFilterProp="filterName"
            options={bankOptions}
            optionRender={(option) => (
              <Card>
                <Card.Meta
                  avatar={<Avatar src={option.data.logo} />}
                  title={option.data.shortName}
                  description={option.data.name}
                />
              </Card>
            )}
          />
        </Form.Item>
        <Form.Item name="accountNo" label="Bank Account Number">
            <Input />
        </Form.Item>
        <Form.Item name="accountName" label="Bank Account Name">
            <Input />
        </Form.Item>
      </Modal>
    </>
  );
}

export default CreateMember;
