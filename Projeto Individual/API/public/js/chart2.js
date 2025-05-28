const ctxDoughnut = document.getElementById('doughnut').getContext('2d');
window.doughnutChart = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
        labels: ['Incorretas', 'Corretas'],
        datasets: [{
            label: 'Porcentagem',
            data: [0, 0], // Começa zerado
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    }
});
