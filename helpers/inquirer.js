import 'colors';
import inquirer from 'inquirer';

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: "1",
                name: `${'1'.green} Create task`
            },
            {
                value: "2",
                name: `${'2.'.green} Show all tasks`
            },
            {
                value: "3",
                name: `${'3.'.green} Show completed tasks`
            },
            {
                value: "4",
                name: `${'4.'.green} Show pending tasks`
            },
            {
                value: "5",
                name: `${'5.'.green} Mark task as completed`
            },
            {
                value: "6",
                name: `${'6.'.green} Delete task`
            },
            {
                value: "0",
                name: `${'0.'.green} Exit`
            }
        ]
    }
]

export const inquirerMenu = async () => {
    console.clear();
    console.log("==========================".green)
    console.log("     Select an option".green)
    console.log("==========================\n".green)

    const { option } = await inquirer.prompt(questions);

    return option;
};

export const pause = async () => {
    const questions = [
        {
            type: "input",
            name: "enter",
            message: `\nPress ${'ENTER'.green} to continue\n`
        }
    ]

    console.log("\n")
    await inquirer.prompt(questions);

};

export const readInput = async (message) => {

    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please enter a task description';
                }

                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;
};


export const deleteTasksFromList = async (tasks = []) => {

    const choices = tasks.map((task, id) => {
        const index = `${id + 1}.`.green
        return {
            value: task.id,
            name: `${index} ${task.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id;
};

export const confirmation = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
};


export const showChecklist = async (tasks = []) => {

    const choices = tasks.map((task, id) => {
        const index = `${id + 1}.`.green
        return {
            value: task.id,
            name: `${index} ${task.desc}`,
            checked: (task.completedAt) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(question);
    return ids;
};