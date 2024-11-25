document.getElementsByName('launch')[0].addEventListener('click',function(){
    window.location.href="/frontend/fifth_page/index.html";
});

document.querySelector('.launch').addEventListener('click', async () => {
    const domain = document.getElementById('domain').value;
    const token = localStorage.getItem('authToken'); 

    if (!token) {
        alert('Please log in to launch a site.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/check-launch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ domain }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
        } else {
            const error = await response.json();
            alert(`Failed to launch site: ${error.message}`);
        }
    } catch (err) {
        console.error('Error during site launch:', err);
        alert('An error occurred while launching the site.');
    }
});

