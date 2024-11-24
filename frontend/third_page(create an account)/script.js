document.getElementsByName('login')[0].addEventListener('click',function(){
    window.location.href="/frontend/second_page(login)/index.html";
});

document.querySelector('button').addEventListener('click', async () => {
    const fullName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('re-password').value;

    if (!fullName || !email || !password || !rePassword) {
        alert('All fields are required!');
        return;
    }

    if (password !== rePassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again later.');
    }
});
