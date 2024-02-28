import fs from "fs/promises"

const DATA_FOLDER = 'data';

/**
 * Load data from JSON file
 * @param {String} entity - Entity name
 * @returns {Object} Object with data from JSON file
 */
const loadData = async (entity) => {
  try {
    const fileData = await fs.readFile(`${DATA_FOLDER}/${entity}.json`, 'utf8');
    return JSON.parse(fileData);
  } catch (err) {
    console.error(`Error reading ${entity} JSON file:`, err);
    return {};
  }
};

/**
 * Save data to JSON file
 * @param {String} entity - Entity name
 * @param {Object} data - Data to save to JSON file
 */
const saveData = async (entity, data) => {
  try {
    await fs.writeFile(`${DATA_FOLDER}/${entity}.json`, JSON.stringify(data, null, 4), 'utf8');
  } catch (err) {
    console.error(`Error saving ${entity} data to JSON file:`, err);
  }
};

export {
    loadData,
    saveData
}