var mymap = L.map('mapid').setView([6.217, -75.567], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
}).addTo(mymap);

var marker = L.marker([6.244859, -75.573631]).addTo(mymap);