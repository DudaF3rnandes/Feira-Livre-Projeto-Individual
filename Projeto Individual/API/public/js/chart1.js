var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [
            'Pergunta 1', 'Pergunta 2', 'Pergunta 3', 'Pergunta 4', 
            'Pergunta 5', 'Pergunta 6', 'Pergunta 7', 'Pergunta 8', 
            'Pergunta 9', 'Pergunta 10'
        ], // As 10 perguntas no eixo X
        datasets: [{
            label: '# de Votos',
            data: [0, 1, 2, 0, 1, 2, 0, 1, 2, 0], // Mapeando palavras no eixo Y
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)', // Vermelho
                'rgba(54, 162, 235, 0.6)', // Azul
                'rgba(255, 206, 86, 0.6)', // Amarelo
                'rgba(75, 192, 192, 0.6)', // Verde água
                'rgba(153, 102, 255, 0.6)', // Roxo
                'rgba(255, 159, 64, 0.6)', // Laranja
                'rgba(199, 199, 199, 0.6)', // Cinza
                'rgba(83, 102, 255, 0.6)', // Azul escuro
                'rgba(99, 255, 132, 0.6)', // Verde claro
                'rgba(255, 99, 255, 0.6)'  // Rosa
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)',
                'rgba(83, 102, 255, 1)',
                'rgba(99, 255, 132, 1)',
                'rgba(255, 99, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    callback: function(value) {
                        var labels = ['Ótimo', 'Bom', 'Ruim'];
                        return labels[value] || '';
                    },
                    stepSize: 1,
                    max: 2
                }
            }
        }
    }
});