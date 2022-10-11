const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const syncExampleComponents = async () => {
  const initialPath = path.join(
    __dirname,
    '../../',
    'packages/lib/examples/components'
  );
  const targetPath = path.join(__dirname, '..', 'src/components');
  let prettierOptions = await prettier.resolveConfig(
    path.join(__dirname, '..', '.prettierrc')
  );
  prettierOptions = { ...prettierOptions, parser: 'babel-ts' };

  const components = [
    'Checkbox',
    'Checkboxes',
    'Radio',
    'Radios',
    'Select',
    'TextInput',
  ];

  components.forEach((component) => {
    let code = fs.readFileSync(
      path.join(initialPath, component, 'index.tsx'),
      'utf8'
    );
    code = code.replace(
      "import { FormHandler } from '@interfaces';",
      "import { FormHandler } from 'solid-form-handler';"
    );

    fs.writeFileSync(
      path.join(targetPath, component, 'index.tsx'),
      prettier.format(code, prettierOptions)
    );
  });
};

syncExampleComponents();
