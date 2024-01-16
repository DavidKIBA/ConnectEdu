import React from 'react';
import Menu from '../components/Menu';
import { Button, Result, Typography } from 'antd';

const {Title} = Typography;

const Inscription4 = () => {
    return (

       <div className="home-container">
          <img
            className="background-image"
            src={process.env.PUBLIC_URL + '/images/connexionimage.jpg'}
            alt="Accueil"
          />
          
          <div className="overlay1"></div>
    
          <div>
            
              <Menu />
            
          </div> 
          <Title className='titreconn4' level={3} style={{ color: '#3197d7' }}>
               Votre candidature est en cours de traitement
          </Title>
        
          <Result className='inscription4img'
              status="success"
              title={<span className='titreconn5'>Vous recevrez un mail de confirmation après validation de votre dossier</span>}
              subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                <Button type="primary" key="console">
                  Go Console
                </Button>,
                <Button key="buy">Buy Again</Button>,
              ]}
            />

        </div>
    );
};

export default Inscription4;

