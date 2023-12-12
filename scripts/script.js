var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var circle = {
    centerX: canvas.width / 2,
    centerY: canvas.height / 2,
    radius: 50,
    angle: 0,
    circleSize: 20,
    decreasing: true,
    trail: [],
};

// Добавляем обработчик события для отслеживания движения мыши
canvas.addEventListener("mousemove", function (event) {
    var rect = canvas.getBoundingClientRect();
    // Обновляем центр круга в соответствии с текущими координатами мыши
    circle.centerX = event.clientX - rect.left;
    circle.centerY = event.clientY - rect.top;
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var x = circle.centerX + circle.radius * Math.cos(circle.angle);
    var y = circle.centerY + circle.radius * Math.sin(circle.angle);

    circle.trail.push({ x: x, y: y });

    if (circle.decreasing) {
        circle.circleSize -= 0.05;
    } else {
        circle.circleSize += 0.05;
    }

    if (circle.circleSize <= 0 || circle.circleSize >= 20) {
        circle.decreasing = !circle.decreasing;
    }

    // Рисуем след по орбите
    for (var i = 0; i < circle.trail.length - 1; i++) {
        var hue = ((i + circle.angle * 50) % 360) / 360; // Изменение оттенка со временем
        var lineWidth = circle.circleSize * (i / (circle.trail.length))*2;
        ctx.beginPath();
        ctx.moveTo(circle.trail[i].x, circle.trail[i].y);
        ctx.lineTo(circle.trail[i + 1].x, circle.trail[i + 1].y);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "hsla(" + (hue * 360) + ", 100%, 50%, " + (i / (circle.trail.length)) + ")";
        ctx.stroke();
        ctx.closePath();
    }

    if (circle.trail.length > Math.PI * circle.radius) {
        circle.trail.shift(); // Удаляем первую точку, чтобы ограничить длину следа
    }

    // Рисуем круг на рассчитанных координатах
    ctx.beginPath();
    ctx.arc(x, y, Math.max(circle.circleSize, 0), 0, Math.PI * 2);
    ctx.fillStyle = "hsla(" + (hue * 360) + ", 100%, 50%, 1)"; // Изменение цвета шарика со временем
    ctx.fill();
    ctx.closePath();

    circle.angle += 0.02; // Увеличиваем угол для следующего кадра
    
    requestAnimationFrame(draw); // Запускаем следующий кадр анимации
}

draw(); // Начинаем анимацию
