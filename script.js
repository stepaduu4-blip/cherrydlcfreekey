// Генерация случайного ключа из 11 символов (цифры + буквы)
function generateKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = '';

    for (let i = 0; i < 11; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        key += chars[randomIndex];

        // Добавляем дефисы для читаемости: XXXX-XXXX-XXX
        if (i === 3 || i === 7) {
            key += '-';
        }
    }

    return key;
}

// Обновление отображения ключа
function updateKeyDisplay() {
    const keyText = document.getElementById('keyText');
    const newKey = generateKey();
    keyText.textContent = newKey;

    // Анимация появления
    keyText.style.transform = 'scale(1.1)';
    keyText.style.transition = 'transform 0.2s ease';
    setTimeout(() => {
        keyText.style.transform = 'scale(1)';
    }, 200);

    return newKey;
}

// Копирование в буфер обмена
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✅ Ключ скопирован!');
    }).catch(() => {
        // Фолбэк для старых браузеров
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('✅ Ключ скопирован!');
    });
}

// Показ уведомления
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.remove('show');
    void notification.offsetWidth; // Триггер reflow
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Создание эффекта частиц при генерации
function createParticles() {
    const card = document.querySelector('.card');
    const particles = ['🍒', '✨', '💎', '🔑', '⭐'];

    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('span');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.fontSize = (Math.random() * 20 + 15) + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `particleFloat ${Math.random() * 1 + 0.5}s ease-out forwards`;
        particle.style.zIndex = '10';

        card.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// Добавляем стили для анимации частиц
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const keyText = document.getElementById('keyText');

    // Генерируем первый ключ при загрузке
    let currentKey = updateKeyDisplay();

    // Обработчик кнопки генерации
    generateBtn.addEventListener('click', () => {
        currentKey = updateKeyDisplay();
        createParticles();

        // Виброотклик на мобильных устройствах
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });

    // Обработчик кнопки копирования
    copyBtn.addEventListener('click', () => {
        const keyWithoutDashes = keyText.textContent.replace(/-/g, '');
        copyToClipboard(keyWithoutDashes);

        // Виброотклик
        if (navigator.vibrate) {
            navigator.vibrate([30, 50, 30]);
        }
    });

    // Генерация по пробелу
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && document.activeElement === document.body) {
            e.preventDefault();
            currentKey = updateKeyDisplay();
            createParticles();
        }
    });
});