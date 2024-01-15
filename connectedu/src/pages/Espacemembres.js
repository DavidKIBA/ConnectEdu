import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../components/Dashboardmenu';
import Dashboardsider from '../components/Dashboardsider';


import {
    UserOutlined,
    MessageOutlined,
    SettingOutlined,
    CalendarOutlined,
    FileTextOutlined,
    ReloadOutlined,
    TeamOutlined,
    SearchOutlined,
    ArrowDownOutlined, 
    ArrowUpOutlined,
    EditOutlined, EllipsisOutlined,
  } from '@ant-design/icons';

import {
   Breadcrumb, 
   Layout, 
   Menu, 
   theme, 
   Input, 
   Badge, 
   Dropdown, 
   Avatar,
   Card, 
   Col, 
   Row, 
   Statistic,
   Progress,
   Carousel,
   Button, List, Skeleton,
  } from 'antd';

  import { Typography } from 'antd';
 
  const count = 3;
  const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
  


const { Header, Content, Sider } = Layout;
const { Title, Paragraph } = Typography;



const Espacemembres = () => {                                             

        const {
          token: { colorBgContainer, borderRadiusLG },
        } = theme.useToken();

        const history = useHistory();
      
        const handleBreadcrumbClick = (route) => {
          history.push(route);
        };

        

        const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
      });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        })),
      ),
    );
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null





    return (
        <Layout style={{ background: '#001E32' }}>

          <Dashboardmenu/>
         
        <Layout style={{ background: '#001E32' }} >
          <Dashboardsider/>
  
          {/* Corps de la page 1 */}
          
          <Layout style={{ padding: '0 24px 24px', backgroundColor:'#001E32' }}>
            <Breadcrumb style={{ margin: '16px 0', cursor: 'pointer', color:'#2ECC71' }}>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/')}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/list')}>Thalès de Millet</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/app')} ><font color='#3498DB'>Membres</font></Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
        
              }}
            >
  
               {/* Liste membres */}
              
                   <List
                          className="demo-loadmore-list"
                          loading={initLoading}
                          itemLayout="horizontal"
                          loadMore={loadMore}
                          dataSource={list}
                          renderItem={(item) => (
                            <List.Item
                              actions={[<a key="list-loadmore-edit">Modifier</a>, <a key="list-loadmore-more">more</a>]}
                            >
                              <Skeleton avatar title={false} loading={item.loading} active>
                                  <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} />}
                                    title={<a href="https://ant.design" style={{ color: '#2ecc71' }}>{item.name?.last}</a>}
                                    description={<span style={{ color: '#fff' }}>Ant Design, a design language for background applications, is refined by Ant UED Team</span>}
                                  />
                                  <div style={{ color: '#3498DB' }}>membre</div>
                                </Skeleton>
                            </List.Item>
                          )}
                    />
               
               {/* fin Liste membres */}
            </Content>
  
           
  
           
  
          </Layout>
          
          
        </Layout>
      </Layout>
    );
};

export default Espacemembres;