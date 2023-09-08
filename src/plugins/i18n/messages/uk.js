export default {
  general: {
    add: 'Додати',
    save: 'Зберегти',
    edit: 'Редагувати',
    delete: 'Видалити',
    kg: 'кг',
    actions: 'Дії'
  },
  home: {
    header: 'KACHEENA',
    subheader: 'We kach, you eena',
    authButton: 'Авторизація'
  },
  dashboard: {
    label: 'Дешборд'
  },
  registration: {
    label: 'Реєстрація',
    fullName: {
      label: 'Введіть свій ПІБ',
      placeholder: 'Мур Мурняу',
      errors: {
        1: 'Мінімум 2 символи'
      }
    },
    login: {
      label: 'Введіть свій логін',
      placeholder: 'МурМурняу',
      errors: {
        1: 'Мінімум 4 символи'
      }
    },
    password: {
      label: 'Придумайте пароль',
      errors: {
        1: 'Пароль має містити 8 символів, одну велику літеру, одну малу літеру та одну цифру'
      }
    },
    passwordRepeat: {
      label: 'Повторіть пароль',
      errors: {
        1: 'Паролі мають бути ідентичними'
      }
    },
    errors: {
      409: 'Логін вже існує, оберіть шось інше'
    },
    or: 'або',
    button: 'Зареєструватись',
    success: 'Реєстрація успішна! Тепер ви увійдете в систему...'
  },
  login: {
    label: 'Залогінитись',
    login: {
      label: 'Введіть логін',
      errors: {
        length: 'Логін має бути мінімум 4 символи'
      }
    },
    password: {
      label: 'Введіть пароль',
      errors: {
        length: 'Пароль має бути мінімум 8 символів'
      }
    },
    errors: {
      401: 'Непральний логін чи пароль'
    },
    success: 'Реєстрація успішна! Тепер ви увійдете в систему...',
    or: 'або',
    button: 'Увійти'
  },
  trainees: {
    label: 'Трейні',
    addButton: 'Додати трейні',
    byId: {
      label: 'По айді',
      id: {
        label: 'Айді',
        placeholder: 'Айді',
      },
      submitButton: {
        label: 'Зареєструвати'
      }
    },
    byRegistration: {
      label: 'Зареєструвати',
      name: {
        label: 'Імʼя',
        placeholder: 'Імʼя',
        errors: {
          1: 'Необхідно вказати імʼя!',
          2: 'Імʼя не може бути довше 20-ти літер!'
        }
      },
      surname: {
        label: 'Прізвище',
        placeholder: 'Прізвище',
        errors: {
          1: 'Необхідно вказати прізвище!',
          2: 'Прізвище не може бути довше 20-ти літер!'
        }
      },
      birthdate: {
        label: 'Дата народження',
        errors: {
          1: 'Необхідно заповнити дату народження!'
        }
      },
      sex: {
        label: 'Стать',
        placeholder: 'Стать',
        male: 'Чоловіча',
        female: 'Жіноча',
        errors: {
          1: 'Необхідно обрати стать!'
        }
      },
      club: {
        label: 'Клуб'
      },
      submitButton: {
        label: 'Зареєструвати'
      }
    },
    traineeCard: {
      fullInfoButton: {
        label: 'Повна інформація'
      }
    },
    male: 'Чоловік',
    female: 'Жінка',
    clubless: 'Обезклублені'
  },
  trainee: {
    label: 'Трейні',
    name: 'Імʼя',
    sex: 'Стать',
    birthdate: 'Дата народження',
    club: 'Клуб',
    groupedByClubs: 'Групування по клубам',
    datepicker: {
      trainings: {
        label: 'Тренування'
      }
    },
    training: {
      add: {
        button: 'Додати тренування',
        selectTimeForSelectedTrainings: 'Оберіть час для обраних тренувань'
      },
      title: {
        label: 'Назва',
        placeholder: 'Введіть назву розкладу тренування'
      },
      type: {
        label: 'Тип',
        default: 'Звичайне',
        personal: 'Персональне',
        group: 'Групове'
      },
      regularity: {
        label: 'Регулярність',
        regular: 'Регулярне',
        irregular: 'Нерегулярне'
      },
      chooseExercises: {
        label: 'Обрати вправи',
        placeholder: 'Оберіть час для вибору вправи'
      },
      duration: {
        label: 'Тривалість',
        month1: '1 місяць',
        month3: '3 місяці',
        month6: '6 місяців',
        month12: '12 місяців'
      },
      startFrom: {
        label: 'Розпочати з',
        closestDate: 'Найближчої дати',
        nextWeek: 'Наступного тижня',
        nextMonth: 'Наступного місяця',
        customDate: 'Обрати дату'
      }
    },
    weight: {
      label: 'Вага'
    }
  },
  exercises: {
    label: 'Вправи',
    addButton: 'Додати вправу',
    title: {
      label: 'Назва',
      placeholder: 'Введіть назву вправи'
    },
    types: {
      label: 'Типи вправ',
      placeholder: 'Введіть назву типу вправи'
    },
    muscle: {
      label: 'Мʼязи',
      abdominals: 'Прес',
      abductors: 'Абдуктори (відводячі)',
      adductors: 'Аддуктри (приводячи)',
      biceps: 'Біцепс',
      calves: 'Ікри',
      chest: 'Груди',
      forearms: 'Передпліччя',
      glutes: 'Думпа',
      hamstrings: 'Біцепс стегна',
      lats: 'Крила',
      lowerBack: 'Низ спини',
      middleBack: 'Середина спини',
      neck: 'Шия',
      quadriceps: 'Квадріцепс',
      traps: 'Трапеція',
      triceps: 'Тріцепс',
    },
    notes: {
      label: 'Нотатки',
      placeholder: 'Трохи додаткової інфи'
    }
  },
  clubs: {
    label: 'Клуби',
    addButton: 'Додати клуб',
    form: {
      title: {
        label: 'Назва',
        placeholder: 'Введіть назву'
      },
      address: {
        label: 'Адреса',
        placeholder: 'Введіть адресу'
      },
      notes: {
        label: 'Додаткова інформація',
        placeholder: 'Якісь нотатки...'
      },
      instagram: {
        label: 'Посилання на інстаграм',
        placeholder: 'instagram.com/yourinstagram'
      },
      facebook: {
        label: 'Посилання на фейсбук',
        placeholder: 'facebook.com/yourfacebook'
      },
      linkedin: {
        label: 'Посилання на лінкедін',
        placeholder: 'linkedin.com/yourlinkedin'
      },
      site: {
        label: 'Посилання на сайт',
        placeholder: 'yoursitelink.com'
      },
    }
  },
  settings: {
    label: 'Налаштування',
    googleAuthId: {
      label: 'Айді авторизації Google'
    },
    locale: {
      label: 'Мова',
      list: {
        en: 'Англійська',
        uk: 'Українська'
      }
    },
    theme: {
      label: 'Тема',
      dark: 'Темна',
      light: 'Світла'
    },
    language: {
      label: 'Мова'
    },
    logout: {
      label: 'Вихід',
      button: 'Вихід'
    }
  }
}