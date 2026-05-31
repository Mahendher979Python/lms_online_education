
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "lms.settings")
django.setup()

from accounts.models import User

def create_users():
    # Create Super Admin
    if not User.objects.filter(username="superadmin").exists():
        superadmin = User.objects.create_superuser(
            username="superadmin",
            email="superadmin@lms.com",
            password="Superadmin@123"
        )
        superadmin.role = "superadmin"
        superadmin.save()
        print("✅ Super Admin created: username=superadmin, password=Superadmin@123")

    # Create Admin
    if not User.objects.filter(username="admin").exists():
        admin = User.objects.create_user(
            username="admin",
            email="admin@lms.com",
            password="Admin@123"
        )
        admin.role = "admin"
        admin.is_staff = True
        admin.save()
        print("✅ Admin created: username=admin, password=Admin@123")

    # Create Trainer
    if not User.objects.filter(username="trainer").exists():
        trainer = User.objects.create_user(
            username="trainer",
            email="trainer@lms.com",
            password="Trainer@123"
        )
        trainer.role = "trainer"
        trainer.save()
        print("✅ Trainer created: username=trainer, password=Trainer@123")

    # Create Student
    if not User.objects.filter(username="student").exists():
        student = User.objects.create_user(
            username="student",
            email="student@lms.com",
            password="Student@123"
        )
        student.role = "student"
        student.save()
        print("✅ Student created: username=student, password=Student@123")

    print("\n🎉 All test users created successfully!")

if __name__ == "__main__":
    create_users()
