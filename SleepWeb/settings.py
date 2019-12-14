"""
SleepWeb
Projeto desenvolvido para o Programa de Pós-Graduação em Computação Aplicada
Universidade de Passo Fundo - 2018/2019

@author Matheus Hernandes
@since 09/03/2019
"""

import os
from django.utils.translation import ugettext_lazy as _

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '=(4et^!esofje1*3q$3&up3e*4n!0*0ej&a*5(13a&19w=8!th'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

CRISPY_TEMPLATE_PACK = 'bootstrap4'

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'rest_framework',
    'rest_framework_datatables',
    'rest_framework.authtoken',
    'rest_auth',
    'rest_auth.registration',
    'allauth',
    'allauth.account',
    'crispy_forms',
    'corsheaders',
    'compressor',
    'compressor_toolkit',
    'sass_processor',
    'apscheduler',

    # apps
    'backend.jobs.apps.JobManager',

    # SleepWeb
    'backend',
    'backend.commons',
    'backend.modules.period',
    'backend.modules.institution',
    'backend.modules.msystem',
    'backend.modules.indicator',
    'backend.modules.monitoring',
    'backend.modules.stage',
    'backend.modules.user',
    'backend.modules.patient',
    'backend.modules.group',
    'backend.modules.rule',
    'frontend',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'SleepWeb.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            'frontend/templates',
            'frontend/templates/commons',
            'frontend/templates/modules',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.i18n',
            ],
        },
    },
]

WSGI_APPLICATION = 'SleepWeb.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'sleepweb',
        'USER': 'postgres',
        'PASSWORD': 'f1234',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'user.User'

# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/


TIME_ZONE = 'UTC'
TIME_ZONE_VALUE = -3

USE_L10N = True

USE_TZ = True

# internationalization
USE_I18N = True

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
)

LANGUAGE_CODE = 'en'

LANGUAGES = (
    ('pt', _('Portuguese')),
    ('en', _('English')),
)

LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'frontend/locale'),
)

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'node_modules'),
)

STATIC_ROOT = 'frontend/compressed/'

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
    'sass_processor.finders.CssFinder',
)
COMPRESS_CSS_FILTERS = [
    'compressor.filters.css_default.CssAbsoluteFilter',
    'compressor.filters.cssmin.CSSMinFilter',
    'compressor.filters.template.TemplateFilter'
]
COMPRESS_JS_FILTERS = [
    'compressor.filters.jsmin.JSMinFilter',
]
COMPRESS_PRECOMPILERS = (
    ('module', 'compressor_toolkit.precompilers.ES6Compiler'),
    ('css', 'compressor_toolkit.precompilers.SCSSCompiler'),
)
SASS_PROCESSOR_INCLUDE_DIRS = [
    os.path.join(BASE_DIR, 'frontend/static/scss'),
    os.path.join(BASE_DIR, 'node_modules'),
]
SASS_PROCESSOR_AUTO_INCLUDE = False
SASS_PROCESSOR_INCLUDE_FILE_PATTERN = r'^.+\.scss$'
SASS_PRECISION = 8
SASS_OUTPUT_STYLE = 'compact'

COMPRESS_ENABLED = False
COMPRESS_OFFLINE = False

# https://docs.djangoproject.com/en/2.1/howto/static-files/


REST_FRAMEWORK = {
    'DEFAULT_PARSER_CLASSES': (
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
    ),
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
        'rest_framework_datatables.renderers.DatatablesRenderer',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'rest_framework_datatables.filters.DatatablesFilterBackend',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework_datatables.pagination.DatatablesPageNumberPagination',
    'PAGE_SIZE': 50,
    "DATE_INPUT_FORMATS": ["%d/%m/%Y"],
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

SITE_ID = 1

# aasdsad
