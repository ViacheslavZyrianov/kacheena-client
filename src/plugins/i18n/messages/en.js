export default {
  general: {
    add: 'Add',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    kg: 'kg',
    actions: 'Actions'
  },
  home: {
    header: 'KACHEENA',
    subheader: 'We kach, you eena',
    authButton: 'Authorize'
  },
  dashboard: {
    label: 'Dashboard'
  },
  registration: {
    label: 'Registration',
    fullName: {
      label: 'Enter your full name',
      placeholder: 'John Doe',
      errors: {
        1: 'Min 2 characters'
      }
    },
    login: {
      label: 'Enter your login',
      placeholder: 'JohnDoe',
      errors: {
        1: 'Min 4 characters'
      }
    },
    password: {
      label: 'Enter you password',
      errors: {
        1: 'Password must contain 8 characters, one uppercase letter, one lowercase letter and one number'
      }
    },
    passwordRepeat: {
      label: 'Repeat password',
      errors: {
        1: 'Passwords must be identical'
      }
    },
    errors: {
      409: 'Login already exists, choose another one'
    },
    success: 'Registration successful! Now you will be logged in...',
    or: 'or',
    button: 'Register'
  },
  login: {
    label: 'Login',
    login: {
      label: 'Enter your login',
      errors: {
        length: 'Login must me minimum 4 characters long'
      }
    },
    password: {
      label: 'Enter your password',
      errors: {
        length: 'Password must me minimum 8 characters long'
      }
    },
    errors: {
      401: 'Wrong login or password'
    },
    or: 'or',
    button: 'Log in'
  },
  trainees: {
    label: 'Trainees',
    addButton: 'Add trainee',
    byId: {
      label: 'By id',
      id: {
        label: 'Id',
        placeholder: 'Id',
      },
      submitButton: {
        label: 'Add'
      }
    },
    byRegistration: {
      label: 'Register',
      name: {
        label: 'Name',
        placeholder: 'Name',
        errors: {
          1: 'Name is required',
          2: 'Name must be less than 20 characters'
        }
      },
      surname: {
        label: 'Surname',
        placeholder: 'Surname',
        errors: {
          1: 'Surname is required',
          2: 'Surname must be less than 20 characters'
        }
      },
      birthdate: {
        label: 'Birthdate',
        errors: {
          1: 'Birthdate is required'
        }
      },
      sex: {
        label: 'Sex',
        placeholder: 'Sex',
        male: 'Male',
        female: 'Female',
        errors: {
          1: 'Sex is required!'
        }
      },
      club: {
        label: 'Club'
      },
      submitButton: {
        label: 'Register'
      }
    },
    traineeCard: {
      fullInfoButton: {
        label: 'Full info'
      }
    },
    male: 'Male',
    female: 'Female',
    clubless: 'Clubless'
  },
  trainee: {
    label: 'Trainee',
    name: 'Name',
    sex: 'Sex',
    birthdate: 'Birthdate',
    club: 'Club',
    groupedByClubs: 'Grouped by clubs',
    datepicker: {
      trainings: {
        label: 'Trainings'
      }
    },
    training: {
      add: {
        button: 'Add training',
        selectTimeForSelectedTrainings: 'Select time for selected trainings'
      },
      title: {
        label: 'Title',
        placeholder: 'Enter training schedule title'
      },
      type: {
        label: 'Type',
        default: 'Default',
        personal: 'Personal',
        group: 'Group'
      },
      regularity: {
        label: 'Regularity',
        regular: 'Regular',
        irregular: 'Irregular'
      },
      chooseExercises: {
        label: 'Choose exercises',
        placeholder: 'Select time to choose exercises'
      },
      duration: {
        label: 'Duration',
        month1: '1 month',
        month3: '3 months',
        month6: '6 months',
        month12: '12 months'
      },
      startFrom: {
        label: 'Start from',
        closestDate: 'Closest date',
        nextWeek: 'Next week',
        nextMonth: 'Next month',
        customDate: 'Custom date'
      }
    },
    weight: {
      label: 'Weight'
    }
  },
  exercises: {
    label: 'Exercises',
    addButton: 'Add exercise',
    title: {
      label: 'Title',
      placeholder: 'Enter exercises title'
    },
    types: {
      label: 'Exercises types',
      placeholder: 'Enter exercise name'
    },
    muscle: {
      label: 'Muscle',
      abdominals: 'Abdominals',
      abductors: 'Abductors',
      adductors: 'Adductors',
      biceps: 'Biceps',
      calves: 'Calves',
      chest: 'Chest',
      forearms: 'Forearms',
      glutes: 'Glutes',
      hamstrings: 'Hamstrings',
      lats: 'Lats',
      lowerBack: 'Lower back',
      middleBack: 'Middle Back',
      neck: 'Neck',
      quadriceps: 'Quadriceps',
      traps: 'Traps',
      triceps: 'Triceps',
    },
    notes: {
      label: 'Notes',
      placeholder: 'Some additional info'
    }
  },
  clubs: {
    label: 'Clubs',
    addButton: 'Add club',
    form: {
      title: {
        label: 'Title',
        placeholder: 'Enter title'
      },
      address: {
        label: 'Address',
        placeholder: 'Enter address'
      },
      instagram: {
        label: 'Instagram link',
        placeholder: 'instagram.com/yourinstagram'
      },
      facebook: {
        label: 'Facebook link',
        placeholder: 'facebook.com/yourfacebook'
      },
      linkedin: {
        label: 'Linkedin link',
        placeholder: 'linkedin.com/yourlinkedin'
      },
      site: {
        label: 'Site link',
        placeholder: 'yoursitelink.com'
      },
      notes: {
        label: 'Additional info',
        placeholder: 'Some notes...'
      }
    }
  },
  settings: {
    label: 'Settings',
    googleAuthId: {
      label: 'Google Auth ID'
    },
    locale: {
      label: 'Language',
      list: {
        en: 'English',
        uk: 'Ukrainian'
      }
    },
    theme: {
      label: 'Theme',
      dark: 'Dark',
      light: 'Light'
    },
    language: {
      label: 'Language'
    },
    logout: {
      label: 'Logout',
      button: 'Logout'
    }
  }
}