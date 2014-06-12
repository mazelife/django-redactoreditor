var Redactor = (function ($) {
    // Redactor palette attributes will accumulate here.
    var redactor_attrs = [];
    // Initialize all textareas with the ``redactor_content`` class
    // as a Redactor rich text area.
    $(document).ready(function () {
        var redactor_fields = $("textarea.redactor_content");
        if (redactor_fields.length !== redactor_attrs.length) {
            window.alert("Number of registered attributes does not match the widget count.");
        }

        // Model fields
        var model_redactor_fields = $("form > div > .module textarea.redactor_content");
        model_redactor_fields.each(function (i) {
            var settings = redactor_attrs[i];
            $(this).parent("div").find("label").addClass("redactor_label");
            $(this).parents(".form-row").addClass("redactor-form-row");
            boop = $(this);
            $(this).redactor(settings);
        });

        // Inline fields
        var inline_groups_redactor = [];
        var count_inline_fields = 0;

        // Fill inline groups with redactor widgets
        $("form > div > .inline-group").each(function() {
            if ($(this).find('.module textarea.redactor_content').length)
                inline_groups_redactor.push($(this));
        });

        // Init redactor on inlines
        $.each(inline_groups_redactor, function () {
            var inline_group = $(this);
            var inline_group_fields = inline_group.find("textarea.redactor_content");
            var last_field_num = model_redactor_fields.length + (count_inline_fields + inline_group_fields.length);
            var settings = redactor_attrs[last_field_num-1];

            count_inline_fields += inline_group_fields.length;

            // Init redactor on added (or extra) inlines
            inline_group.find(".inline-related:not(.empty-form) textarea.redactor_content").each(function () {
                 $(this).parent("div").find("label").addClass("redactor_label");
                 $(this).parents(".form-row").addClass("redactor-form-row");
                 $(this).redactor(settings).addClass('redactor_added');
            });

            // Init redactor on new inlines
            inline_group.on('click', '.add-row a', function() {
                inline_group.find('.inline-related:not(.empty-form) textarea.redactor_content:not(.redactor_added)').each(function(){
                    $(this).parent("div").find("label").addClass("redactor_label");
                    $(this).parents(".form-row").addClass("redactor-form-row");
                    $(this).redactor(settings).addClass('redactor_added');
                });
            });
        });
    });

    return {
        register: function () {
            var attrs = arguments.length !== 0 ? arguments[0] : null;
            redactor_attrs.push(attrs);
        }
    };
})(jQuery);
