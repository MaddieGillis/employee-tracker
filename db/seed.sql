USE employee_db;

INSERT INTO department(name)
VALUES ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

USE employee_db;

INSERT INTO role(title, salary, department_id)
VALUES ("Software Engineer", 80000, 1),
        ("Accountant", 80000, 2),
        ("Lawyer", 80000, 3),
        ("Sales Representative", 80000, 4);

USE employee_db;

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUE ("Haylee", "Stevenson", 1, NULL),
        ("Kristina", "Smith", 1, 1),
        ("Spencer", "Davis", 2, NULL),
        ("Barbra", "MacDonald", 2, 3),
        ("Shayne", "Barlowe", 3, NULL),
        ("Miranda", "Katz", 3, 5),
        ("Brian", "Elrod", 4, NULL),
        ("Hank", "Piker", 4, 7);