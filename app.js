import "colors";

import { inquirerMenu, pause, readInput, deleteTasksFromList, confirmation, showChecklist } from './helpers/inquirer.js';
import { saveData, readStorage } from './helpers/saveFile.js';
import Tasks from './models/tasks.js';

console.clear();

const main = async () => {

    let opt;
    const tasks = new Tasks();

    const storedTasks = readStorage();

    if (storedTasks) {
        tasks.loadTasksFromArray(storedTasks);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Description :');
                tasks.createTask(desc);
                break;
            case '2':
                tasks.allTasks();
                break;
            case '3':
                tasks.listPendingCompleted(true);
                break;
            case '4':
                tasks.listPendingCompleted(false);
                break;
            case '5':
                const ids = await showChecklist(tasks.listArr)
                tasks.toggleCompleted(ids);
                break;
            case '6':
                const id = await deleteTasksFromList(tasks.listArr);
                if (id !== '0') {
                    const ok = await confirmation('Are you sure?');
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log('Task deleted');
                    }
                }
                break;
            case '0':

                break;

            default:
                break;
        }

        saveData(tasks.listArr);

        await pause();
    } while (opt !== '0');
};



main();