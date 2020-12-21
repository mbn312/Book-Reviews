DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    book_title text NOT NULL,
	review text NOT NULL,
    review_date TIMESTAMP with time zone DEFAULT now()
);
