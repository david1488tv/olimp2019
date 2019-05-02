import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DialogContainer} from 'react-md';
import {Link} from 'react-router-dom';
import autobind from 'autobind-decorator';
import photo from '../../img/photo.jpg'

import Login from './Login';
import Regulations from './Regulations';
import Feedback from './Feedback';
import './main.sass';
import {logOut, getLikeCount} from '~api';

  
class Landing extends Component {
    state = {
        formIsVisible: false,
        feedbackIsVisible: false,
        regulationVisible: false,
        likeCount: 6
    };

    handleStartButtonClick() {
        logOut();
    }

    componentDidMount() { // вызывается после рендринга компонента
        logOut();
        getLikeCount()
            .then(res => this.setState({likeCount: res.count}));
    }

    render() {
        const {formIsVisible, feedbackIsVisible, regulationVisible, likeCount} = this.state;

        return (

    <div>
        <div className="main">
            <div className="main-text">
            <div className="for_t">
                 <h1>
            Квест “Моя майбутня професiя”
        </h1>
        </div>
       
    </div>
    <div className="main-text_p">
            <div className="text_p">
               <p>
                    Пориньте в історію вступу до установи вищої освіти.
                     Ваше завдання полягає у подоланні тернистого шляху 
                     абітурієнта, який проходить вступну кампанію та знайомиться
                      зі специфікою своєї професії!
               </p>
               </div>
    </div>
    <div className="wrapper">
    <div className="main-button">
    <div className="but-start">
    <Link className="gogame" to="/game" onClick={() => logOut()}><p>ПОЧАТИ РУХ</p></Link>
           
      </div>
      <div className="but-cont">
              <button  onClick={() => this.setState({formIsVisible: true})}><p>ПРОДОВЖИТИ</p></button>
      </div>
    </div>



</div>

 <div className="footer">
    <div className="butf">
        <div className="wrap">
        <div className="link-f"><div onClick={() => this.setState({regulationVisible: true})}> <p> Правила Квесту</p></div></div>
        <div className="link-f"><div><p> КОМАНДА ДВНЗ “ПДТУ”, 2019 ©</p></div></div>
        <div className="link-f"><div onClick={() => this.setState({feedbackIsVisible: true})}><p> Зворотній зв'язок</p></div></div>
        <div className="link-f"> <div><a href="https://pstu.edu/ru/"> ОФІЦІЙНИЙ САЙТ ПДТУ</a></div></div>
    </div>
    </div>
</div>
    </div>
    <DialogContainer
                    focusOnMount={false}
                    visible={formIsVisible}
                    onHide={() => this.setState({formIsVisible: false})}
                >
                    <Login />
                </DialogContainer>
                <DialogContainer
                    focusOnMount={false}
                    visible={feedbackIsVisible}
                    onHide={() => this.setState({feedbackIsVisible: false})}
                >
                    <Feedback />
                </DialogContainer>
                <DialogContainer
                    focusOnMount={false}
                    visible={regulationVisible}
                    onHide={() => this.setState({regulationVisible: false})}
                >
                <Regulations />
                </DialogContainer>
</div>

        );
             
    }
}

export default Landing;
