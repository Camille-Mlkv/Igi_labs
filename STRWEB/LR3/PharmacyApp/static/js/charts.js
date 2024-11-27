function taylorLn1MinusX(x, terms) {
    let result = 0;
    for (let n = 1; n <= terms; n++) {
      result += Math.pow(x, n) / n *(-1);
    }
    return result;
  }

  // Диапазон x
  const xValues = [];
  for (let x = -0.9; x < 0.9; x += 0.05) {
    xValues.push(x);
  }

  // Значения ряда и точной функции
  const seriesValues = xValues.map((x) => taylorLn1MinusX(x, 20)); // 10 членов ряда
  const exactValues = xValues.map((x) => Math.log(1 - x)); // Точное значение функции

  // Массив для отображаемых данных
  const seriesData = xValues.map((x, index) => ({ x, y: seriesValues[index] }));
  const exactData = xValues.map((x, index) => ({ x, y: exactValues[index] }));

  // Настройки графика (точечный график)
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'scatter',  // Используем точечный график
    data: {
      datasets: [
        {
          label: 'Taylor Series (n=20)',
          data: [],
          borderColor: 'blue',
          backgroundColor: 'blue',
          borderWidth: 1,
          pointRadius: 5,  // Размер точек
        },
        {
          label: 'Exact Function ln(1-x)',
          data: [],
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 1,
          pointRadius: 5,  // Размер точек
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        title: {
          display: true,
          text: 'Scatter Chart: Approximation of ln(1-x)',
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'x',
          },
        },
        y: {
          title: {
            display: true,
            text: 'f(x)',
          },
        },
      },
      animation: {
        duration: 3000, // Общая длительность анимации
        onComplete: function () {
          console.log('Анимация завершена');
        },
      },
    },
  });

  // Функция для анимации добавления точек
  let currentIndex = 0;
  const interval = setInterval(function () {
    if (currentIndex < xValues.length) {
      // Добавляем точки
      myChart.data.datasets[0].data.push(seriesData[currentIndex]);
      myChart.data.datasets[1].data.push(exactData[currentIndex]);

      // Обновляем график
      myChart.update();
      currentIndex++;
    } else {
      // Останавливаем анимацию
      clearInterval(interval);
    }
  }, 100); // Интервал обновления данных (100 мс)

  // Сохранение графика в файл
  document.getElementById('saveGraph').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'graph.png';
    link.href = document.getElementById('myChart').toDataURL();
    link.click();
  });