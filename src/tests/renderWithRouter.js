import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export const renderWithRouter = (component, route = '/', params = {}) => {
  const history = createMemoryHistory({ initialEntries: [route] });

  const routeProps = {
    history,
    location: {
      pathname: route,
      search: "",
      hash: "",
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      state: null,
    },
    match: {
      path: route,
      url: route,
      isExact: true,
      params,
    }
  }
  return {
    ...render(
        <Router history={ history }>
          {component}
        </Router>,
    ),
    history,
    routeProps,
  };
};

export default renderWithRouter;