

/**
 * @fileoverview
 * @author Igor Alexeenko (o0)
 */

'use strict';

define(['./resizer'], function(Resizer) {
  return function() {
    /** @enum {string} */
    var FileType = {
      'GIF': '',
      'JPEG': '',
      'PNG': '',
      'SVG+XML': ''
    };

    /** @enum {number} */
    var Action = {
      ERROR: 0,
      UPLOADING: 1,
      CUSTOM: 2
    };

    /**
     * Регулярное выражение, проверяющее тип загружаемого файла. Составляется
     * из ключей FileType.
     * @type {RegExp}
     */
    var fileRegExp = new RegExp('^image/(' + Object.keys(FileType).join('|').replace('\+', '\\+') + ')$', 'i');

    /**
     * @type {Object.<string, string>}
     */
    var filterMap;

    /**
     * Объект, который занимается кадрированием изображения.
     * @type {Resizer}
     */
    var currentResizer;

    /**
     * Удаляет текущий объект {@link Resizer}, чтобы создать новый с другим
     * изображением.
     */
    var cleanupResizer = function() {
      if (currentResizer) {
        currentResizer.remove();
        currentResizer = null;
      }
    };

    /**
     * Ставит одну из трех случайных картинок на фон формы загрузки.
     */
    var updateBackground = function() {
      var images = [
        'img/logo-background-1.jpg',
        'img/logo-background-2.jpg',
        'img/logo-background-3.jpg'
      ];

      var backgroundElement = document.querySelector('.upload');
      var randomImageNumber = Math.round(Math.random() * (images.length - 1));
      backgroundElement.style.backgroundImage = 'url(' + images[randomImageNumber] + ')';
    };

    /**
     * Проверяет, валидны ли данные, в форме кадрирования.
     * @return {boolean}
     */
    var resizeFormIsValid = function() {
      return true;
    };

    /**
     * Форма загрузки изображения.
     * @type {HTMLFormElement}
     */
    var uploadForm = document.forms['upload-select-image'];

    /**
     * Форма кадрирования изображения.
     * @type {HTMLFormElement}
     */
    var resizeForm = document.forms['upload-resize'];

    /**
     * Форма добавления фильтра.
     * @type {HTMLFormElement}
     */
    var filterForm = document.forms['upload-filter'];

    /**
     * @type {HTMLImageElement}
     */
    var filterImage = filterForm.querySelector('.filter-image-preview');

    /**
     * @type {HTMLElement}
     */
    var uploadMessage = document.querySelector('.upload-message');

    /**
     * @param {Action} action
     * @param {string=} message
     * @return {Element}
     */
    var showMessage = function(action, message) {
      var isError = false;

      switch (action) {
        case Action.UPLOADING:
          message = message || 'Кексограмим&hellip;';
          break;

        case Action.ERROR:
          isError = true;
          message = message || 'Неподдерживаемый формат файла<br> <a href="' + document.location + '">Попробовать еще раз</a>.';
          break;
      }

      uploadMessage.querySelector('.upload-message-container').innerHTML = message;
      uploadMessage.classList.remove('invisible');
      uploadMessage.classList.toggle('upload-message-error', isError);
      return uploadMessage;
    };

    var hideMessage = function() {
      uploadMessage.classList.add('invisible');
    };

    /**
     * Обработчик изменения изображения в форме загрузки. Если загруженный
     * файл является изображением, считывается исходник картинки, создается
     * Resizer с загруженной картинкой, добавляется в форму кадрирования
     * и показывается форма кадрирования.
     * @param {Event} evt
     */

    uploadForm.addEventListener('change', function(evt) {
      var element = evt.target;
      if (element.id === 'upload-file') {
        // Проверка типа загружаемого файла, тип должен быть изображением
        // одного из форматов: JPEG, PNG, GIF или SVG.
        if (fileRegExp.test(element.files[0].type)) {
          var fileReader = new FileReader();

          showMessage(Action.UPLOADING);

          fileReader.addEventListener('load', function() {
            cleanupResizer();

            currentResizer = new Resizer(fileReader.result);
            currentResizer.setElement(resizeForm);
            uploadMessage.classList.add('invisible');

            uploadForm.classList.add('invisible');
            resizeForm.classList.remove('invisible');


            hideMessage();
          });

          fileReader.readAsDataURL(element.files[0]);
        } else {
          // Показ сообщения об ошибке, если формат загружаемого файла не поддерживается
          showMessage(Action.ERROR);
        }
      }
    });

    var startX = document.getElementById('resize-x');
    var startY = document.getElementById('resize-y');
    var resizeSize = document.getElementById('resize-size');
    var submitButton = document.getElementById('resize-fwd');

    var constraint;
    var startSize;

    window.addEventListener('resizerchange', function() {
      constraint = currentResizer.getConstraint();
      startX.value = constraint.x;
      startY.value = constraint.y;
      resizeSize.value = constraint.side;
      startSize = +resizeSize.value;
    });

    function validate() {
      var x = Number(startX.value);
      var y = Number(startY.value);
      var size = Number(resizeSize.value);
      var width = currentResizer._image.naturalWidth;
      var height = currentResizer._image.naturalHeight;

      submitButton.disabled = x < 0 || y < 0 || size < 0 || x + size > width || y + size > height;
    }

    var moveFrame = function(x, y, side) {
      currentResizer.setConstraint(x, y, side);
    };

    resizeSize.addEventListener('input', function() {
      validate();
      var step = ((resizeSize.value - startSize) / 2);
      moveFrame(+startX.value - step, +startY.value - step, +resizeSize.value);
      startSize = +resizeSize.value;
    });
    startX.addEventListener('change', function() {
      validate();
      moveFrame(+startX.value, +startY.value, +resizeSize.value);
    });
    startY.addEventListener('change', function() {
      validate();
      moveFrame(+startX.value, +startY.value, +resizeSize.value);
    });

    function saveFilterToCookie(selectedFilter) {
      var date = new Date();
      var lastBirthdayOfGrace = new Date(date.getFullYear(), 11, 9);
      var expires;
      if (date < lastBirthdayOfGrace) {
        lastBirthdayOfGrace.setFullYear(date.getFullYear() - 1);
      }
      expires = Math.floor((date - lastBirthdayOfGrace) / (1000 * 3600 * 24));
      Cookies.set('upload-filter', filterMap[selectedFilter], {expires: expires});
    }

    function restoreFilterFromCookie() {
      var preloadFilter = Cookies.get('upload-filter');
      if(preloadFilter) {
        document.getElementById('upload-' + preloadFilter).checked = true;
        filterImage.className = 'filter-image-preview ' + preloadFilter;
      }
    }
    /**
     * Обработка сброса формы кадрирования. Возвращает в начальное состояние
     * и обновляет фон.
     * @param {Event} evt
     */
    resizeForm.addEventListener('reset', function(evt) {
      evt.preventDefault();

      cleanupResizer();
      updateBackground();

      resizeForm.classList.add('invisible');
      uploadForm.classList.remove('invisible');
    });

    /**
     * Обработка отправки формы кадрирования. Если форма валидна, экспортирует
     * кропнутое изображение в форму добавления фильтра и показывает ее.
     * @param {Event} evt
     */

    resizeForm.addEventListener('submit', function(evt) {
      evt.preventDefault();

      if (resizeFormIsValid()) {
        var image = currentResizer.exportImage().src;
        var thumbnails = filterForm.querySelectorAll('.upload-filter-preview');
        for (var i = 0; i < thumbnails.length; i++) {
          thumbnails[i].style.backgroundImage = 'url(' + image + ')';
        }
        filterImage.src = image;
        resizeForm.classList.add('invisible');
        filterForm.classList.remove('invisible');
        restoreFilterFromCookie();
      }
    });

    /**
     * Сброс формы фильтра. Показывает форму кадрирования.
     * @param {Event} evt
     */
    filterForm.addEventListener('reset', function(evt) {
      evt.preventDefault();

      filterForm.classList.add('invisible');
      resizeForm.classList.remove('invisible');
    });

    /**
     * Отправка формы фильтра. Возвращает в начальное состояние, предварительно
     * записав сохраненный фильтр в cookie.
     * @param {Event} evt
     */
    filterForm.addEventListener('submit', function(evt) {
      evt.preventDefault();

      cleanupResizer();
      updateBackground();

      filterForm.classList.add('invisible');
      uploadForm.classList.remove('invisible');
    });

    /**
     * Обработчик изменения фильтра. Добавляет класс из filterMap соответствующий
     * выбранному значению в форме.
     */
    filterForm.addEventListener('change', function() {
      if (!filterMap) {
        // Ленивая инициализация. Объект не создается до тех пор, пока
        // не понадобится прочитать его в первый раз, а после этого запоминается
        // навсегда.
        filterMap = {
          'none': 'filter-none',
          'chrome': 'filter-chrome',
          'sepia': 'filter-sepia',
          'marvin': 'filter-marvin'
        };
      }
      var selectedFilter = [].filter.call(filterForm['upload-filter'], function(item) {
        return item.checked;
      })[0].value;

      saveFilterToCookie(selectedFilter);

      // Класс перезаписывается, а не обновляется через classList потому что нужно
      // убрать предыдущий примененный класс. Для этого нужно или запоминать его
      // состояние или просто перезаписывать.
      filterImage.className = 'filter-image-preview ' + filterMap[selectedFilter];
    });

    cleanupResizer();
    updateBackground();
  };
});
