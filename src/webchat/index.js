/**
 * @author David Menger
 */
import { DirectLine } from 'botframework-directlinejs';
import ReactDom from 'react-dom';
import React from 'react';
import ReactWebChat from 'botframework-webchat';
// import wingbotWebChat from './wingbotWebChat';

export default function hello () {
    console.log({ DirectLine, ReactWebChat }); // eslint-disable-line no-console
}

hello();

// @ts-ignore
window.wingbotWebChat = function (wingbotConfig, componentConfig, element) {
    const {
        secret: token
    } = wingbotConfig;

    const directLine = new DirectLine({ token });

    if (element) {
        const res = ReactDom.render(
            React.createElement(ReactWebChat, { directLine, userID: 'ahoj' }),
            element
        );
        console.log(res); // eslint-disable-line no-console
    }
};
