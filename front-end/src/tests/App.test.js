import React from 'react';
import { render } from '@testing-library/react';
import {Provider} from 'react-redux'
import App from '../components/App';
import {createStore} from "redux";
import rootReducer from "../reducers/rootReducer";
import { MemoryRouter } from "react-router";

const store = createStore(rootReducer);

it('renders without crashing', () => {

  render(
    <MemoryRouter>
      <Provider store={store}>
      <App />
      </Provider>
    </MemoryRouter>
)
});