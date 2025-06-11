const ctxBar = document.getElementById('myChart').getContext('2d');
window.myChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: [
            'Pergunta 1', 'Pergunta 2', 'Pergunta 3', 'Pergunta 4',
            'Pergunta 5', 'Pergunta 6', 'Pergunta 7', 'Pergunta 8',
            'Pergunta 9', 'Pergunta 10'
        ],
        datasets: [
            {
                label: 'Erros',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                backgroundColor: 'rgba(255, 0, 0, 0.6)', 
                borderColor: 'rgba(200, 0, 0, 0.8)', // Começa zerado
               
                borderWidth: 1
            },
            {
                label: 'Acertos',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                 backgroundColor: 'rgba(0, 200, 0, 0.6)',  
                borderColor: 'rgba(0, 150, 0, 0.8)',  // Começa zerado
                
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            x: {
                stacked: true
            },
            y: {
                stacked: true,
                beginAtZero: true,
                min: 0,
                max: 2,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        if (value == 0) return '';
                        if(value == 1) return  'Acertou';
                        if (value == 2) return 'Errou';
                        return value || '';
                    }
                }
            }
        }
    }
});

