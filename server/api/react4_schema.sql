DROP table if EXISTS college CASCADE;
DROP table if EXISTS department CASCADE;
DROP table if EXISTS courses CASCADE;

CREATE TABLE college (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(30)
);

CREATE TABLE department (
    id SERIAL PRIMARY KEY NOT NULL,
    college_id INT NOT NULL REFERENCES college(id),
    name VARCHAR(30)
);

CREATE TABLE courses (
    id SERIAL PRIMARY KEY NOT NULL,
    dept_id INT NOT NULL REFERENCES department(id),
    name VARCHAR(30),
    c_desc varchar(30) not null,
    details VARCHAR(256) NOT NULL,
    selected bool not null
);

INSERT INTO college(name)	
        VALUES ('GCCIS');
INSERT INTO college(name)	
        VALUES ('KGCOE');
INSERT INTO college(name)	
        VALUES ('HEALTH AND SCIENCES');
		
INSERT INTO department(name, college_id)	
        VALUES ('Software Engineering', 1);
INSERT INTO department(name, college_id)	
        VALUES ('Computer Science', 1);
INSERT INTO department(name, college_id)	
        VALUES ('Computer Engineering', 2);
INSERT INTO department(name, college_id)	
        VALUES ('Virology', 3);

INSERT INTO courses(name, c_desc, details, selected, dept_id)	
        VALUES ('250', 'Personal SW eng', 'C and vi', FALSE, 1);
INSERT INTO courses(name, c_desc, details, selected, dept_id)	
        VALUES ('331', 'Secure SW Eng', 'Fuzzer, fuzzer, fuzzer', FALSE, 1);
INSERT INTO courses(name, c_desc, details, selected, dept_id)	
        VALUES ('344', 'Web Engineering', 'More than web pages', FALSE, 1);
INSERT INTO courses(name, c_desc, details, selected, dept_id)	
        VALUES ('440', 'SW System Architecture', 'What is a service?', FALSE, 1);
INSERT INTO courses(name, c_desc, details, selected, dept_id)	
        VALUES ('250', 'Algorithms', 'actually a math course', FALSE, 2);
INSERT INTO courses(name, c_desc, details, selected, dept_id)	
        VALUES ('331', 'Operating Systems', 'our books have dinosaurs on them', FALSE, 2);
INSERT INTO courses(name, c_desc, details, selected, dept_id)	
        VALUES ('344', 'Hardware Programming With C', 'what debugger?', FALSE, 3);
INSERT INTO courses(name, c_desc, details, selected, dept_id)	
        VALUES ('440', 'Assembler', 'hold onto your sanity', FALSE, 3);
INSERT INTO courses(name, c_desc, details, selected, dept_id)	
        VALUES ('440', 'Virology 4', 'named best job market course of 2020', FALSE, 4);