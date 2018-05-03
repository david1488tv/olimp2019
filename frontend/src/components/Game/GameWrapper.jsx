import React, {Component} from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import Game from './Game.js';
import Phone from './Phone/Phone';
import GameComponent from './GameComponent';

import './GameWrapper.sass';

const phoneAPI = {
    addTodo(todo) {
        this.setState({todos: [...this.state.todos, todo]});
    },

    addTodos(todos) {
        this.setState({todos: [...this.state.todos, ...todos]});
    },

    completeTodo(id) {
        let todoIndex = this.state.todos.findIndex(e => e.id === id);
        if (todoIndex !== -1) {
            let todo = {...this.state.todos[todoIndex]};
            todo.isDone = true;
            let newTodos = [...this.state.todos];
            newTodos.splice(todoIndex, 1, todo);
            this.setState({todos: newTodos});
        }
    },

    clearTodos() {
        this.setState({todos: []});
    },

    addMessage(message) {
        this.setState({phoneMessages: [message, ...this.state.phoneMessages]});
    },

    addMessages(messages) {

    },

    setTime(time) {
        this.setState({phoneTime: time});
    },

    setDate(date) {
        this.setState({phoneDate: date});
    },

    setEnabled(enabled) {
        this.setState({phoneEnabled: enabled});
    }
};

class GameWrapper extends Component {
    state = {
        messageText: '',
        messageSource: '',
        charPosition: 0,
        dialogIsShown: false,
        phoneIsShown: false,
        dialogCallback: () => null,
        todos: [],
        phoneMessages: [],
        phoneTime: '',
        phoneDate: '',
        phoneEnabled: false,
    };

    constructor(props) {
        super(props);
        this.textAnimationTimer = null;
        for (let key in phoneAPI) {
            phoneAPI[key] = phoneAPI[key].bind(this);
        }
    }

    @autobind
    displayDialogLine(source, text, callback) {
        if (!callback)
            callback = () => null;
        this.setState({
            messageSource: source,
            messageText: text,
            dialogIsShown: true,
            charPosition: 0,
            phoneIsShown: false,
            dialogCallback: callback,
        });

        this.textAnimationTimer = setInterval(this.handleTimerTick, 50);
    }

    @autobind
    handleTimerTick() {
        if (this.state.charPosition === this.state.messageText.length) {
            clearInterval(this.textAnimationTimer);
        } else {
            this.setState({
                charPosition: this.state.charPosition + 1
            });
        }
    }

    @autobind
    handleGameContainerClick() {
        const {messageText, charPosition, dialogIsShown} = this.state;
        if (dialogIsShown) {
            if (charPosition === messageText.length) {
                this.setState({dialogIsShown: false});
                clearInterval(this.textAnimationTimer);
                this.state.dialogCallback();
            }
            if (charPosition < messageText.length) {
                this.setState({charPosition: messageText.length});
            }
        }
    }

    @autobind
    handleShowPhoneButtonClick() {
        if (!this.state.dialogIsShown) {
            this.setState({
                phoneIsShown: !this.state.phoneIsShown,
            });
        }
    }

    render() {
        const {dialogIsShown, messageText, messageSource, charPosition, phoneIsShown} = this.state;
        return (
            <div
                id="game-container-wrapper"
                onClick={this.handleGameContainerClick}
            >
                <div id="game-container" className={phoneIsShown ? 'blurred' : ''}>
                    {
                        dialogIsShown ?
                            <div id="dialog-container">
                                <div id="message-source">{messageSource}</div>
                                <div id="message-text">{messageText.slice(0, charPosition)}</div>
                                {
                                    charPosition === messageText.length
                                        ?
                                        <div id="message-hint"><em>Клацніть мишкою, щоб продовжити...</em></div>
                                        :
                                        null
                                }
                            </div>
                            :
                            null
                    }
                    <GameComponent
                        inputEnabled={!phoneIsShown && !dialogIsShown}
                        displayDialogLine={this.displayDialogLine}
                        phone
                    />
                    <button
                        className="show-phone-button"
                        onClick={this.handleShowPhoneButtonClick}
                    >
                    </button>
                    <Phone isShown={phoneIsShown}/>
                </div>
            </div>
        );
    }
}

export default GameWrapper;
