const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

class Team {
    constructor() {
        this.teamSize = 0;
        this.team = [];
    }
    start() {
        if (this.teamSize === 0) {
            this.managerPrompt()
        } else {
            this.addNewMember()
        }
    }
    managerPrompt() {
        inquirer
            .prompt([{
                    type: "input",
                    name: "name",
                    message: "What is your manager's name?"
                },
                {
                    type: "input",
                    name: "id",
                    message: "Manager's ID?"
                },
                {
                    type: "input",
                    name: "email",
                    message: "Manager's email?"
                },
                {
                    type: "input",
                    name: "officeNumber",
                    message: "Manager's office number?"
                }
            ]).then(val => {
                const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
                this.teamSize += 1;
                this.team.push(manager);
                this.addNewMember()
            });
    }
    addNewMember() {
        inquirer
            .prompt([{
                type: "input",
                name: "type",
                message: "Would you like to add an Intern or Engineer? or else type 'no'."
            }, ]).then(val => {
                if (val.type === "intern") {
                    this.internPrompt()
                } else if (val.type === "engineer") {
                    this.engineerPrompt()
                } else if (val.type === "no") {
                    this.renderList()
                }
                 else {
                    this.addNewMember()
                }
            });
    };
    engineerPrompt() {
        inquirer
            .prompt([{
                    type: "input",
                    name: "name",
                    message: "What is your Engineer's name?"
                },
                {
                    type: "input",
                    name: "id",
                    message: "Engineer's ID?"
                },
                {
                    type: "input",
                    name: "email",
                    message: "Engineer's email?"
                },
                {
                    type: "input",
                    name: "github",
                    message: "Engineer's github URL?"
                }
            ]).then(val => {
                const engineer = new Engineer(val.name, val.id, val.email, val.github);
                this.teamSize += 1;
                this.team.push(engineer);
                this.addNewMember()
            });
    }
    internPrompt() {
        inquirer
            .prompt([{
                    type: "input",
                    name: "name",
                    message: "What is your Intern's name?"
                },
                {
                    type: "input",
                    name: "id",
                    message: "Intern's ID?"
                },
                {
                    type: "input",
                    name: "email",
                    message: "Intern's email?"
                },
                {
                    type: "input",
                    name: "school",
                    message: "Where did your intern go to school?"
                }
            ]).then(val => {
                const intern = new Intern(val.name, val.id, val.email, val.school);
                this.teamSize += 1;
                this.team.push(intern)
                this.addNewMember()
            });
    };
    
    renderList() {
        fs.writeFile(outputPath, render(this.team), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("Success!");
        });
    };
};

var team = new Team();

team.start();