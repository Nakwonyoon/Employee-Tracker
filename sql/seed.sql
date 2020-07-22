  
USE employee_trackerDB,

INSERT INTO department (name)
VALUES 
    ("Management"),
    ("legal"),
    ("IT")

INSERT INTO role (title, salary, department_id)
VALUES 
    ("manager", 1000000,1 ),
    ("employee", 150000,2),
    ("engineering", 2000000, 3)


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Charlie", "OH",1,NULL),
    ("John", "Snow",2,3)
