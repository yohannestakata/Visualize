import AuthLayout from "../features/auth/layouts/AuthLayout";
import Signup from "../features/auth/components/Signup";
import Login from "../features/auth/components/Login";
import ProtectRoutes from "../features/auth/components/ProtectRoute";
import LearnLayout from "../features/learn/layouts";
import Teacher from "../pages/Teacher";
import CreateClassroomLayout from "../features/create-classroom/Layout";
import ErrorBoundary from "../components/ErrorBoundary";
import PrepareModelLayout from "../features/prepare-model/layout";
import UploadedModels from "../features/uploaded-models/layouts";
import AddModelDescriptionsLayout from "../features/add-descriptions/layouts";
import { Outlet, createBrowserRouter } from "react-router-dom";
import ModelDetailsLayout from "../features/model-details/layout";
import LearnModelLayout from "../features/learn-model/layout";
import Student from "../pages/Student";
import TakeTestLayout from "../features/take-test/layout";
import Admin from "../pages/Admin";
import DepartmentSettingsLayout from "../features/department-settings/layout";
import DepartmentSetupLayout from "../features/department-setup/layout";
import CourseSetupLayout from "../features/course-setup/layout";
import CourseSettingsLayout from "../features/course-settings/layout";
import SuperAdmin from "../pages/SuperAdmin";
import CreateAccountsLayout from "../features/create-accounts/layout";
import AddBatchesLayout from "../features/add-batches/layouts";
import SemestersLayout from "../features/semesters/layout";
import EditSemesterLayout from "../features/edit-semester/layout";
import ModelGuideline from "../pages/ModelGuideline";
import CreateTestLayout from "../features/create-quiz/layout";
import Classrooms from "../features/classrooms/layout";
import EditClassroomLayout from "../features/edit-classroom/layout";
import LandingPage from "../pages/Landing";
import ClassroomModelsLayout from "../features/classroom-models/layout";
import TakeExamLayout from "../features/take-exam/layout";
import AccountsLayout from "../features/accounts/layout";
import AnalyticsLayout from "../features/analytics/layouts";
import AnalyticsDetailsLayout from "../features/analytics-details/layout";
import BatchesLayout from "../features/batches-list/layout";
import EditBatchLayout from "../features/edit-batch/layout";
import ManageSectionLayout from "../features/manage-section/layout";
import UpdateProfileLayout from "../features/update-profile/layouts";

function useBrowserRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorBoundary />,
      element: (
        <ProtectRoutes>
          <Outlet />
        </ProtectRoutes>
      ),
      children: [
        {
          path: "/auth",
          element: <AuthLayout />,
          children: [
            {
              path: "/auth/signup",
              element: <Signup />,
            },
            {
              path: "/auth/login",
              element: <Login />,
            },
          ],
        },
        {
          path: "/home",
          element: <LandingPage />,
        },
        {
          path: "/learn",
          element: <Student />,
          children: [
            { path: "/learn/models", element: <LearnLayout /> },
            {
              path: "/learn/learn-model",
              element: <LearnModelLayout />,
            },
            {
              path: "/learn/take-test",
              element: <TakeTestLayout />,
            },
            {
              path: "/learn/classroom",
              element: <ClassroomModelsLayout />,
            },
            {
              path: "/learn/classroom/take-exam",
              element: <TakeExamLayout />,
            },
            {
              path: "/learn/manage-section",
              element: <ManageSectionLayout />,
            },
            {
              path: "/learn/update-profile",
              element: <UpdateProfileLayout />,
            },
          ],
        },
        {
          path: "/super-admin",
          element: <SuperAdmin />,
          children: [
            {
              path: "/super-admin/create-accounts",
              element: <CreateAccountsLayout />,
            },
            {
              path: "/super-admin/create-department",
              element: <DepartmentSettingsLayout />,
            },
            {
              path: "/super-admin/department-setup",
              element: <DepartmentSetupLayout />,
            },
            {
              path: "/super-admin/accounts",
              element: <AccountsLayout />,
            },
          ],
        },
        {
          path: "/admin",
          element: <Admin />,
          children: [
            {
              path: "/admin/course-settings",
              element: <CourseSettingsLayout />,
            },
            {
              path: "/admin/add-batches",
              element: <AddBatchesLayout />,
            },
            {
              path: "/admin/batches",
              element: <BatchesLayout />,
            },
            {
              path: "/admin/edit-batch",
              element: <EditBatchLayout />,
            },
            {
              path: "/admin/semesters",
              element: <SemestersLayout />,
            },
            {
              path: "/admin/semesters/edit",
              element: <EditSemesterLayout />,
            },
            {
              path: "/admin/semesters/courses",
              element: <CourseSetupLayout />,
            },
          ],
        },
        {
          path: "/teacher",
          element: <Teacher />,
          children: [
            {
              path: "/teacher/create-classroom",
              element: <CreateClassroomLayout />,
            },
            {
              path: "/teacher/edit-classroom",
              element: <EditClassroomLayout />,
            },
            {
              path: "/teacher/classrooms",
              element: <Classrooms />,
            },

            {
              path: "/teacher/add-classroom-test",
              element: <CreateTestLayout />,
            },
            {
              path: "/teacher/prepare-model",
              element: <PrepareModelLayout />,
            },
            {
              path: "/teacher/models",
              element: <UploadedModels />,
            },
            {
              path: "/teacher/model-details",
              element: <ModelDetailsLayout />,
            },
            {
              path: "/teacher/add-model-definitions",
              element: <AddModelDescriptionsLayout />,
            },
            {
              path: "/teacher/model-guideline",
              element: <ModelGuideline />,
            },
            {
              path: "/teacher/analytics",
              element: <AnalyticsLayout />,
            },
            {
              path: "/teacher/analytics/details",
              element: <AnalyticsDetailsLayout />,
            },
          ],
        },
      ],
    },
  ]);

  return router;
}

export default useBrowserRouter;
