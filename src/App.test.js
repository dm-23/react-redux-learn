import React from 'react';
import { render } from '@testing-library/react';
import AppMain from './App';

test('Render Main App', () => {
  const { getByText } = render(<AppMain />);
  //const linkElement = getByText('Settings');
  //expect(linkElement).toBeInTheDocument();
});
