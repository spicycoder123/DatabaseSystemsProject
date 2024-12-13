const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { pool } = require('../server'); // Ensure you have access to your database pool

const csvFilePath = path.join(__dirname, '../books_data.csv'); // Path to your CSV file

// Function to read the CSV file and import data into the database
const importBooks = async () => {
    const books = [];

    // Reading the CSV file using csv-parser
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
            // Parse only bookid, author, title from each row
            const { bookid, author, title } = row;

            if (bookid && author && title) {
                // Add NULL for the userid field, indicating that the book is not checked out yet
                books.push({ bookid, author, title, userid: null });
            }
        })
        .on('end', async () => {
            console.log(`CSV file successfully processed. Found ${books.length} books.`);

            // Insert the books into the database
            try {
                for (const book of books) {
                    const { bookid, author, title, userid } = book;
                    await pool.query(
                        'INSERT INTO book (bookid, author, title, userid) VALUES ($1, $2, $3, $4)', // Insert with NULL for userid
                        [bookid, author, title, userid]
                    );
                }
                console.log('Books have been successfully inserted into the database.');
            } catch (error) {
                console.error('Error inserting books into database:', error);
            }
        });
};

// Call the importBooks function to start the process
importBooks();
