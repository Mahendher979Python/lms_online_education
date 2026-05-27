from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from assignments.models import Assignment, Submission
<<<<<<< HEAD
from coding_tasks.models import CodingSubmission,CodingTask
from attendance.models import Attendance
from django.db.models import (
    Avg,
    Count,
    Sum,
    F,
    FloatField,
    ExpressionWrapper,
    Case,
    When,
    IntegerField,
)
=======
from coding_tasks.models import CodingSubmission
from django.db.models import Sum
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
from courses.models import Course
from accounts.models import User
from notifications.utils import send_notification
from .models import Progress


<<<<<<< HEAD
def _get_attendance_percent_map(user_ids):
    """
    Returns {user_id: attendance_percent_int} for the given users.

    Attendance % is computed as:
      Present / (Present + Absent) * 100
    Pending rows are ignored.
    """
    if not user_ids:
        return {}

    rows = (
        Attendance.objects.filter(user_id__in=user_ids)
        .exclude(status="Pending")
        .values("user_id")
        .annotate(
            total=Count("id"),
            present=Sum(
                Case(
                    When(status="Present", then=1),
                    default=0,
                    output_field=IntegerField(),
                )
            ),
        )
    )

    out = {uid: 0 for uid in user_ids}
    for r in rows:
        total = r["total"] or 0
        present = r["present"] or 0
        out[r["user_id"]] = int(round((present * 100.0) / total)) if total > 0 else 0
    return out


def _get_course_assignment_count_map(course_ids):
    """Returns {course_id: assignment_count} for the given courses."""
    if not course_ids:
        return {}
    rows = (
        Assignment.objects.filter(course_id__in=course_ids)
        .values("course_id")
        .annotate(cnt=Count("id"))
    )
    return {r["course_id"]: (r["cnt"] or 0) for r in rows}


def _get_submission_sum_percent_map(student_ids, course_ids):
    """
    Returns {(student_id, course_id): sum_of_submission_percentages}

    Percentage for a submission is (score / total_marks) * 100.
    """
    if not student_ids or not course_ids:
        return {}

    percent_expr = ExpressionWrapper(
        100.0 * F("score") / F("assignment__total_marks"),
        output_field=FloatField(),
    )

    rows = (
        Submission.objects.filter(
            student_id__in=student_ids,
            assignment__course_id__in=course_ids,
            status__in=["submitted", "graded"],
            assignment__total_marks__gt=0,
        )
        .annotate(percent=percent_expr)
        .values("student_id", "assignment__course_id")
        .annotate(sum_percent=Sum("percent"))
    )

    out = {}
    for r in rows:
        out[(r["student_id"], r["assignment__course_id"])] = float(r["sum_percent"] or 0.0)
    return out


def _attach_progress_metrics(progress_rows):
    """
    Adds computed, display-focused metrics on each Progress instance:
      - attendance_percent
      - assignment_avg_score  (avg % across ALL assignments in the course; missing = 0)
    """
    if not progress_rows:
        return

    student_ids = {p.student_id for p in progress_rows}
    course_ids = {p.course_id for p in progress_rows}

    attendance_map = _get_attendance_percent_map(student_ids)
    assignment_count_map = _get_course_assignment_count_map(course_ids)
    sum_percent_map = _get_submission_sum_percent_map(student_ids, course_ids)

    for p in progress_rows:
        p.attendance_percent = attendance_map.get(p.student_id, 0)

        cnt = assignment_count_map.get(p.course_id, 0)
        sum_percent = sum_percent_map.get((p.student_id, p.course_id), 0.0)
        p.assignment_avg_score = round((sum_percent / cnt), 1) if cnt > 0 else 0

        # Keep existing templates/logic from breaking if they still read p.score
        try:
            p.score = int(round(p.assignment_avg_score))
        except Exception:
            p.score = 0


=======
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
def _compute_course_progress(student, course):
    """
    Compute progress for a single (student, course) pair based on assignments
    submissions + coding submissions. This is used as a fallback when no
    Progress record exists (so existing behavior continues to work).
    """
<<<<<<< HEAD
    # =========================
    # Assignments: average % across ALL assignments (missing = 0)
    # =========================
    assignments = Assignment.objects.filter(course=course)
    total_assignments = assignments.count()

    submissions = (
=======
    assignments = Assignment.objects.filter(course=course)
    total_assignments = assignments.count()

    completed_assignments = Submission.objects.filter(
        student=student,
        assignment__in=assignments,
        status__in=["submitted", "graded"],
    ).count()

    coding = CodingSubmission.objects.filter(student=student, task__course=course)
    passed = coding.filter(status="Passed").count()
    total_coding = coding.count()

    total_items = total_assignments + total_coding
    completed_items = completed_assignments + passed

    progress_percent = int((completed_items / total_items) * 100) if total_items > 0 else 0

    # Score should reflect both assignment scores (MCQ auto-graded + PDF/GForm trainer-graded)
    # and coding task scores.
    assignment_score = (
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
        Submission.objects.filter(
            student=student,
            assignment__in=assignments,
            status__in=["submitted", "graded"],
<<<<<<< HEAD
        )
        .select_related("assignment")
    )

    assignment_percent_total = 0.0
    for s in submissions:
        assignment_percent_total += float(getattr(s, "percentage", 0) or 0)

    # =========================
    # Coding tasks: average % across ALL tasks (missing = 0)
    # =========================
    tasks = CodingTask.objects.filter(course=course)
    total_tasks = tasks.count()

    coding_subs = (
        CodingSubmission.objects.filter(student=student, task__in=tasks)
        .select_related("task")
    )

    coding_percent_total = 0.0
    for cs in coding_subs:
        marks = getattr(cs.task, "marks", 0) or 0
        if marks > 0:
            coding_percent_total += (float(cs.score or 0) / float(marks)) * 100.0

    total_items = total_assignments + total_tasks
    progress_percent = int(round((assignment_percent_total + coding_percent_total) / total_items)) if total_items > 0 else 0

    # Score is shown as a 0-100 value (overall average)
    score = progress_percent
=======
        ).aggregate(total=Sum("score"))["total"]
        or 0
    )

    coding_score = coding.aggregate(total=Sum("score"))["total"] or 0
    score = int(assignment_score) + int(coding_score)
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b

    return {
        "attendance": progress_percent,
        "score": score,
        "completed": progress_percent >= 70,
        "certificate_issued": progress_percent >= 90,
    }


# =========================
# STUDENT PROGRESS
# =========================

@login_required
def student_progress(request):

    if request.user.role != 'student':
        return redirect('login')

    student = request.user

    # Courses the student is enrolled in
    courses = Course.objects.filter(students=student)

    # Prefer saved Progress records (editable via Django admin).
    # If a record doesn't exist, fall back to computed values so existing
    # functionality still works.
    saved_progress = {
        p.course_id: p
        for p in Progress.objects.filter(student=student, course__in=courses).select_related("course")
    }

    progress_list = []
    for course in courses:
        p = saved_progress.get(course.id)
        if p is None:
            computed = _compute_course_progress(student, course)
            p = Progress(
                student=student,
                course=course,
                attendance=computed["attendance"],
                score=computed["score"],
                completed=computed["completed"],
                certificate_issued=computed["certificate_issued"],
            )
        progress_list.append(p)

<<<<<<< HEAD
    _attach_progress_metrics(progress_list)

=======
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
    return render(request, 'progress/student_progress.html', {
        'progress': progress_list,
    })
# =========================
# TRAINER PROGRESS
# =========================

@login_required
def trainer_progress(request):

    if request.user.role != 'trainer':
        return redirect('login')

    # Students assigned to this trainer
    students = User.objects.filter(trainer=request.user, role="student")

    progress_rows = []

    # Fetch saved Progress records once for efficiency
    saved_qs = (
        Progress.objects.filter(student__in=students, course__trainer=request.user)
        .select_related("student", "course")
    )
    saved_map = {(p.student_id, p.course_id): p for p in saved_qs}

    for student in students:
        student_courses = Course.objects.filter(students=student, trainer=request.user)
        for course in student_courses:
            p = saved_map.get((student.id, course.id))
            if p is None:
                computed = _compute_course_progress(student, course)
                p = Progress(
                    student=student,
                    course=course,
                    attendance=computed["attendance"],
                    score=computed["score"],
                    completed=computed["completed"],
                    certificate_issued=computed["certificate_issued"],
                )
            progress_rows.append(p)

<<<<<<< HEAD
    _attach_progress_metrics(progress_rows)

=======
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
    return render(request, 'progress/trainer_progress.html', {'progress': progress_rows})


# =========================
# ADMIN PROGRESS
# =========================

@login_required
def admin_progress(request):

    if request.user.role != 'admin':
        return redirect('login')

<<<<<<< HEAD
    # Admin view should show all student-course progress.
    # Prefer saved Progress records; fall back to computed values.
=======
    # Admin view: show progress for all enrolled (student, course) pairs.
    # If a saved Progress record doesn't exist, compute it on the fly so the page
    # doesn't look "empty".
    courses = Course.objects.all().prefetch_related("students")
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
    students = User.objects.filter(role="student")

    saved_qs = Progress.objects.select_related("student", "course").all()
    saved_map = {(p.student_id, p.course_id): p for p in saved_qs}

    progress_rows = []
<<<<<<< HEAD
    for student in students:
        student_courses = Course.objects.filter(students=student)
        for course in student_courses:
=======
    # Build rows only for enrolled students (avoid showing random combinations)
    for course in courses:
        for student in course.students.filter(role="student"):
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
            p = saved_map.get((student.id, course.id))
            if p is None:
                computed = _compute_course_progress(student, course)
                p = Progress(
                    student=student,
                    course=course,
                    attendance=computed["attendance"],
                    score=computed["score"],
                    completed=computed["completed"],
                    certificate_issued=computed["certificate_issued"],
                )
            progress_rows.append(p)

<<<<<<< HEAD
    _attach_progress_metrics(progress_rows)

=======
>>>>>>> 6b52b9bc0b1e9f5483366f3a07c3ebb731af950b
    return render(request, 'progress/admin_progress.html', {'progress': progress_rows})
