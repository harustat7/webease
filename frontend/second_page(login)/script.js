document.getElementsByName('create')[0].addEventListener('click',function(){
    window.location.href="/frontend/third_page(create an account)/index.html";
});

document.getElementsByName('login')[0].addEventListener('click',function(){
    window.location.href="/frontend/fourth_page/index.html";
});

document.querySelector('.login-button').addEventListener('click', async function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Login successful:', result.token); 
            localStorage.setItem('token', result.token); 
            window.location.href = '/frontend/domain_page.html';
        } else {
            alert(result.error || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});


// const LOGIN_API_URL = "http://localhost:3000/login"; 
// const DOMAIN_PAGE_URL = "/frontend/fourth_page/index.html"; 


// document.addEventListener("DOMContentLoaded", () => {
//     const loginButton = document.getElementById("login");
//     const launchButton = document.querySelector(".launch");

//     // Login button click handler
//     if (loginButton) {
//         loginButton.addEventListener("click", async () => {
//             const email = document.getElementById("email").value;
//             const password = document.getElementById("password").value;

//             if (!email || !password) {
//                 alert("Please fill out all fields.");
//                 return;
//             }

//             try {
//                 const response = await fetch(LOGIN_API_URL, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ email, password }),
//                 });

//                 const result = await response.json();
//                 if (response.ok) {
//                     console.log("Token received:", result.token);

//                     // Save token to localStorage
//                     localStorage.setItem("token", result.token);

//                     // Redirect to the domain page
//                     window.location.href = DOMAIN_PAGE_URL;
//                 } else {
//                     alert(result.error || "Login failed. Please try again.");
//                 }
//             } catch (error) {
//                 console.error("Error:", error);
//                 alert("An error occurred. Please try again later.");
//             }
//         });
//     }

//     if (launchButton) {
//         launchButton.addEventListener("click", () => {
//             const token = localStorage.getItem("token");
//             const domain = document.getElementById("domain").value;

//             if (!token) {
//                 alert("You are not logged in. Redirecting to the login page.");
//                 window.location.href = "/frontend/second_page(login)/index.html";
//                 return;
//             }

//             if (!domain) {
//                 alert("Please enter a domain name.");
//                 return;
//             }

//             alert(`Launching website for domain: ${domain}`);
//             // Add functionality for launching the domain here (e.g., API call or redirection)
//         });
//     }
// });


// document.getElementById('login').addEventListener('click', async () => {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('http://localhost:3000/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             console.log('Token at frontend:', data.token);
//             localStorage.setItem('authToken', data.token); // Save token for future requests
//             alert('Login successful!');
//         } else {
//             const error = await response.json();
//             alert(`Login failed: ${error.message}`);
//         }
//     } catch (err) {
//         console.error('Error during login:', err);
//         alert('An error occurred during login.');
//     }
// });


// document.querySelector('.launch').addEventListener('click', async () => {
//     const domain = document.getElementById('domain').value;
//     const token = localStorage.getItem('authToken'); // Retrieve token from storage

//     if (!token) {
//         alert('Please log in to launch a site.');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3000/check-launch', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ domain }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             alert(data.message);
//         } else {
//             const error = await response.json();
//             alert(`Failed to launch site: ${error.message}`);
//         }
//     } catch (err) {
//         console.error('Error during site launch:', err);
//         alert('An error occurred while launching the site.');
//     }
// });

// Login button event
// document.getElementById('login').addEventListener('click', async () => {
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch('http://localhost:3000/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             console.log('Token at frontend:', data.token);
//             localStorage.setItem('authToken', data.token); // Save token for future requests
//             alert('Login successful!');
//         } else {
//             const error = await response.json();
//             alert(`Login failed: ${error.message}`);
//         }
//     } catch (err) {
//         console.error('Error during login:', err);
//         alert('An error occurred during login.');
//     }
// });

// // Launch button event
// document.querySelector('.launch').addEventListener('click', async () => {
//     const domain = document.getElementById('domain').value;
//     const token = localStorage.getItem('authToken'); // Retrieve token from storage

//     if (!token) {
//         alert('Please log in to launch a site.');
//         return;
//     }

//     try {
//         const response = await fetch('http://localhost:3000/check-launch', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ domain }),
//         });

//         if (response.ok) {
//             const data = await response.json();
//             alert(data.message);
//         } else {
//             const error = await response.json();
//             alert(`Failed to launch site: ${error.message}`);
//         }
//     } catch (err) {
//         console.error('Error during site launch:', err);
//         alert('An error occurred while launching the site.');
//     }
// });

