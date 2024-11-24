// document.getElementById('saveBtn').addEventListener('click', () => {
//     // Get the content of the editable area (entire template)
//     const template = document.querySelector('.template');  // Select the template with contenteditable="true"
//     const content = template.innerHTML;  // Get the full HTML content inside the editable template

//     // If you need to capture editable images specifically, extract their updated src
//     const images = template.querySelectorAll('.editable_image');
//     const imageSources = [];
//     images.forEach((image) => {
//         imageSources.push(image.src);  // Capture the src of each image (after user edits it)
//     });

//     // Send the content and images to the backend
//     fetch('/save', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             content: content,  // The full HTML content of the editable area
//             imageSources: imageSources,  // The sources of editable images
//         }),
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         if (data.success) {
//             alert('Changes saved successfully!');
//         } else {
//             alert('Failed to save changes.');
//         }
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//         alert('An error occurred while saving changes.');
//     });
// });

document.getElementById('.saveBtn').addEventListener('click', () => {
    // Get the content of the editable area (entire template)
    const template = document.querySelector('.template');  // Select the template with contenteditable="true"
    const content = template.innerHTML;  // Get the full HTML content inside the editable template

    // If you need to capture editable images specifically, extract their updated src
    const images = template.querySelectorAll('.editable_image');
    const imageSources = [];
    images.forEach((image) => {
        imageSources.push(image.src);  // Capture the src of each image (after user edits it)
    });

    // Send the content and images to the backend
    fetch('/save-template', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: content,  // The full HTML content of the editable area
            imageSources: imageSources,  // The sources of editable images
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            alert('Changes saved successfully!');
        } else {
            alert('Failed to save changes.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while saving changes.');
    });
});
