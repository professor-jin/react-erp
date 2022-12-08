import React, {useState} from 'react'
import styles from './login.module.scss'
import classnames from 'classnames'
import {LockOutlined, SafetyOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input, message} from 'antd';
import {login} from '../../api'
import {setLocalStorage} from "../../common/utils";
import {useNavigate} from 'react-router-dom';


const Login = () => {

  const [checkedPassword, setCheckPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [loadings, setLoadings] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setCheckPassword(e.target.checked)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const onFinish = async () => {
    setLoadings(true);

    const params = {
      name: username,
      pw: password
    };

    try {
      const res = await login(params);
      if (res.code === 2000) {
        setLocalStorage('fnc-erp-userinfo', res.data);
        message.success({
          content: '登录成功，您即将进入主页。',
          style: {
            width: '1000px',
          },
          duration: 1
        });
        navigate('/index')
      } else {
        message.success(res.msg, 1);
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoadings(false)
    }
  }

  return (
    <div className={classnames(styles.container, styles.fncFlex)}>
      <div className={styles.wrapper}>
        <header>
          <h3 className={styles.title}>若依后台管理系统</h3>
        </header>

        <article>
          <Form onFinish={onFinish}
                initialValues={{
                  remember: true,
                }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{required: true, message: 'Please input your username!'}]}>
              <Input size="large"
                     placeholder="用户名"
                     prefix={<UserOutlined/>}
                     onChange={(u) => setUsername(u.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{required: true, message: 'Please input your password!'}]}>
              <Input size="large"
                     placeholder="请输入密码"
                     prefix={<LockOutlined/>}
                     type='password'
                     onChange={(p) => setPassword(p.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[{required: true, message: 'Please input your verification code!'}]}>
              <Input size="large"
                     placeholder="验证码"
                     prefix={<SafetyOutlined/>}
                     onChange={(c) => setCode(c.target.value)}
              />
            </Form.Item>


            <Form.Item
              name="remember"
              valuePropName="checked"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loadings}>
                Submit
              </Button>
            </Form.Item>

          </Form>

        </article>
      </div>
    </div>
  )
}

export default Login;
