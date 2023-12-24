-- Database: melochord

DROP DATABASE IF EXISTS melochord;
CREATE USER postgres;

CREATE DATABASE melochord
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Dutch_Netherlands.1252'
    LC_CTYPE = 'Dutch_Netherlands.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

GRANT ALL PRIVILEGES ON DATABASE melochord TO postgres;
-- Table: public.songs

DROP TABLE IF EXISTS public.songs;

CREATE TABLE IF NOT EXISTS public.songs
(
    id integer NOT NULL,
    title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    artist character varying(50) COLLATE pg_catalog."default" NOT NULL,
    album character varying(50) COLLATE pg_catalog."default" NOT NULL,
    createdat timestamp without time zone NOT NULL,
    updatedat timestamp without time zone,
    CONSTRAINT songs_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;