import React, { Fragment } from 'react';
import messageService from './services/window.postmessage.service';

function App() {
    function sendMessage() {
        messageService.sendMessage<{ email: string }>({
            type: 'LOGIN_SUCCESS',
            payload: {
                email: 'hello!'
            }
        });
    }
    return (
        <Fragment>
            <button onClick={sendMessage}>sendMessage</button>
        </Fragment>
    )
}

export default App;
