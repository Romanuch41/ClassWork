  const output = document.getElementById('output');

  // Цвета
  const COLOR_KEY = '#FFA500';       // Оранжевый для ключей объектов
  const COLOR_VAR_NAME = '#FFFFFF';  // Белый для имён переменных
  const COLOR_VALUE = '#A6E22E';     // Зелёный для значений (как у вас)
  const COLOR_STRING = '#E6DB74';    // Жёлто-бежевый для строк (опционально)

  // Экранирование HTML
  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '<',
      '>': '>',
      '"': '&quot;',
      "'": '&#039;'
    }[m]));
  }

  // Преобразует значение в HTML-строку с цветами
  function formatValueToHtml(value, isTopLevelVar = false) {
    if (value === null) return '<span style="color:#AE81FF">null</span>';
    if (value === undefined) return '<span style="color:#AE81FF">undefined</span>';
    if (typeof value === 'boolean') return `<span style="color:#AE81FF">${value}</span>`;
    if (typeof value === 'number') return `<span style="color:#AE81FF">${value}</span>`;
    if (typeof value === 'string') {
      const escaped = escapeHtml(value);
      return `<span style="color:${COLOR_STRING}">"${escaped}"</span>`;
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return '<span style="color:#F92672">[]</span>';
      const items = value.map(item => formatValueToHtml(item)).join(', ');
      return `[<br>&nbsp;&nbsp;${items}<br>]`;
    }

    if (typeof value === 'object') {
      const keys = Object.keys(value);
      if (keys.length === 0) return '<span style="color:#F92672">{}</span>';

      // Особый случай: один ключ на верхнем уровне → это { x }
      if (isTopLevelVar && keys.length === 1) {
        const key = keys[0];
        const val = value[key];
        const varNameHtml = `<span style="color:${COLOR_VAR_NAME}">${escapeHtml(key)}</span>`;
        const valHtml = formatValueToHtml(val);
        return `${varNameHtml}: ${valHtml}`;
      }

      // Обычный объект — все ключи оранжевые
      const entries = keys.map(key => {
        const keyHtml = `<span style="color:${COLOR_KEY}">${escapeHtml(JSON.stringify(key))}</span>`;
        const valHtml = formatValueToHtml(value[key]);
        return `${keyHtml}: ${valHtml}`;
      }).join(',<br>&nbsp;&nbsp;');

      return `{<br>&nbsp;&nbsp;${entries}<br>}`;
    }

    // fallback
    return `<span style="color:${COLOR_VALUE}">${escapeHtml(String(value))}</span>`;
  }

  function writeToOutput(type, ...args) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';

    const typeSpan = document.createElement('span');
    typeSpan.className = `type ${type}`;
    typeSpan.textContent = type === 'log' ? '' : `[${type.toUpperCase()}]`;

    const valueSpan = document.createElement('span');
    valueSpan.className = 'value';
    // Теперь используем innerHTML!
    valueSpan.innerHTML = args.map((arg, i) => {
      // Передаём isTopLevelVar = true, только если аргумент — объект с 1 ключом
      const isVarLike = typeof arg === 'object' && arg !== null && !Array.isArray(arg) && Object.keys(arg).length === 1;
      return formatValueToHtml(arg, isVarLike);
    }).join(' ');
    
    entry.appendChild(typeSpan);
    entry.appendChild(valueSpan);
    output.appendChild(entry);
    output.scrollTop = output.scrollHeight;
  }

  // Сохраняем оригинальные методы
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = (...args) => {
    writeToOutput('log', ...args);
    originalLog(...args);
  };

  console.error = (...args) => {
    writeToOutput('error', ...args);
    originalError(...args);
  };

  console.warn = (...args) => {
    writeToOutput('warn', ...args);
    originalWarn(...args);
  };