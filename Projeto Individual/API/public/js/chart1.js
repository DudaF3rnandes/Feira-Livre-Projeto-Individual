const ctxBar = document.getElementById('myChart').getContext('2d');
window.myChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: [
            'Pergunta 1', 'Pergunta 2', 'Pergunta 3', 'Pergunta 4',
            'Pergunta 5', 'Pergunta 6', 'Pergunta 7', 'Pergunta 8',
            'Pergunta 9', 'Pergunta 10'
        ],
        datasets: [{
            label: ['Acertos', 'Erros'],
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Começa zerado
            backgroundColor: 'rgba(4, 0, 255, 0.6)',
            borderColor: 'rgba(8, 0, 255, 0.6)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        const labels = ['', 'Errou', 'Acertou'];
                        return labels[value] || '';
                    },
                    stepSize: 1,
                    min: 0,
                    max: 2

                }
            }
        }
    }
});
