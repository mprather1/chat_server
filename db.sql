DROP DATABASE IF EXISTS api_development;
CREATE DATABASE api_development;

\c api_development;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    username VARCHAR,
    password VARCHAR,
    avatar VARCHAR,
    admin BOOLEAN DEFAULT false,
    _conversation INTEGER
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
    content VARCHAR,
    author VARCHAR,
    time VARCHAR,
    avatar_img VARCHAR,
    _conversation INTEGER
);

CREATE TABLE conversations (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  _user INTEGER ARRAY
);
  
INSERT INTO users ( first_name, last_name, username, password )
VALUES ('Kill', 'Bill', 'killbill', 'password');

INSERT INTO users ( first_name, last_name, username, password, admin )
VALUES ('Mike', 'Prather', 'mprather', 'password', true);

INSERT INTO conversations ( title, _user )
VALUES ('conversation2', ARRAY[1, 2]);

INSERT INTO conversations ( title, _user )
VALUES ('conversation3', ARRAY[1, 2]);

INSERT INTO conversations ( title, _user )
VALUES ('conversation4', ARRAY[1, 2]);


INSERT INTO conversations ( title, _user )
VALUES ('conversation5', ARRAY[1, 2]);

INSERT INTO conversations ( title, _user )
VALUES ('conversation6', ARRAY[1, 2]);


DROP DATABASE IF EXISTS api_test;
CREATE DATABASE api_test;

\c api_test;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    username VARCHAR,
    password VARCHAR,
    avatar VARCHAR,
    admin BOOLEAN DEFAULT false,
    _conversation INTEGER
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
    content VARCHAR,
    author VARCHAR,
    time VARCHAR,
    avatar_img VARCHAR,
    _conversation INTEGER
);

CREATE TABLE conversations (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  _user INTEGER ARRAY
);

DROP DATABASE IF EXISTS api_production;
CREATE DATABASE api_production;

\c api_production;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
    first_name VARCHAR,
    last_name VARCHAR,
    username VARCHAR,
    password VARCHAR,
    avatar VARCHAR,
    admin BOOLEAN DEFAULT false,
    _conversation INTEGER
);

CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
    content VARCHAR,
    author VARCHAR,
    time VARCHAR,
    avatar_img VARCHAR,
    _conversation INTEGER
);

CREATE TABLE conversations (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  _user INTEGER
);