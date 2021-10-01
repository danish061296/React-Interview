-- Setup

-- Assume DB = postgresql

-- Given the table:

CREATE TABLE something
(
    id uuid NOT NULL,
    name  CHARACTER VARYING(255) NOT NULL,
    email CHARACTER VARYING(255) NOT NULL,
    phone CHARACTER VARYING(255),
    birthday DATE,
    age INTEGER
);

-- create a trigger/function which will calculate the age on insert or modify given the birthday

CREATE OR REPLACE FUNCTION calculate_age_from_birth()
RETURNS trigger AS 
$$
BEGIN
    NEW.age = EXTRACT(YEAR FROM AGE(NOW(), NEW.birthday));
    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

-- trigger on insert or modify

CREATE trigger cal_age_on_insert 
BEFORE INSERT ON something
FOR EACH ROW 
EXECUTE PROCEDURE calculate_age_from_birth();
