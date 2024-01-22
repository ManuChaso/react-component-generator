// ${componentName}-test.js

import React from 'react';
import { render } from '@testing-library/react';
import ${componentName} from './${componentName}';

test('renders component correctly', () => {
  const { getByText } = render(<${componentName} />);
  const componentElement = getByText(`${componentName} Component`);
  expect(componentElement).toBeInTheDocument();
});

