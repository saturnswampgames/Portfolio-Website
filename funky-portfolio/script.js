document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('contactButton');
    if (btn) {
        btn.addEventListener('click', function () {
            window.location.href = 'mailto:your.email@example.com';
        });
    }
});
