/* eslint-disable */
// @ts-nocheck
const fs = require('fs');
const path = require('path');

const componentFilepath = path.resolve(__dirname, '../src/components.storyblok.json');
const jsonFilename = 'algolia-indexable-content.json';
const outputFilepath = path.resolve(__dirname, '../src/helpers/algolia', jsonFilename);

function Main() {
  if (!fs.existsSync(componentFilepath)) {
    console.log('Component file does not exist yet!');
    console.log(`-- [${componentFilepath}]`);
    return;
  }
  if (fs.existsSync(outputFilepath)) {
    console.log('Output File already exists');
    console.log('-- ', outputFilepath);
    return;
  }

  console.log('Loading component data from file...');
  let data;
  try {
    const rawData = fs.readFileSync(componentFilepath);
    data = JSON.parse(rawData);
  } catch (err) {
    console.log('Failed');
    console.error(err);
  }

  console.log('Building component list...');
  let components = [];
  try {
    components = data.components.map((c)=>{
      return c.name;
    })
  } catch (err) {
    console.log('Failed');
    console.error(err);
  }

  console.log('Preparing output file...');
  const fileData = {
    exclude: {}
  }
  try {
    components.forEach((c)=>{
      fileData.exclude[c] = true;
    })
  } catch (err) {
    console.log('Failed');
    console.error(err);
  }
  console.log('Writing output file...');
  try {
    fs.writeFileSync(outputFilepath, JSON.stringify(fileData, null, 2));
  } catch (err) {
    console.log('Failed');
    console.error(err);
  }

  console.log('Finished');
}

Main();
