CREATE TABLE feedback (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    content_id VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    comment TEXT
);