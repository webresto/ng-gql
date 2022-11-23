import { writeFile, readFile } from 'fs/promises';

const libraryPackageJsonPath = './projects/webresto/ng-gql/package.json';
const mainPackageJsonPath = './package.json';

export async function main() {
  try {
    const libraryPackageJson = JSON.parse(
      await readFile(libraryPackageJsonPath, { encoding: 'utf-8' })
    );
    const mainPackageJson = JSON.parse(
      await readFile(mainPackageJsonPath, { encoding: 'utf-8' })
    );
    const versionArray = libraryPackageJson?.version?.split('.');
    const mainDependencies = { ...mainPackageJson.dependencies, ...mainPackageJson.peerDependencies, ...mainPackageJson.devDependencies };
    let haveChanges: boolean = false;
    [libraryPackageJson.peerDependencies, libraryPackageJson.dependencies].forEach(
      libDeps => {
        Object.keys(libDeps).forEach(
          key => {
            if (mainDependencies[key] && mainDependencies[key] !== libDeps[key]) {
              libDeps[key] = mainDependencies[key];
              if (!haveChanges) {
                haveChanges = true;
              };
            };
          });
      });

    if (haveChanges || (versionArray && versionArray?.[2])) {
      if ((versionArray && versionArray?.[2])) {
        versionArray[2] = String(+versionArray[2] + 1);
        libraryPackageJson.version = versionArray.join('.');
      };
      await writeFile(libraryPackageJsonPath, JSON.stringify(libraryPackageJson, null, 2));
      console.log(`Successfully update library package.json file!.`);
    } else {
      throw new Error(`Error on update version in package.json file!. Current value (need fix) = ${libraryPackageJson.version}.`);
    };
  } catch (message) {
    console.log(message);
  };
};

main();