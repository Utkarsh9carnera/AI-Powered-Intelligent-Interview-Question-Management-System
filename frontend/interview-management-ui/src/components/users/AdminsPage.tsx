import UsersPage from "./UsersPage";

function AdminsPage() {
  return (
    <UsersPage
      title="Manage Admins"
      description="View, manage and organize all admins."
      buttonText="+ ADD ADMIN"
      roleName="Admin"
    />
  );
}

export default AdminsPage;