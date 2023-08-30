document.addEventListener('DOMContentLoaded', () => {
    const convertCSVButton = document.getElementById('convertCSVButton');
    const convertJSONButton = document.getElementById('convertJSONButton');

    convertCSVButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';
        
        input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    try {
                        Papa.parse(e.target.result, {
                            complete: function(results) {
                                const jsonData = results.data;
                                const jsonString = JSON.stringify(jsonData, null, 2);
                                const jsonBlob = new Blob([jsonString], { type: 'application/json' });
                                const jsonUrl = URL.createObjectURL(jsonBlob);
                                const link = document.createElement('a');
                                link.setAttribute('href', jsonUrl);
                                link.setAttribute('download', 'data.json');
                                document.body.appendChild(link);
                                link.click();
                            },
                            header: true
                        });
                    } catch (error) {
                        console.error('Error parsing CSV:', error);
                    }
                };

                reader.readAsText(file);
            }
        });

        // Trigger the file input
        input.click();
    });

    convertJSONButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    try {
                        const jsonData = JSON.parse(e.target.result);

                        // Convert JSON to CSV using PapaParse
                        const csv = Papa.unparse(jsonData);
                        const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                        const csvUrl = URL.createObjectURL(csvData);
                        const link = document.createElement('a');
                        link.setAttribute('href', csvUrl);
                        link.setAttribute('download', 'data.csv');
                        document.body.appendChild(link);
                        link.click();
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                };

                reader.readAsText(file);
            }
        });

        // Trigger the file input
        input.click();
    });
});



// document.addEventListener('DOMContentLoaded', () => {
//     const convertButton = document.getElementById('convertButton');

//     convertButton.addEventListener('click', () => {
//         const input = document.createElement('input');
//         input.type = 'file';
//         input.accept = '.json';
        
//         input.addEventListener('change', (event) => {
//             const file = event.target.files[0];
//             if (file) {
//                 const reader = new FileReader();

//                 reader.onload = (e) => {
//                     try {
//                         const jsonData = JSON.parse(e.target.result);
//                         const csvContent = "data:text/csv;charset=utf-8," + 
//                                            jsonData.map(row => Object.values(row).join(',')).join('\n');
//                         const encodedUri = encodeURI(csvContent);
//                         const link = document.createElement('a');
//                         link.setAttribute('href', encodedUri);
//                         link.setAttribute('download', 'data.csv');
//                         document.body.appendChild(link);
//                         link.click();
//                     } catch (error) {
//                         console.error('Error parsing JSON:', error);
//                     }
//                 };

//                 reader.readAsText(file);
//             }
//         });

//         // Trigger the file input
//         input.click();
//     });
// });
