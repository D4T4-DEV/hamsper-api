-- Tablas de la base de datos 
-- Base de datos: hamster-api

-- Extension necesaria para UUIDs en Postgres
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios (dueños)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Claves API
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    api_key_hash TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de hamsters
CREATE TABLE IF NOT EXISTS hamsters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    age NUMERIC(4,2) NOT NULL CHECK (age >= 0), -- Evita edades negativas
    breed VARCHAR(100) NOT NULL,
    coat_type VARCHAR(50) NOT NULL,
    coat_color VARCHAR(50) NOT NULL,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    update_at TIMESTAMP WITH TIME ZONE 
);