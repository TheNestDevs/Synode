DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS transactions;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    wallet_id VARCHAR(255),
    public_key VARCHAR(4096),
    private_key VARCHAR(4096),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    sender_wallet_id VARCHAR(255) NOT NULL,
    reciever_wallet_id VARCHAR(255) NOT NULL,
    transacion_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transacion_id VARCHAR(255),
    sync_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
