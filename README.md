# Fee Management App

A simple fee management application built with Laravel, React, and Inertia.js, focusing on student data management and barcode functionality.

## Features

*   **Student Management (CRUD):**
    *   View a list of students with sortable, filterable, and reorderable data tables.
    *   Add new students via a modal.
    *   Edit existing student details via a modal.
    *   Delete students.
*   **Automatic Barcode Generation:** Unique `barcode_id` is automatically generated when a new student is added.
*   **Barcode Display:** Displays visual barcodes for each student in the table.
*   **Print Barcodes:**
    *   Print individual barcodes for specific students.
    *   Print all student barcodes, with 20 barcodes per print page.
*   **Interactive Data Table:**
    *   Column-wise data sorting.
    *   Global search across all table data.
    *   Draggable (drag-and-drop) column headers for reordering display.
*   **Student Detail View:** View complete student details via a modal.
*   **Progressive Web App (PWA):** The application can be installed on devices, runs offline, and provides a native-like experience.
*   **Export to Excel:** Data tables now include functionality to export data to Excel files.
*   **AI Chatbot (Smart Assistant):**
    *   An AI chatbot integrated into the bottom corner of the application to assist users.
    *   Can answer questions about student data (count, name search, class), payments (total count, latest payments), and standard fees (count, list).
    *   Includes direct links to relevant pages for viewing detailed data.
*   **Custom Visual Design:** The application and sidebar backgrounds use a blue and maroon gradient for a unique look.

## Technologies Used

*   **Backend:**
    *   Laravel (PHP Framework)
    *   Eloquent ORM
*   **Frontend:**
    *   React.js
    *   Inertia.js
    *   Vite (Build Tool)
    *   Tailwind CSS (for styling)
    *   Shadcn/UI (UI Components)
    *   TanStack Table (for data tables)
    *   React DND (for drag-and-drop table headers)
    *   JsBarcode (for frontend barcode generation)

## Installation

Follow the steps below to install and run the project locally:

1.  **Clone the Repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd feeManagement-app
    ```

2.  **Install Composer Dependencies:**
    ```bash
    composer install
    ```

3.  **Install Node.js Dependencies:**
    ```bash
    npm install
    ```

4.  **Environment Configuration:**
    *   Create a `.env` file from `.env.example`:
        ```bash
        cp .env.example .env
        ```
    *   Generate an application key:
        ```bash
        php artisan key:generate
        ```
    *   Configure your database in the `.env` file (e.g., `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

5.  **Database Migration and Seed Data:**
    ```bash
    php artisan migrate --seed
    ```
    This will create the necessary database tables and populate the `students` table with dummy data.

## Usage

1.  **Run the Laravel Server:**
    ```bash
    php artisan serve
    ```

2.  **Run the Vite Development Server:**
    ```bash
    npm run dev
    ```

3.  **Access the Application:**
    Open your browser and navigate to `http://127.0.0.1:8000` (or the address displayed by `php artisan serve`).

    *   To view and manage students, navigate to `/students`.
    *   Ensure you are logged in (if the application has an authentication system).

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your features or bug fixes.

## License

This project is licensed under the MIT License.