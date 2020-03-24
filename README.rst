Django-Redactor-Editor
========================


This package helps integrate the `Redactor <http://redactorjs.com/>`_ Javascript WYSIWYG-editor in Django.

Installation
----------------

#. Pip install: ``pip install django-redactoreditor`` (or add the ``redactor`` directory to your Python path)
#. Add the ``redactor`` application to your `INSTALLED_APPS <https://docs.djangoproject.com/en/1.4/ref/settings/#installed-apps>`_ setting.

Usage
----------------

The redactor app provides a Django widget called ``RedactorEditor``. It is a drop-in replacement for any ``TextArea`` widget. Example usage::

    from django import forms
    from django.db import models

    from redactor.widgets import RedactorEditor

    class MyForm(forms.Form):
        about_me = forms.CharField(widget=RedactorEditor())


You can also customize any of the Redactor editor's `settings <http://imperavi.com/redactor/docs/settings/>`_ when instantiating the widget::

    class MyForm(forms.Form):

        about_me = forms.CharField(widget=RedactorEditor(redactor_settings={
            'autoformat': True,
            'overlay': False
        }))


Django-redactor also includes a widget with some some customizations that make it function and look better in the Django admin::

    class MyAdmin(admin.ModelAdmin):
        formfield_overrides = {
                models.TextField: {'widget': AdminRedactorEditor},
        }

Finally, you can connect a custom CSS file to the editable area of the editor::

    class MyForm(forms.Form):
        about_me = forms.CharField(widget=RedactorEditor(
            redactor_css="styles/text.css")
        )

Paths used to specify CSS can be either relative or absolute. If a path starts with '/', 'http://' or 'https://', it will be interpreted as an absolute path, and left as-is. All other paths will be prepended with the value of the ``STATIC_URL`` setting (or ``MEDIA_URL`` if static is not defined).

For the sake of convenience, there is also a form field that can be used that accepts the same inputs. This field can be used anywhere ``forms.CharField`` can and accepts the same arguments, but always renders a Redactor widget::

    from redactor.fields import RedactorField

    class MyForm(forms.Form):
        about_me = RedactorField(
            in_admin=True,
            redactor_css="styles/text.css",
            redactor_settings={'overlay': True}
        )

jQuery
^^^^^^^^^^^^^^^^^^^^^^^^^

The redactor javascript library requires jQuery 1.9 or better to function. By default, jQuery is included as part of the field and widget media. However, this can cause issues where other widgets or forms on a page are using a *different* version of jQuery. It is possible to exclude jQuery from the media of the redactor field and widget if you wish to handle JavaScript dependency management yourself::

    class MyForm(forms.Form):
        about_me = RedactorField(include_jquery=False)


Templating
^^^^^^^^^^^^^^^^^^^^^^^^^

If you are using a redactor widget outside the admin, you'll need to be sure that you render `the form's media <https://docs.djangoproject.com/en/dev/topics/forms/media/#media-on-forms>`_. Redactor widgets need to include some CSS and JavaScript to work properly::

    <form>
        {{ myform.media }}
        {{ myform.as_p }}
        <input type="submit"/>
    </form>

Internationalization
^^^^^^^^^^^^^^^^^^^^^^^^^

If you wish to use Redactor in other languages, you only need to specify the ``lang`` setting. The correct javascript language files will be loaded automatically::

    class MyForm(forms.Form):

        about_me = forms.CharField(widget=RedactorEditor(redactor_settings={
            'autoformat': True,
            'lang': 'es',
            'overlay': False
        }))


Django-Redactor is licensed under a `Creative Commons Attribution-NonCommercial 3.0 <http://creativecommons.org/licenses/by-nc/3.0/>`_ license. However, the noncommercial restrictions of the license (e.g., Section 4(b)) are waived for any user who purchases a
legitimate commercial license to the redactor.js library. Open source users are still under the noncommercial clause, but legitimate Imperavi license holders are not.
