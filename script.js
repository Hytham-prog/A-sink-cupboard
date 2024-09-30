const wheel = document.getElementById('spinWheel');
const ctx = wheel.getContext('2d');
const spinButton = document.getElementById('spinButton');
const nameInput = document.getElementById('nameInput');
const addNameButton = document.getElementById('addName');
const resetWheelButton = document.getElementById('resetWheel');
const nameList = document.getElementById('nameList');
const contactForm = document.getElementById('contactForm');

let names = [];
let colors = ['#ffcc00', '#00ccff', '#ff66cc', '#66ff66', '#cc66ff', '#ff6666', '#66ccff', '#ff9933'];

// وظيفة لإعادة رسم العجلة مع الأسماء المدخلة
function drawWheel() {
    const numSections = names.length;
    const arcSize = (2 * Math.PI) / numSections;

    ctx.clearRect(0, 0, wheel.width, wheel.height);
    
    names.forEach((name, index) => {
        const angleStart = index * arcSize;
        const angleEnd = angleStart + arcSize;
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 200, angleStart, angleEnd);
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(angleStart + arcSize / 2);
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.font = "18px Arial";
        ctx.fillText(name, 120, 10);
        ctx.restore();
    });
}

// إنشاء تأثير القصاصات الورقية
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // مدة عشوائية للرسوم المتحركة
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000); // إزالة العنصر بعد 5 ثوانٍ
    }
}

// تدوير العجلة
spinButton.addEventListener('click', function() {
    if (names.length === 0) return;

    let rotation = Math.floor(Math.random() * 360 + 360); // دوران عشوائي
    let finalRotation = rotation % 360;

    wheel.style.transition = "transform 4s ease-out";
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
        wheel.style.transition = "";
        wheel.style.transform = `rotate(${finalRotation}deg)`;
        
        const winnerIndex = Math.floor((finalRotation / 360) * names.length) % names.length;
        const // تحديد الفائز
        const winner = names[winnerIndex];
        alert(`الفائز هو: ${winner}`);
        
        // إنشاء تأثير القصاصات الورقية عند تحديد الفائز
        createConfetti();
    }, 4000);
});

// إضافة الاسم إلى العجلة
addNameButton.addEventListener('click', () => {
    const newName = nameInput.value.trim();
    if (newName !== "") {
        names.push(newName);
        nameInput.value = "";

        const listItem = document.createElement('li');
        listItem.textContent = newName;
        nameList.appendChild(listItem);

        drawWheel();
    }
});

// إعادة تعيين العجلة
resetWheelButton.addEventListener('click', () => {
    names = [];
    nameList.innerHTML = "";
    drawWheel();
});

// إرسال نموذج الاتصال
contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    const formData = new FormData(contactForm);
    
    // هنا يمكنك إضافة منطق لإرسال البيانات إلى خادم أو أي إجراء آخر
    alert(`تم إرسال الرسالة بنجاح من: ${formData.get('name')}`);
    
    // إعادة تعيين النموذج بعد الإرسال
    contactForm.reset();
});