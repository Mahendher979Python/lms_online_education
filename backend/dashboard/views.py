from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from accounts.models import User
from courses.models import Course, Topic
from assignments.models import Assignment
from assignments.models import  Submission
<<<<<<< HEAD
from certificates.models import Certificate
from progress.models import Progress
=======
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b




@login_required
def admin_dashboard(request):
    if request.user.role != "admin":
        return redirect("login")

    from accounts.models import User
    from courses.models import Course
    from assignments.models import Assignment

    trainers = User.objects.filter(role="trainer").count()
    students = User.objects.filter(role="student").count()
    courses = Course.objects.count()
    assignments = Assignment.objects.count()

    return render(request, "dashboard/admin_dashboard.html", {
        "trainers": trainers,
        "students": students,
        "courses": courses,
        "assignments": assignments,
    })
@login_required
def trainer_dashboard(request):

    # trainer profile
    trainer = request.user

    # USE request.user
    courses = Course.objects.filter(trainer=request.user)

    topics = Topic.objects.filter(
        course__trainer=request.user
    )

    assignments = Assignment.objects.filter(
        course__trainer=request.user
    )

    # STUDENT COUNT
    students_count = User.objects.filter(role="student").count()

    # PROGRESS
    for c in courses:

        # use topics instead of topic_set
        total_topics = c.topics.count()

        completed = total_topics // 2
        pending = total_topics - completed

        c.completed_topics = completed
        c.pending_topics = pending

        if total_topics > 0:
            c.progress = int(
                (completed / total_topics) * 100
            )
        else:
            c.progress = 0

    return render(
        request,
        'dashboard/trainer_dashboard.html',
        {
            'courses': courses,
            'topics': topics,
            'assignments': assignments,
            'students_count': students_count,
        }
    )
@login_required
def student_dashboard(request):
    if request.user.role != "student":
        return redirect("login")

    student = request.user

    # ⭐ BEST WAY (SAFE + CLEAN)
    courses = Course.objects.filter(students=student)

    assignments = Assignment.objects.filter(course__in=courses)
    topics = Topic.objects.filter(course__in=courses)

<<<<<<< HEAD
    # =========================
    # PROGRESS (Average across ALL assignments)
    # Treat not-submitted assignments as 0%
    # =========================
    total_assignments = assignments.count()

    submissions = (
        Submission.objects.filter(
            student=student,
            assignment__in=assignments,
            status__in=["submitted", "graded"],
        )
        .select_related("assignment")
    )

    total_percent = 0.0
    for s in submissions:
        # normalized percentage regardless of total_marks
        total_percent += float(getattr(s, "percentage", 0) or 0)

    progress_percent = int(round(total_percent / total_assignments)) if total_assignments > 0 else 0

    # =========================
    # CERTIFICATES (avoid NaN on dashboard)
    # =========================
    certificates = Certificate.objects.filter(student=student, status="approved").count()

    # =========================
    # COURSE-WISE PROGRESS (for course cards)
    # Prefer saved Progress record; else compute from assignments avg.
    # =========================
    saved_progress = {
        p.course_id: p
        for p in Progress.objects.filter(student=student, course__in=courses).select_related("course")
    }

    for c in courses:
        p = saved_progress.get(c.id)
        if p is not None:
            c.progress = p.attendance or 0
            continue

        c_assignments = Assignment.objects.filter(course=c)
        c_total = c_assignments.count()
        if c_total == 0:
            c.progress = 0
            continue

        c_subs = (
            Submission.objects.filter(
                student=student,
                assignment__in=c_assignments,
                status__in=["submitted", "graded"],
            )
            .select_related("assignment")
        )

        c_percent_total = 0.0
        for s in c_subs:
            c_percent_total += float(getattr(s, "percentage", 0) or 0)

        c.progress = int(round(c_percent_total / c_total))
=======
    total_assignments = assignments.count()
    completed_assignments = assignments.filter(status="completed").count()

    progress_percent = int(
        (completed_assignments / total_assignments) * 100
    ) if total_assignments > 0 else 0
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b

    return render(request, "dashboard/student_dashboard.html", {
        "student": student,
        "courses": courses,
        "assignments": assignments,
        "topics": topics,
        "total_courses": courses.count(),
        "total_assignments": total_assignments,
        "total_topics": topics.count(),
<<<<<<< HEAD
        "certificates": certificates,
        "progress_percent": progress_percent,
    })
=======
        "completed_assignments": completed_assignments,
        "progress_percent": progress_percent,
    })
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
