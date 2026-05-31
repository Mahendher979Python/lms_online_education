
from functools import wraps
from django.shortcuts import redirect
from django.contrib import messages


def role_required(allowed_roles):
    """
    Decorator to restrict view access to specific roles
    allowed_roles: list or tuple of allowed role strings
    """
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if not request.user.is_authenticated:
                return redirect('login')
            
            if request.user.role not in allowed_roles:
                messages.error(request, "You don't have permission to access this page.")
                return redirect('login')
            
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator


def admin_required(view_func):
    """Decorator to restrict access to admin only"""
    return role_required(['admin', 'superadmin'])(view_func)


def trainer_required(view_func):
    """Decorator to restrict access to trainer and admin"""
    return role_required(['admin', 'superadmin', 'trainer'])(view_func)


def student_required(view_func):
    """Decorator to restrict access to student and admin"""
    return role_required(['admin', 'superadmin', 'student'])(view_func)


def superadmin_required(view_func):
    """Decorator to restrict access to superadmin only"""
    return role_required(['superadmin'])(view_func)
