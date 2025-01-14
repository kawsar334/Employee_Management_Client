const rootLoader = async () => {
    try {
        // Simulating a fetch request to an API endpoint
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Parse the JSON data
        return { users: data }; // Return the data in an object
    } catch (error) {
        console.error("Error fetching data:", error);
        return { users: [] }; // Return an empty array if there's an error
    }
};
