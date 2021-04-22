import { render } from '@testing-library/react';

import ReactAuth0 from './react-auth0';

describe('ReactAuth0', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< ReactAuth0 />);
    expect(baseElement).toBeTruthy();
  });
});
