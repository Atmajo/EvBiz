import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProfileAlert = () => {
  return (
    <Alert className="w-96">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        Update your profile to continue.
      </AlertDescription>
    </Alert>
  );
};

export default ProfileAlert;
