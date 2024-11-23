// document.getElementsByName('launch')[0].addEventListener('click',function(){
//     window.location.href="/fifth_page/index.html";
// });

// document.querySelector('.launch').addEventListener('click', async function () {
//     const domainInput = document.getElementById('domain').value.trim();

//     if (!domainInput) {
//         alert('Please enter a domain name to proceed.');
//         return;
//     }

//     // Get token from localStorage (assuming login stores the token)
//     const token = localStorage.getItem('token');
//     if (!token) {
//         alert('You are not logged in. Redirecting to login page...');
//         window.location.href = '/frontend/second_page(login)/index.html'; // Change path based on your structure
//         return;
//     }

//     try {
//         // Check with the backend if the domain and user session are valid
//         const response = await fetch('http://localhost:3000/check-launch', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ domain: domainInput }),
//         });

//         const result = await response.json();

//         if (response.ok) {
//             alert('Launching your site!');
//             // Redirect or proceed with launching
//             window.location.href = '/launch_success_page.html'; // Example redirection
//         } else {
//             alert(result.error || 'Failed to launch. Try again.');
//             if (response.status === 401 || response.status === 403) {
//                 window.location.href = '/login.html'; // Redirect to login
//             }
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred. Please try again.');
//     }
// });

document.querySelector('.launch').addEventListener('click', async function () {
    const domainInput = document.getElementById('domain').value.trim();

    if (!domainInput) {
        alert('Please enter a domain name to proceed.');
        return;
    }

    // Get token from localStorage (assuming login stores the token)
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in. Redirecting to login page...');
        window.location.href = '/frontend/second_page(login)/index.html'; // Change path based on your structure
        return;
    }

    try {
        // Check with the backend if the domain and user session are valid
        const response = await fetch('http://localhost:3000/check-launch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
            },
            body: JSON.stringify({ domain: domainInput }),
        });

        const result = await response.json();

        if (response.ok) {
            alert('Launching your site!');
            // Redirect or proceed with launching
            window.location.href = '/launch_success_page.html'; // Example redirection
        } else {
            alert(result.error || 'Failed to launch. Try again.');
            if (response.status === 401 || response.status === 403) {
                window.location.href = '/frontend/second_page(login)/index.html'; // Redirect to login if not authenticated
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

