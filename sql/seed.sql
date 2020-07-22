  
USE employee_trackerDB,

INSERT INTO department (name)
VALUES 
    ("Management"),
    ("legal")

INSERT INTO role (title, salary, department_id)
VALUES 
    ("manager", 1000,1 ),
    ("employee", 1500,2)


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Charlie", "OH",1,NULL),
    ("John", "Snow",2,3)
