# from django.contrib import admin
# from .models import User

# admin.site.register(User)



from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Contact


class CustomUserAdmin(UserAdmin):
    model = User

    # Update fieldsets to include all custom fields
    fieldsets = UserAdmin.fieldsets + (
        ('Profile Info', {'fields': ('phone', 'gender', 'dob', 'address', 'bio', 'profile_image')}),
        ('Trainer Info', {'fields': ('specialization', 'experience', 'qualification')}),
        ('Student & Trainer Relations', {'fields': ('trainer', 'courses')}),
        ('Role', {'fields': ('role',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role', 'phone'),
        }),
    )

    list_display = ('username', 'email', 'role', 'date_joined')
    list_filter = ('role', 'is_staff', 'is_superuser', 'date_joined')
    search_fields = ('username', 'email', 'phone')
    filter_horizontal = ('courses',)


class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_editable = ('is_read',)
    date_hierarchy = 'created_at'


admin.site.register(User, CustomUserAdmin)
admin.site.register(Contact, ContactAdmin)
