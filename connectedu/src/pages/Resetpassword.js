import React from 'react';
import { Button, Form, Input } from 'antd';
import { useParams } from 'react-router-dom';

const Resetpassword = (props) => {
    
    return (
        <div>
            <Form
    name="wrap"
    labelCol={{ flex: '110px' }}
    labelAlign="left"
    labelWrap
    wrapperCol={{ flex: 1 }}
    colon={false}
    style={{ maxWidth: 600 }}
  >
    <Form.Item label="Nouveau mot de passe" name="password1" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item label="Confirmation du mot de passe" name="password" rules={[{ required: true }]}>
      <Input />
    </Form.Item>

    <Form.Item label="" name="token" hidden value={token}>
      <Input />
    </Form.Item>


    <Form.Item label=" ">
      <Button type="primary" htmlType="submit">
        Valider
      </Button>
    </Form.Item>
  </Form>
        </div>
    );
};

export default Resetpassword;