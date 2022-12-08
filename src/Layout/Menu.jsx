import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Menu} from "antd";

const UserMenu = (props) => {
  const navigate = useNavigate() // 跳转页面方法
  const [items, setItems] = useState([]);

  useEffect(() => {
    const {menuList} = props;
    setItems(menuList);
  });

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['goodsList']}
      items={items}
      onClick={(item) => {
        // navigate(key);
        console.log(item)
      }}
    />
  )
}

export default UserMenu;
