CREATE TABLE IF NOT EXISTS content_casts (
  id CHAR(36) NOT NULL,
  content_id CHAR(36) NOT NULL,
  cast_id CHAR(36) NOT NULL,
  role_name VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uniq_content_cast (content_id, cast_id),
  INDEX idx_content_id (content_id),
  INDEX idx_cast_id (cast_id)
);

