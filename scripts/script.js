var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var centerX = canvas.width / 2;  // X-координата центра холста
var centerY = canvas.height / 2; // Y-координата центра холста
var radius = 50;                // Радиус орбиты
var angle = 0;                  // Начальный угол
var circleSize = 20;            // Начальный размер круга
var decreasing = true;          // Флаг для отслеживания уменьшения
var trail = [];                 // Массив для хранения следа

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистить холст

    // Рассчитываем координаты круга на орбите
    var x = centerX + radius * Math.cos(angle);
    var y = centerY + radius * Math.sin(angle);

    // Добавляем текущие координаты в след
    trail.push({ x: x, y: y });

    // Изменение размера круга
    if (decreasing) {
        circleSize -= 0.05;
    } else {
        circleSize += 0.05;
    }

    // Изменение направления при достижении нулевого или начального радиуса
    if (circleSize <= 0 || circleSize >= 20) {
        decreasing = !decreasing;
    }

    // Рисуем след
    for (var i = 0; i < trail.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(trail[i].x, trail[i].y);
        ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
        ctx.lineWidth = circleSize * 2; // Ширина линии равна диаметру шарика
        ctx.strokeStyle = "rgba(0, 0, 255, " + (1 - i / (trail.length - 1)) + ")"; // Прозрачность убывает от 1 до 0
        ctx.stroke();
        ctx.closePath();
    }

    // Ограничиваем длину следа половиной круга (180 градусов)
    if (trail.length > Math.PI * radius ) {
        trail.shift(); // Удаляем первую точку, чтобы ограничить длину
    }

    // Рисуем круг на рассчитанных координатах
    ctx.beginPath();
    ctx.arc(x, y, Math.max(circleSize, 0), 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();

    // Увеличиваем угол для следующего кадра
    angle += 0.02;

    requestAnimationFrame(draw); // Запускаем следующий кадр анимации
}

draw(); // Начинаем анимацию
