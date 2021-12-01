/* File name: todo.sql
 * Author: @nouryehia
 * Description: Defines the ToDo database.
 */

-- Tables

CREATE TABLE "User" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "User_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "ToDo" (
	"id" serial NOT NULL,
	"user_id" bigserial NOT NULL,
	"description" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"category" varchar(255) NOT NULL,
	"contact" varchar(255) NOT NULL,
	"groupSize" SMALLINT NOT NULL,
	"peopleWanted" SMALLINT NOT NULL,
	CONSTRAINT "ToDo_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "JoinRequest" (
	"id" serial NOT NULL,
	"postId" INT NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"contact" varchar(255) NOT NULL,
	CONSTRAINT "joinRequests_pk" PRIMARY KEY ("id")
) WITH (
	OIDS=FALSE
);

-- Foreign key

ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_fk" FOREIGN KEY ("user_id") REFERENCES "User"("id");

-- Add test users
INSERT INTO "User" (name) VALUES ('user1');
INSERT INTO "User" (name) VALUES ('user2');
