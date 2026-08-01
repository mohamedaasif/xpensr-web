const AccountForm = ({ id }: { id: string }) => {
  return (
    <div>
      <div>Add Account</div>
      <form id={id} action="account-form"></form>
    </div>
  );
};

export default AccountForm;
