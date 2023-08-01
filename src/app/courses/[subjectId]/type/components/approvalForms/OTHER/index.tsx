import ApprovalFormProvider from "./providers/ApprovalFormProvider";
import Form from "./Form";

const OTHER = () => {
  return (
    <ApprovalFormProvider>
      <Form />
    </ApprovalFormProvider>
  );
};

export default OTHER;
