CREATE DATABASE vpms;


CREATE TABLE IF NOT EXISTS users
(
    user_id uuid NOT NULL,
    name character varying(100),
    email character varying(100),
    password character varying(100) ,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)

INSERT INTO users ( user_id,name,email,password) VALUES ( uuid_generate_v4(),'Amol', 'amol@test.com','qwerty');

CREATE TABLE IF NOT EXISTS vehicle
(
    vehicle_id uuid NOT NULL,
    vehicle_number character varying(100),
    parking_lot_number character varying(100),
    type character varying(100),
    status character varying(100),
    charges int,
    in_time character varying(100),
    out_time character varying(100),
    remark character varying(250),
    CONSTRAINT vehicle_pkey PRIMARY KEY (vehicle_id)
);

INSERT INTO vehicle ( vehicle_id,number,type,status,charges) VALUES ( uuid_generate_v4(),'MH20DQ2348', '2 wheeler','IN',250);

CREATE TABLE IF NOT EXISTS vehicle_category(
    vehicle_category_id uuid NOT NULL,
    vehicle_category character varying(100),
    CONSTRAINT vehicle_category_pkey PRIMARY KEY (vehicle_category_id)
);