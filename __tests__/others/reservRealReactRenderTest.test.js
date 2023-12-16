import React from "react";
import { render, screen } from "@testing-library/react";
import configureStore from '../src/redux/store';
import { Provider } from 'react-redux';
import App from "../src/App";

test("render react app", () => {
    const store = configureStore();
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    screen.debug();
});