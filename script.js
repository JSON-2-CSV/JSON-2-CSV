document.addEventListener('DOMContentLoaded', () => {
    const uploadButton = document.getElementById('uploadButton');
    const convertButton = document.getElementById('convertButton');

    uploadButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.click();

        input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                // Handle the uploaded JSON file here
                // You can parse the JSON and store it in a variable
            }
        });
    });

    convertButton.addEventListener('click', () => {
        // Convert JSON to CSV here
        // Example conversion code:
        const jsonData = []; // Your JSON data here
        const csvContent = "data:text/csv;charset=utf-8," + 
                           jsonData.map(row => Object.values(row).join(',')).join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
    });
});
