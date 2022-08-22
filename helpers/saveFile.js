import fs from 'fs';
const file = './storage/data.json';

export const saveData = (data) => {
    fs.writeFileSync(file, JSON.stringify(data))
};

export const readStorage = () => {
    if (!fs.existsSync(file)) {
        return null;
    }

    const data = JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    console.log(data);

    return data;
}