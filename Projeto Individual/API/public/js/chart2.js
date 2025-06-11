const ctxDoughnut = document.getElementById('doughnut').getContext('2d');
window.doughnutChart = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
        labels: ['Incorretas', 'Corretas'],
        datasets: [{
            label: 'Quantidade',
            data: [0, 0], // Começa zerado
            backgroundColor: [
                'rgb(251, 0, 54)',
                'rgb(94, 255, 19)',
            ],
            borderColor: [
                'rgb(251, 0, 54)',
                'rgb(94, 255, 19)',
            ],
            borderWidth: 1
        }]
    }
});
