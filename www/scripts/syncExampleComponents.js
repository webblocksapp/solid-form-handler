const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const syncExampleComponents = async () => {
  let baseInitialPath = path.join(__dirname, '../../', 'packages/lib/examples');
  let baseTargetPath = path.join(__dirname, '..', 'src');

  await writeComponents(
    `${baseInitialPath}/components`,
    `${baseTargetPath}/components`
  );

  await writeComponents(
    `${baseInitialPath}/components/suid`,
    `${baseTargetPath}/components/suid`
  );
};

const writeComponents = async (initialPath, targetPath) => {
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
    code = code.replace('@example-components', '@components');

    fs.writeFileSync(
      path.join(targetPath, component, 'index.tsx'),
      prettier.format(code, prettierOptions)
    );
  });
};

syncExampleComponents();
