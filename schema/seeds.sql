INSERT INTO departments(name)
VALUES 
("Management"),
("Sales"),
("Warehouse"),
("Human Resource"),
("Quality Control"),
("Marketing"),
("Accounting");

INSERT INTO roles(title, salary, department_id) 
VALUES  ("Regional Manager", 200000, 1),
        ("customer service", 65000, 2),
        ("sales lead", 100000, 2),
        ("technian", 75000, 3),
        ("Quality Control Officer", 110000, 5),
        ("engineer", 90000, 3),
        ("lead engineer", 85000, 3),
        ("marketing director", 170000, 6),
        ("marketing team leader", 150000, 6),
        ("human resource represenative", 110000, 4);



INSERT INTO employees (first_name, last_name, role_id) 
VALUES  ("Joe", "Black", 1),
        ("Jaden", "Smith", 2),
        ("Julie", "Hart", 3),
        ("Zac", "Clark", 4),
        ("Phil", "Upton", 5),
        ("Mike", "Perez", 6),
        ("Kim", "Dawson", 7),
        ("Leah", "Nelson", 8),
        ("Jim", "Kinder", 9),
        ("Joel", "Nolan", 10);

UPDATE employees SET manager_id = 1 WHERE (id > 1);
