import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import Dashboardmenu from '../../components/Dashboardmenu';
import Dashboardsider from '../../components/Dashboardsider';
import Niveauxprescolaire from '../../components/Niveauxprescolaire';
import Niveauxprimaire from '../../components/Niveauxprimaire';
import Niveauxlycee from '../../components/Niveauxlycee';
import Niveauxcollege from '../../components/Niveauxcollege';
import Uploadfiles from '../../components/Uploadfiles';

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
   Table,
  } from 'antd';

  import { Typography } from 'antd';




const { Header, Content, Sider } = Layout;
const { Search } = Input;
const { Meta } = Card;
const { TextArea } = Input;

const { Title, Paragraph } = Typography;


{/* definir les titres du tableau */}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

{/* fin definir les titres du tableau */}


{/* debut definir les donnees du tableau */}

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

{/* fin definir les donnees du tableau */}



const Cp1 = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);


  };

{/* Debut mini lien des pages */}

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
  
  const history = useHistory();

  const handleBreadcrumbClick = (route) => {
    history.push(route);
  };

{/* Fin mini lien des pages */}

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
    
  };
  return (
         
    <Layout style={{ background: '#001E32' }}>

    <Dashboardmenu/>

       <Layout style={{ background: '#001E32' }}>

          <Dashboardsider/>
         
         {/* Corps de la page 1 */}
          
         <Layout style={{ padding: '0 24px 24px', backgroundColor:'#001E32' }}>
            
            <Breadcrumb style={{ margin: '16px 0', cursor: 'pointer', color:'#2ECC71' }}>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/connected')}>Home</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/list')}>Thalès de Millet</Breadcrumb.Item>
              <Breadcrumb.Item onClick={() => handleBreadcrumbClick('/app')} ><font color='#3498DB'>Elèves</font></Breadcrumb.Item>
            </Breadcrumb>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
           
            <br></br>
            <br></br>
            
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
             
             <Uploadfiles/>
            
            

            </Content>
                

            </Content>

          </Layout>

          {/* Fin Corps de la page 1 */}

       </Layout>
    </Layout>
  );
};
export default Cp1;
